"""
Vision Diagnostician Agent domain.
Abstracts calls to the cloud_ml_client (Modal) via CrewAI Tools.
"""
import asyncio
from pydantic import BaseModel, ConfigDict, Field
from crewai import Agent, Task
from langchain_groq import ChatGroq
from langchain_core.tools import tool

from core.config import get_settings

class VisionAnalysis(BaseModel):
    model_config = ConfigDict(frozen=True)
    predicted_condition: str = Field(...)
    model_confidence: float = Field(..., ge=0.0, le=1.0)
    gradcam_interpretation: str = Field(...)
    fitzpatrick_type: int = Field(..., ge=1, le=6)
    bias_warning: bool = Field(...)
    gradcam_url: str = Field(...)

@tool("ModalVisionClient")
def execute_vision_model(image_url: str) -> str:
    """Invokes the remote PyTorch serverless cluster inside cloud_ml_client.py placeholder."""
    from services.cloud_ml_client import fetch_vision_inference
    # Isolated event loop safely bridges synchronous Langchain tool architecture
    loop = asyncio.new_event_loop()
    result = loop.run_until_complete(fetch_vision_inference(image_url))
    loop.close()
    return str(result)

class VisionAgentFactory:
    @staticmethod
    def create_agent() -> Agent:
        return Agent(
            role="Vision Diagnostician",
            goal="Interpret EfficientNet ML vectors and output strict VisionAnalysis schema.",
            backstory="AI dermatologist that vigorously accounts for Fitzpatrick skin type bias.",
            llm=ChatGroq(model_name="llama3-70b-8192", temperature=0.2, api_key=get_settings().groq_api_key),
            tools=[execute_vision_model],
            max_retry_limit=3,
        )

    @staticmethod
    def create_task(agent: Agent, image_url: str) -> Task:
        return Task(
            description=f"Analyze {image_url} using ModalVisionClient. Populate schemas carefully.",
            expected_output="Strict Pydantic VisionAnalysis model. No raw dicts.",
            agent=agent,
            output_pydantic=VisionAnalysis
        )
