"""
Risk Stratification Agent domain.
Enforces statistical bounds over the CrewAI sequence safely.
"""
from typing import Literal
from pydantic import BaseModel, ConfigDict, Field, model_validator
from crewai import Agent, Task
from langchain_groq import ChatGroq
from core.config import get_settings

class RiskAssessment(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    abcde_score: int = Field(..., ge=0, le=5)
    red_flags_detected: bool = Field(...)
    confidence_score: float = Field(..., ge=0.0, le=1.0)
    risk_level: Literal["LOW", "MEDIUM", "HIGH", "URGENT"] = Field(...)
    human_review_required: bool = Field(...)

    @model_validator(mode='after')
    def apply_guardrails(self) -> 'RiskAssessment':
        if self.confidence_score < 0.70:
            self.human_review_required = True
        if self.red_flags_detected:
            self.risk_level = "URGENT"
        if self.risk_level == "URGENT":
            self.human_review_required = True
        return self

class RiskAgentFactory:
    @staticmethod
    def create_agent() -> Agent:
        return Agent(
            role="Clinical Risk & Compliance Assessor",
            goal="Calculate ABCDE threat metrics precisely into the RiskAssessment schema.",
            backstory="Safety auditor with zero tolerance for anomaly.",
            llm=ChatGroq(model_name="llama3-70b-8192", temperature=0.0, api_key=get_settings().groq_api_key),
            max_retry_limit=3,
        )

    @staticmethod
    def create_task(agent: Agent) -> Task:
        return Task(
            description="Audit the sequential specialty arrays for ABCDE malignancy flags and scale strict compliance bounds.",
            expected_output="Strict Pydantic RiskAssessment model.",
            agent=agent,
            output_pydantic=RiskAssessment
        )
