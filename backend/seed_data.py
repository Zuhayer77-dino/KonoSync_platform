import requests

API_URL = "http://127.0.0.1:8000/api/v1/ingest"

sample_data = [
    {
        "member_id": "Alex Mercer",
        "source_type": "GitHub Commit",
        "source_ref": "commit_a8f92c1",
        "content": "Fix: Update Prisma database URL and connection pool settings. Migrated primary user database connection pooling from pgBouncer to direct Prisma client configuration due to connection drop issues under high load.",
        "timestamp": "2026-11-01T09:00:00Z"
    },
    {
        "member_id": "Alex Mercer",
        "source_type": "Slack Thread",
        "source_ref": "thread_991",
        "content": "#backend-leads discussion on connection limits: We are dropping pgBouncer because it chokes on async transactions during peak traffic.",
        "timestamp": "2026-11-01T09:30:00Z"
    },
    {
        "member_id": "Alex Mercer",
        "source_type": "Jira Task",
        "source_ref": "JIRA-402",
        "content": "Optimize dashboard query execution time. Status: In Progress. Blocker: Analytics API route /api/v1/metrics suffers from N+1 query latency spikes and requires batch-fetching optimization.",
        "timestamp": "2026-11-01T10:00:00Z"
    }
]

for item in sample_data:
    res = requests.post(API_URL, json=item)
    print("Ingested:", res.json())
