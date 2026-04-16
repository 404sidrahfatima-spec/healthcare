"""
JWT Authentication dependency and security primitives.
In FastAPI, instead of generic HTTP middleware, we use Dependency Injection (Depends)
for route-level authentication. This avoids blocking public endpoints (/health)
while maintaining strong perimeter security.
"""
import json
import logging
from typing import Dict, Any
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt

from core.config import get_settings, Settings

security = HTTPBearer()
logger = logging.getLogger("cliniqai")

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    settings: Settings = Depends(get_settings)
) -> Dict[str, Any]:
    """
    Validates JWT token and extracts the authenticated user payload.
    To be injected into private routes via `Depends(get_current_user)`.
    """
    token = credentials.credentials
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        user_id: str = payload.get("sub")
        
        if user_id is None:
            logger.warning(json.dumps({"event": "auth_failure", "reason": "Missing 'sub' claim in token"}))
            raise credentials_exception
            
        return payload
        
    except JWTError as e:
        logger.warning(json.dumps({"event": "auth_failure", "error": str(e)}))
        raise credentials_exception
