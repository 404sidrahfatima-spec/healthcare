"""
Core configuration module using pydantic-settings.
All environmental variables and secrets are validated here.
No hardcoded credentials allowed (L7 constraint).
"""
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """Global configuration bound to environment variables."""
    app_name: str = "CliniqAI"
    environment: str = "production"
    
    # Security
    jwt_secret: str = "MUST_BE_OVERRIDDEN_IN_PROD"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    
    # CORS (Strict production domains)
    allowed_cors_origins: List[str] = [
        "https://cliniqai.com", 
        "https://dashboard.cliniqai.com"
    ]
    
    # Database
    supabase_url: str = "dummy_url"
    supabase_key: str = "dummy_key"
    
    # ML API (Modal)
    modal_endpoint_url: str = "dummy_endpoint"
    
    # LLaMA 3 (Groq)
    groq_api_key: str = "dummy_groq_key"
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

# DI singleton getter
def get_settings() -> Settings:
    return Settings()
