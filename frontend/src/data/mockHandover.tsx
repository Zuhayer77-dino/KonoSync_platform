import { HandoverReport } from "../types/handover";

export const MOCK_HANDOVER_DATA: HandoverReport = {
  project_id: "proj_konosync_01",
  workspace_type: "Corporate Engineering",
  generated_at: "2026-10-24T14:30:00Z",
  departing_member: {
    name: "Alex Vance",
    role: "Senior Backend Engineer",
    email: "alex.vance@company.com",
  },
  incoming_member: {
    name: "Mohammed Zuhayer Labeeb",
    role: "Full-Stack Engineer",
    skill_level: "Intermediate",
  },
  handover_summary:
    "Successfully migrated core database connection pooling from pgBouncer to direct Prisma configuration, reducing connection latency by 42%. Pending work includes resolving N+1 query bottlenecks in the metrics analytics service.",
  claims: [
    {
      id: "claim_01",
      category: "Architectural Decision",
      statement:
        "Migrated primary user database connection pooling from pgBouncer to direct Prisma client configuration to prevent stale socket errors under load.",
      status: "Completed",
      priority: "High",
      citations: [
        {
          source_type: "GitHub Commit",
          reference_id: "commit_a8f92c1",
          title: "Refactor database client configuration",
          url: "https://github.com/org/repo/commit/a8f92c1",
          snippet:
            "const prisma = new PrismaClient({ datasources: { db: { url: process.env.DIRECT_URL } } });",
        },
        {
          source_type: "Slack Thread",
          reference_id: "thread_991",
          title: "#backend-infra decision discussion",
          url: "https://slack.com/archives/C01/p991",
          snippet:
            "Alex Vance: Bouncer is dropping packets during traffic spikes. Moving to direct Prisma URL.",
        },
      ],
    },
    {
      id: "claim_02",
      category: "Active Blocker",
      statement:
        "Analytics API route /api/v1/metrics suffers from N+1 query latency spikes and requires batch-fetching optimization.",
      status: "Pending",
      priority: "High",
      citations: [
        {
          source_type: "Jira Task",
          reference_id: "JIRA-402",
          title: "Optimize dashboard query execution time",
          url: "https://jira.company.com/browse/JIRA-402",
          snippet:
            "Status: In Progress. Assigned to Alex. Blocker: Prisma relation loading fetches rows sequentially in loop.",
        },
      ],
    },
  ],
  admin_review: {
    status: "Approved",
    reviewed_by: "Sarah Jenkins (Engineering Manager)",
    review_timestamp: "2026-10-24T16:00:00Z",
    redaction_notes:
      "All internal AWS secrets have been successfully redacted from commit references.",
  },
};
