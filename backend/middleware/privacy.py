"""
Privacy Mode Middleware.
Enforces privacy constraints by masking PII before it leaves the server
when 'X-Privacy-Mode' header is active.
"""
import re
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware

class PrivacyMaskingMiddleware(BaseHTTPMiddleware):
    """
    Demonstrates response chunk iteration to mask PII (Emails, Phones)
    if the privacy mode toggle is engaged.
    """
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        # Only mask if specifically enabled by frontend or patient settings
        privacy_mode = request.headers.get("X-Privacy-Mode", "false").lower() == "true"
        content_type = response.headers.get("content-type", "")
        
        if privacy_mode and "application/json" in content_type:
            # Reconstruct body for PII scanning
            body = b""
            async for chunk in response.body_iterator:
                body += chunk
            
            text_body = body.decode("utf-8")
            
            # Masking Regex rules
            # 1. Mask Emails
            text_body = re.sub(
                r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', 
                '"[MASKED_EMAIL]"', 
                text_body
            )
            # 2. Mask Phone Numbers (+XX XXXXX XXXXX format approximations)
            text_body = re.sub(
                r'"\+?\d{10,14}"', 
                '"[MASKED_PHONE]"', 
                text_body
            )
            
            # Reconstruct response cycle
            encoded_body = text_body.encode("utf-8")
            response.body_iterator = iter([encoded_body])
            response.headers["content-length"] = str(len(encoded_body))
            
        return response
