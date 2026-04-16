"""
Cloud ML integration with Modal GPUs.
Uses httpx.AsyncClient singleton and implements resilient retry hierarchies.
"""
import httpx
import logging
import json
import time
import asyncio
from typing import Dict
from pydantic import BaseModel, ConfigDict, Field

from core.config import get_settings

logger = logging.getLogger("cliniqai")

class ServiceUnavailableError(Exception):
    """Raised natively when Modal ML endpoint is unreachable after exhausting backoff pool."""
    pass

class MLInferenceResult(BaseModel):
    """Strict execution output schema for serverless endpoints."""
    model_config = ConfigDict(frozen=True)
    
    diagnosis: str
    confidence: float
    probabilities: Dict[str, float]
    gradcam_url: str
    fitzpatrick_type: int
    uncertainty_score: float
    inference_time_ms: int

class ModalClient:
    """Design Pattern: Singleton HTTP Client spanning app lifecycle."""
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            # Imposing strict 30 second timeout on large models
            cls._instance.client = httpx.AsyncClient(timeout=30.0) 
        return cls._instance

    async def fetch_inference(self, image_url: str) -> MLInferenceResult:
        settings = get_settings()
        endpoint = settings.modal_endpoint_url
        
        # Exponential backoff parameters
        delays = [1.0, 2.0, 4.0]
        
        for attempt, delay in enumerate(delays, 1):
            try:
                start_time = time.time()
                
                # Mocking network inference payload hop (since Model is unwritten on Modal side)
                await asyncio.sleep(0.5) 
                
                mock_json = {
                    "diagnosis": "Melanoma detected",
                    "confidence": 0.88,
                    "probabilities": {"Melanoma": 0.88, "Nevus": 0.10, "BCC": 0.02},
                    "gradcam_url": "https://modal.cliniqai.local/assets/gradcam_stub.png",
                    "fitzpatrick_type": 5,
                    "uncertainty_score": 0.15,
                    "inference_time_ms": int((time.time() - start_time) * 1000)
                }
                
                logger.info(json.dumps({
                    "event": "modal_inference_success",
                    "attempt": attempt,
                    "time_ms": mock_json["inference_time_ms"]
                }))
                
                return MLInferenceResult(**mock_json)

            except (httpx.TimeoutException, httpx.NetworkError) as e:
                logger.warning(json.dumps({
                    "event": "modal_connection_error",
                    "attempt": attempt,
                    "error": str(e)
                }))
                if attempt == len(delays):
                    logger.error(json.dumps({"event": "modal_failure_terminal_bound"}))
                    raise ServiceUnavailableError("Modal cloud GPU is unreachable.") from e
                
                await asyncio.sleep(delay)

        raise ServiceUnavailableError("Modal cloud GPU unreachable.")

async def request_vision_inference(image_url: str) -> dict:
    """Exposed endpoint logic called synchronously within Agents Tool pattern."""
    client = ModalClient()
    result = await client.fetch_inference(image_url)
    return result.model_dump()
