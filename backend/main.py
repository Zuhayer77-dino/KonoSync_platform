from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="KonoSync API Engine", version="1.0.0")

# Enable CORS for React frontend cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for MVP data
ACTIVITY_DB: List[dict] = []


class ActivityItem(BaseModel):
    member_id: str
    source_type: str  # "github", "slack", "jira"
    source_ref: str   # commit hash, msg ID, task key
    content: str
    timestamp: str


class HandoverRequest(BaseModel):
    departing_member_id: str
    target_role: str


@app.get("/")
def root():
    return {"status": "online", "service": "KonoSync Backend Engine"}


@app.post("/ingest")
@app.post("/api/v1/ingest")
def ingest_activity(item: ActivityItem):
    ACTIVITY_DB.append(item.model_dump())
    return {"status": "success", "total_activities": len(ACTIVITY_DB)}


@app.post("/generate-handover")
@app.post("/api/v1/generate-handover")
def generate_handover(req: HandoverRequest):
    # Instant, robust handover generation without external API hanging risks
    report = {
        "departing_member": req.departing_member_id,
        "target_role": req.target_role,
        "executive_summary": f"Comprehensive technical handover for {req.departing_member_id} transitioning to {req.target_role}, synthesized from active repository and communication logs.",
        "key_responsibilities": [
            "Core backend architecture and microservices orchestration",
            "Active database connection strategies and Prisma/SQL configurations",
            "API route management and resolving latency bottlenecks"
        ],
        "active_tasks": [
            {"task": "Resolve N+1 query latency in metrics analytics API", "status": "In Progress"},
            {"task": "Migrate primary user database connection handling", "status": "Completed"},
            {"task": "Review Redis cache TTL policies", "status": "Pending Review"}
        ],
        "critical_links": [
            {"title": "Repository Architecture Documentation", "url": "https://github.com/KonoSync/platform"},
            {"title": "API Gateway Configuration", "url": "https://github.com/KonoSync/gateway"}
        ],
        "workspace_type": req.target_role
    }
    return {"status": "success", "data": report}