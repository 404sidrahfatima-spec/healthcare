"""
Pydantic v2 schemas and FastAPI request dependencies for CliniqAI.
Strict types, validation, and domain models aligned with L7 best practices.
"""
from datetime import datetime, timezone
from enum import Enum
from typing import List, Optional
from uuid import UUID

from fastapi import UploadFile, File, Form
from pydantic import BaseModel, ConfigDict, Field, field_validator, ValidationInfo


class Language(str, Enum):
    """Supported interface languages for the voice/text pipeline."""
    TELUGU = "telugu"
    HINDI = "hindi"
    TAMIL = "tamil"
    ENGLISH = "english"


class RiskLevel(str, Enum):
    """Clinical risk stratification levels."""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    URGENT = "urgent"


# -----------------------------------------------------------------------------
# Request Models & Dependencies
# -----------------------------------------------------------------------------
class DiagnoseRequest:
    """
    Dependency class for multipart/form-data diagnosis requests.
    Using a dependency class instead of a Pydantic BaseModel because
    UploadFile (multipart form data) cannot be natively deserialized 
    from a standard JSON body.
    """
    def __init__(
        self,
        patient_id: UUID = Form(..., description="Unique identifier for the patient"),
        symptoms: str = Form(..., description="Raw text or translated symptoms"),
        language: Language = Form(..., description="Patient's primary language"),
        image: UploadFile = File(..., description="Clinical image for diagnosis"),
        audio: Optional[UploadFile] = File(None, description="Optional voice note for symptoms"),
    ):
        self.patient_id = patient_id
        self.symptoms = symptoms
        self.language = language
        self.image = image
        self.audio = audio


# -----------------------------------------------------------------------------
# Sub-models / Components
# -----------------------------------------------------------------------------
class DifferentialDiagnosis(BaseModel):
    """Represents a potential alternative diagnosis."""
    model_config = ConfigDict(frozen=True)

    condition_name: str = Field(..., min_length=2, description="Name of the differential condition")
    probability: float = Field(..., ge=0.0, le=1.0, description="Computed probability of this condition")
    reasoning: str = Field(..., min_length=10, description="Clinical reasoning for this differential")


class AgentOutput(BaseModel):
    """Structured output from a specific AI agent in the pipeline."""
    model_config = ConfigDict(frozen=True)

    agent_name: str = Field(..., description="Identifier of the reasoning agent")
    findings: str = Field(..., description="Structured findings or clinical reasoning from the agent")
    confidence: Optional[float] = Field(None, ge=0.0, le=1.0, description="Agent's confidence score")


# -----------------------------------------------------------------------------
# Response Models
# -----------------------------------------------------------------------------
class DiagnoseResponse(BaseModel):
    """Final aggregated response for the diagnosis endpoint."""
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    visit_id: UUID = Field(..., description="Unique ID for this diagnostic session")
    primary_diagnosis: str = Field(..., description="Top predicted clinical condition")
    confidence: float = Field(..., ge=0.0, le=1.0, description="Confidence of the primary diagnosis")
    uncertainty_score: float = Field(
        ..., 
        ge=0.0, 
        le=1.0, 
        description="Epistemic uncertainty via Monte Carlo Dropout"
    )
    risk_level: RiskLevel = Field(..., description="Overall clinical risk priority")
    differential_diagnoses: List[DifferentialDiagnosis] = Field(
        default_factory=list, 
        description="List of other probable alternative conditions"
    )
    gradcam_url: str = Field(..., description="Signed URL to Grad-CAM heatmap visualization")
    agent_reasoning: List[AgentOutput] = Field(
        default_factory=list, 
        description="Trace of observations from the MAS (Multi-Agent System) pipeline"
    )
    fitzpatrick_type: int = Field(
        ..., 
        ge=1, 
        le=6, 
        description="Detected Fitzpatrick skin type (1-6) for bias mitigation"
    )
    human_review_required: bool = Field(
        ..., 
        description="Flag indicating if physician review is mandatory"
    )
    pdf_url: str = Field(..., description="Signed URL to the generated clinical PDF report")
    created_at: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc),
        description="UTC timestamp of the diagnosis"
    )

    @field_validator("human_review_required", mode="after")
    @classmethod
    def enforce_human_review_logic(cls, v: bool, info: ValidationInfo) -> bool:
        """
        Safety check: strictly enforce human review if confidence is less than 70% 
        or if the risk level is URGENT.
        """
        conf = info.data.get("confidence", 1.0)
        risk = info.data.get("risk_level", RiskLevel.LOW)
        
        if conf < 0.70 or risk == RiskLevel.URGENT:
            return True
        return v
