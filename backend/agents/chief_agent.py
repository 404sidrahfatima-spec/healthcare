"""
Chief Reasoning Officer Agent domain.
Assembles the complete report payload securely.
"""
import asyncio
from pydantic import BaseModel, ConfigDict, Field
from crewai import Agent, Task
from langchain_groq import ChatGroq
from core.config import get_settings
from langchain_core.tools import tool

class ClinicalReport(BaseModel):
    model_config = ConfigDict(frozen=True)
    executive_summary: str = Field(...)
    final_diagnosis: str = Field(...)
    trigger_pdf_generation: bool = Field(...)
    patient_instructions: str = Field(...)

@tool("AsyncReportGenerator")
def trigger_report_generation(summary: str) -> str:
    """Invokes generate_pdf_report inside report_service.py sequentially."""
    from services.report_service import generate_pdf_report
    loop = asyncio.new_event_loop()
    url = loop.run_until_complete(generate_pdf_report(summary, "SYSTEM_DEFAULT"))
    loop.close()
    return f"PDF URL Generated natively: {url}"

class ChiefAgentFactory:
    @staticmethod
    def create_agent() -> Agent:
        return Agent(
            role="Chief Reasoning Medical Officer",
            goal="Compile final diagnostic mappings distinctly to the ClinicalReport schema.",
            backstory="You orchestrate sequence conclusions seamlessly.",
            llm=ChatGroq(model_name="llama3-70b-8192", temperature=0.1, api_key=get_settings().groq_api_key),
            tools=[trigger_report_generation],
            max_retry_limit=3,
        )

    @staticmethod
    def create_task(agent: Agent) -> Task:
        return Task(
            description="Synthesize sequence variables globally. Trigger the AsyncReportGenerator flag.",
            expected_output="Strict Pydantic ClinicalReport model.",
            agent=agent,
            output_pydantic=ClinicalReport
        )
