export interface Member {
  name: string;
  role: string;
  email?: string;
  skill_level?: string;
}

export interface Citation {
  source_type: string;
  reference_id: string;
  title: string;
  url?: string;
  snippet: string;
}

export type VerificationState =
  | "verified"
  | "uncertain"
  | "conflicting"
  | "missing_evidence";

export interface Claim {
  id: string;
  category: string;
  statement: string;
  status: string;
  priority: string;
  verification_state: VerificationState;
  verification_note?: string;
  citations: Citation[];
}

export interface AdminReview {
  status: string;
  reviewed_by: string;
  review_timestamp: string | null;
  redaction_notes: string;
}

export interface HandoverReport {
  project_id: string;
  workspace_type: string;
  generated_at: string;
  departing_member: Member;
  incoming_member: Member;
  handover_summary: string;
  claims: Claim[];
  admin_review: AdminReview;
}
