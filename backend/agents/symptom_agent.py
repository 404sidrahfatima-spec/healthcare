"""
Symptom Analyst Agent domain.
Extracts clinical entities using strict Pydantic v2 schemas passed synchronously in CrewAI.
"""
from typing import List, Optional
from pydantic import BaseModel, ConfigDict, Field
from crewai import Agent, Task
from langchain_groq import ChatGroq
from core.config import get_settings

class SymptomAnalysis(BaseModel):
    model_config = ConfigDict(frozen=True)
    primary_symptoms: List[str] = Field(..., min_length=1)
    duration: Optional[str] = Field(None)
    severity: Optional[str] = Field(None)

class SymptomAgentFactory:
    @staticmethod
    def create_agent() -> Agent:
        return Agent(
            role="Symptom Extraction Specialist",
            goal="Extract precise structured clinical entities strictly matching SymptomAnalysis schema.",
            backstory="Experienced clinical triage nurse mapping transcripts into actionable taxonomies.",
            llm=ChatGroq(model_name="llama3-70b-8192", temperature=0.1, api_key=get_settings().groq_api_key),
            max_retry_limit=3,
        )

    @staticmethod
    def create_task(agent: Agent, transcript: str) -> Task:
        return Task(
            description=f"Extract structured symptoms from: {transcript}",
            expected_output="Strict Pydantic SymptomAnalysis model. No raw strings.",
            agent=agent,
            output_pydantic=SymptomAnalysis
        )
