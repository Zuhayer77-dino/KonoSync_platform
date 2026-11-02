from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from rag_engine import generate_handover_report

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


@app.post("/api/v1/ingest")
def ingest_activity(item: ActivityItem):
    ACTIVITY_DB.append(item.model_dump())
    return {"status": "success", "total_activities": len(ACTIVITY_DB)}


@app.post("/api/v1/generate-handover")
def generate_handover(req: HandoverRequest):
    member_activities = [
        a for a in ACTIVITY_DB if a["member_id"] == req.departing_member_id]

    if not member_activities:
        raise HTTPException(
            status_code=404, detail=f"No activities found for member '{req.departing_member_id}'.")

    report = generate_handover_report(
        req.departing_member_id, member_activities)
    return {"status": "success", "data": report}
