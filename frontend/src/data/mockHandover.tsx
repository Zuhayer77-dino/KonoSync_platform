import type { HandoverReport } from "../types/handover";

export const MOCK_HANDOVER_DATA: HandoverReport = {
  project_id: "PROJ-KONO-01",
  workspace_type: "Corporate Engineering",
  generated_at: "2026-11-03T18:00:00Z",
  departing_member: {
    name: "Alex Vance",
    role: "Senior Backend Engineer",
    email: "alex.vance@company.com",
    skill_level: "Senior",
  },
  incoming_member: {
    name: "Jordan Lee",
    role: "Full-Stack Engineer",
    email: "jordan.lee@company.com",
    skill_level: "Mid-Level",
  },
  handover_summary:
    "Comprehensive technical handover covering core backend architecture, active database connection strategies, and ongoing service bottlenecks.\n\n" +
    "• Architectural State: Successfully migrated primary user database connection handling to direct Prisma client configurations, standardizing socket behavior and mitigating connection drops under peak concurrency.\n" +
    "• Active Blockers: Priority focus must be directed toward resolving N+1 query latency spikes in the metrics analytics API (/api/v1/metrics), which currently exceeds 2400ms trace thresholds.\n" +
    "• Operational Risks: Review conflicting timelines between legacy Redis cache TTL updates and incoming token rotation policies before the next release cycle.",
  claims: [
    {
      id: "claim_01",
      category: "Architectural Decision",
      statement:
        "Migrated primary user database connection pooling to direct Prisma client configuration to manage socket errors under load.",
      status: "Completed",
      priority: "High priority",
      verification_state: "uncertain",
      verification_note:
        "pgBouncer removal not explicitly stated in cited configuration sources.",
      citations: [
        {
          source_type: "GitHub PR",
          reference_id: "PR #142",
          title: "Refactor DB Pool",
          url: "https://github.com/example/repo/pull/142",
          snippet:
            "Refactored db connection pool initialization in prisma.config.ts",
        },
      ],
    },
    {
      id: "claim_02",
      category: "Active Blocker",
      statement:
        "Analytics API route /api/v1/metrics suffers from N+1 query latency spikes and requires batch-fetching optimization.",
      status: "Pending",
      priority: "High priority",
      verification_state: "verified",
      citations: [
        {
          source_type: "Datadog APM",
          reference_id: "TRACE-992",
          title: "Metrics Latency Spike",
          url: "https://app.datadoghq.com/apm/trace/TRACE-992",
          snippet:
            "Trace duration exceeded 2400ms on /api/v1/metrics endpoint.",
        },
      ],
    },
    {
      id: "claim_03",
      category: "Risk",
      statement:
        "Legacy Redis cache expiration policies conflict with newly deployed token rotation intervals.",
      status: "In Progress",
      priority: "Medium priority",
      verification_state: "conflicting",
      verification_note:
        "Slack channel logs contradict Redis configuration timeline.",
      citations: [
        {
          source_type: "Slack Thread",
          reference_id: "#eng-backend",
          title: "Cache TTL Discussion",
          url: "https://slack.com/archives/C01234567/p1729123456",
          snippet: "We postponed the Redis TTL update until next sprint.",
        },
      ],
    },
    {
      id: "claim_04",
      category: "Unfinished Work",
      statement:
        "Environment secret rotation documentation pending final security team sign-off.",
      status: "Pending",
      priority: "Low priority",
      verification_state: "missing_evidence",
      verification_note:
        "No linked Confluence page or Jira ticket found in activity feed.",
      citations: [],
    },
  ],
  admin_review: {
    status: "Pending Review",
    reviewed_by: "Unassigned",
    review_timestamp: null,
    redaction_notes: "None",
  },
};
