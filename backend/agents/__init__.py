"""
Single registry point for the Multi-Agent System architectures.
Import Factories and validation schemas seamlessly across app services.
"""
from .symptom_agent import SymptomAgentFactory, SymptomAnalysis
from .vision_agent import VisionAgentFactory, VisionAnalysis
from .specialist_agent import SpecialistAgentFactory, DermatologyFindings
from .risk_agent import RiskAgentFactory, RiskAssessment
from .chief_agent import ChiefAgentFactory, ClinicalReport

__all__ = [
    "SymptomAgentFactory", "SymptomAnalysis",
    "VisionAgentFactory", "VisionAnalysis",
    "SpecialistAgentFactory", "DermatologyFindings",
    "RiskAgentFactory", "RiskAssessment",
    "ChiefAgentFactory", "ClinicalReport",
]
