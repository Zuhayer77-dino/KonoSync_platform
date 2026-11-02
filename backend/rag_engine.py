import os
import json
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """
You are KonoSync's AI Knowledge Reconstruction Engine.
Analyze raw project activity logs (commits, chat threads, task tickets) from a departing team member and produce a structured JSON handover report.

Return strictly valid JSON adhering to this exact schema:
{
  "project_id": "string",
  "workspace_type": "Student Tech Club | Engineering Team | Open Source Project",
  "generated_at": "ISO-8601 Timestamp",
  "departing_member": {
    "name": "string",
    "role": "string",
    "email": "string"
  },
  "incoming_member": {
    "name": "string",
    "role": "string",
    "skill_level": "string"
  },
  "handover_summary": "string summary of overall work, achievements, and pending tasks",
  "claims": [
    {
      "id": "string",
      "category": "Architectural Decision | Active Blocker / Unfinished Work | Risk",
      "statement": "string description",
      "status": "Completed | Pending | In Progress",
      "priority": "High | Medium | Low",
      "citations": [
        {
          "source_type": "GitHub Commit | Slack Thread | Jira Task",
          "reference_id": "string",
          "title": "string",
          "url": "string",
          "snippet": "string snippet from activity log"
        }
      ]
    }
  ],
  "admin_review": {
    "status": "Pending Review",
    "reviewed_by": "Unassigned",
    "review_timestamp": null,
    "redaction_notes": "None"
  }
}
"""

def generate_handover_report(departing_member_name: str, raw_activities: list[dict]) -> dict:
    prompt = f"Departing Member: {departing_member_name}\n\nActivity Feed:\n{json.dumps(raw_activities, indent=2)}"
    
    response = client.models.generate_content(
        model="gemini-3.8-flash",  # Updated model name
        contents=prompt,
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
            response_mime_type="application/json",
            temperature=0.1,
        )
    )
    return json.loads(response.text)

    