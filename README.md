# CliniqAI 🩺
> Enterprise-grade Medical AI Platform targeting the 600M rural Indians with zero specialist access.

## The Why
There is a massive gap in specialist healthcare availability across rural India. While urban areas enjoy relatively high physician-to-patient ratios, rural jurisdictions—housing nearly 600 million people—face a stark deficit in dermatology and general screening specialists. CliniqAI bridges this gap via an autonomous multimodal AI pipeline optimized for zero-latency triaging, native language processing, and rigorous bias adjustment.

## Architecture

```text
[ Patient Input ]
  T(Voice) / T(Image)
        │
        ▼
┌─────────────────────────────────┐
│     FASTAPI API GATEWAY         │
│ (Auth > Logging > PII Masking)  │
└───────────────┬─────────────────┘
                │
        ┌───────▼───────┐
        │   CrewAI MAS   │ (Multi-Agent System)
        └───────┬───────┘
  ┌─────────────┴─────────────┐
  │ 1. Symptom Agent (LLaMA3) │
  │ 2. Vision Agent (Modal)   │
  │ 3. Specialist Agent       │
  │ 4. Risk Guardrail Agent   │
  │ 5. Chief Architect        │
  └─────────────┬─────────────┘
                │
        [ Clinical PDF ]
```

## Tech Stack
| Domain | Technologies |
|---|---|
| **Frontend** | Next.js 14 (App Router), Tailwind CSS, ShadcnUI |
| **Backend** | FastAPI, Pydantic v2, Python 3.11 |
| **AI/Agents** | CrewAI, LangChain, Groq (LLaMA 3) |
| **Computer Vision**| PyTorch (EfficientNet-B4), Modal Serverless GPU |
| **Voice Processing**| Silero VAD, OpenAI Whisper, IndicTrans2 |
| **Database** | Supabase (PostgreSQL, RLS) |
| **Deployment** | Docker, GitHub Actions, Railway, Vercel |

## Quick Setup

### Docker (Recommended)
```bash
# Clone repository
git clone https://github.com/your-org/cliniqai.git
cd cliniqai

# Populate environment configs
cp .env.example .env

# Spin up distributed stack
docker-compose up --build -d
```

### Local Dev
1. Backend: `cd backend && pip install -r requirements.txt && uvicorn main:app --reload`
2. Frontend: `cd frontend && npm install && npm run dev`

## API Documentation
Once running, visit `http://localhost:8000/docs` to view the comprehensive OpenAPI schema.
- **POST `/diagnose`**: Main multi-agent ingestion pipeline (requires Auth, multipart forms)
- **GET `/health`**: Kubernetes/Railway liveness probe

## Feature Focus

### Indian Skin Tone Bias Mitigation (Fitzpatrick IV-VI)
Computer Vision networks natively overfit light skin tones due to dataset disparity. The **Vision Diagnostician Agent** parses Grad-CAM activation outputs dynamically against Fitzpatrick scale assessments. If skin types IV-VI are identified, statistical confidence boundaries are automatically downgraded, halting dangerous automated discharges and forcefully appending human-review-required flags.

### Federated Learning Readiness
The ML core is designed with the Flower (`flwr`) framework in mind. Native device interactions can securely compute gradients locally, syncing only anonymized weights back to the primary cluster without transmitting raw PII dermatoscope imagery. 

## Screenshots / Workflow Mappings
<!-- 
[PLACEHOLDER FOR UI SCREENSHOTS AND DIAGRAMS]
(e.g., Grad-CAM opacity sliders, voice array ingestion UI)
-->

## Contributing
1. Fork the Project
2. Create Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to Branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.
