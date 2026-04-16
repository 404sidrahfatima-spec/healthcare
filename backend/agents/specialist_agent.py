"""
Dermatology Specialist Agent domain.
Performs sequential cross-referencing globally overriding visual findings.
"""
from typing import List
from pydantic import BaseModel, ConfigDict, Field
from crewai import Agent, Task
from langchain_groq import ChatGroq
from core.config import get_settings

class DermatologyFindings(BaseModel):
    model_config = ConfigDict(frozen=True)
    primary_impression: str = Field(...)
    differential_impressions: List[str] = Field(...)
    clinical_rationale: str = Field(...)

class SpecialistAgentFactory:
    @staticmethod
    def create_agent() -> Agent:
        return Agent(
            role="Senior Dermatological Specialist",
            goal="Provide a holistic clinical impression strictly mapping to DermatologyFindings.",
            backstory="Board-certified medical expert integrating heterogeneous data streams intelligently.",
            llm=ChatGroq(model_name="llama3-70b-8192", temperature=0.2, api_key=get_settings().groq_api_key),
            max_retry_limit=3,
        )

    @staticmethod
    def create_task(agent: Agent) -> Task:
        return Task(
            description="Cross-reference the inherited task outputs sequentially assigned for Symptoms and Vision contexts. Generate synthesized findings.",
            expected_output="Strict Pydantic DermatologyFindings model.",
            agent=agent,
            output_pydantic=DermatologyFindings
        )
