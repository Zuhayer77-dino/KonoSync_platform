import type { HandoverReport } from "../types/handover";

export const MOCK_STUDENT_HANDOVER_DATA: HandoverReport = {
  project_id: "CLUB-TECH-2026",
  workspace_type: "Student Tech Club",
  generated_at: "2026-11-03T18:00:00Z",
  departing_member: {
    name: "Aarav Sharma",
    role: "Technical Head & Lead Organizer",
    email: "aarav.sharma@studentclub.edu",
    skill_level: "Senior",
  },
  incoming_member: {
    name: "Jordan Lee",
    role: "Incoming Tech Club President",
    email: "jordan.lee@studentclub.edu",
    skill_level: "Mid-Level",
  },
  handover_summary:
    "Comprehensive transition report for the university technical club infrastructure, event repositories, and communication channels.\n\n" +
    "• Repository Handoffs: Transferred full administrative ownership of the GitHub Organization and main annual tech fest codebases to incoming executive leads.\n" +
    "• Community Infrastructure: Discord bot automation scripts and moderation permission hierarchies require final validation before the upcoming recruitment drive.\n" +
    "• Sponsorship Archives: Corporate sponsor contact spreadsheets and past grant documentation are organized, though active sponsor outreach pipelines need immediate follow-up.",
  claims: [
    {
      id: "claim_01",
      category: "Repository Handoff",
      statement:
        "Transferred GitHub Organization root admin keys and repository write access to incoming executive committee members.",
      status: "Completed",
      priority: "High priority",
      verification_state: "verified",
      citations: [
        {
          source_type: "GitHub Org Logs",
          reference_id: "AUDIT-441",
          title: "Owner Role Transfer",
          url: "https://github.com/orgs/student-tech-club/settings/audit-log",
          snippet:
            "Promoted @jordan_lee to organization owner and revoked legacy credentials.",
        },
      ],
    },
    {
      id: "claim_02",
      category: "Active Blocker",
      statement:
        "Discord server welcome bot automation script fails to assign automated member roles during peak recruitment influx.",
      status: "Pending",
      priority: "High priority",
      verification_state: "uncertain",
      verification_note:
        "Discord developer portal logs show rate-limit errors, but exact token scope is unverified.",
      citations: [
        {
          source_type: "Discord Thread",
          reference_id: "#bot-dev-logs",
          title: "Rate Limit Exception",
          url: "https://discord.com/channels/123456/789012",
          snippet:
            "Bot encountered 429 Too Many Requests on guild member intent updates.",
        },
      ],
    },
    {
      id: "claim_03",
      category: "Risk",
      statement:
        "Annual hackathon venue booking deposit receipt and MoU documents are stored in personal cloud drives rather than club archives.",
      status: "In Progress",
      priority: "Medium priority",
      verification_state: "conflicting",
      verification_note:
        "WhatsApp coordination chat mentions Google Drive upload, but shared folder link is restricted.",
      citations: [
        {
          source_type: "WhatsApp Chat",
          reference_id: "Core Committee 2026",
          title: "Venue MoU Discussion",
          snippet:
            "Uploaded venue contract PDF to personal drive; will share link soon.",
        },
      ],
    },
    {
      id: "claim_04",
      category: "Unfinished Work",
      statement:
        "Junior workshop curriculum roadmap for Rust and Embedded Systems pending faculty advisor review.",
      status: "Pending",
      priority: "Low priority",
      verification_state: "missing_evidence",
      verification_note:
        "No curriculum document or faculty sign-off thread located in active channels.",
      citations: [],
    },
  ],
  admin_review: {
    status: "Pending Review",
    reviewed_by: "Dr. Faculty Advisor",
    review_timestamp: null,
    redaction_notes:
      "Verify all club bank account credentials are removed before final sign-off.",
  },
};
