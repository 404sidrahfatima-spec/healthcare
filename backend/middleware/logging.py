"""
OpenTelemetry-ready structured JSON logging middleware.
Injects request IDs, tracks process times, and prepares data for observability.
"""
import time
import json
import logging
from uuid import uuid4
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from opentelemetry import trace

logger = logging.getLogger("cliniqai")

class StructuredLoggingMiddleware(BaseHTTPMiddleware):
    """
    Captures HTTP lifecycle events and dumps structured JSON logs.
    Includes OpenTelemetry tracing hooks for distributed microservices tracing.
    """
    async def dispatch(self, request: Request, call_next):
        # Extract existing trace ID from ALB/Proxy, or create one.
        request_id = request.headers.get("X-Request-Id", str(uuid4()))
        start_time = time.time()
        
        # OpenTelemetry Mock Trace
        tracer = trace.get_tracer(__name__)
        with tracer.start_as_current_span(f"{request.method} {request.url.path}") as span:
            span.set_attribute("http.request_id", request_id)
            client_ip = request.client.host if request.client else "unknown"
            span.set_attribute("http.client_ip", client_ip)
            
            try:
                response = await call_next(request)
                process_time_ms = round((time.time() - start_time) * 1000, 2)
                
                logger.info(json.dumps({
                    "event": "http_request_success",
                    "request_id": request_id,
                    "client": client_ip,
                    "method": request.method,
                    "url": str(request.url),
                    "status_code": response.status_code,
                    "process_time_ms": process_time_ms,
                }))
                
                response.headers["X-Request-Id"] = request_id
                return response
                
            except Exception as e:
                process_time_ms = round((time.time() - start_time) * 1000, 2)
                logger.error(json.dumps({
                    "event": "http_request_error",
                    "request_id": request_id,
                    "method": request.method,
                    "url": str(request.url),
                    "error": str(e),
                    "process_time_ms": process_time_ms,
                }))
                raise
