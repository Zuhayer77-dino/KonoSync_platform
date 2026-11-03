import type { HandoverReport } from "../types/handover";
import { MOCK_HANDOVER_DATA } from "../data/mockHandover";
import { MOCK_STUDENT_HANDOVER_DATA } from "../data/studentMockHandover";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export async function fetchHandoverReport(
  workspaceType: string,
): Promise<HandoverReport> {
  const isStudentClub =
    workspaceType.toLowerCase().includes("student") ||
    workspaceType.toLowerCase().includes("club");
  const baseData = isStudentClub
    ? MOCK_STUDENT_HANDOVER_DATA
    : MOCK_HANDOVER_DATA;

  try {
    const departingId = isStudentClub ? "Aarav Sharma" : "Alex Vance";

    const response = await fetch(`${BACKEND_URL}/api/v1/generate-handover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departing_member_id: departingId,
        target_role: workspaceType,
      }),
    });

    if (!response.ok) {
      throw new Error("Backend service unavailable");
    }

    const result = await response.json();
    const data = result.data || result;

    // Merge backend data with mock data so claims, incoming member, and admin reviews are fully populated
    return {
      ...baseData,
      ...data,
      workspace_type: workspaceType,
      claims:
        data.claims && data.claims.length > 0 ? data.claims : baseData.claims,
      incoming_member: data.incoming_member || baseData.incoming_member,
      admin_review: data.admin_review || baseData.admin_review,
    };
  } catch (error) {
    console.warn(
      "Backend API unreachable. Falling back to tailored demo mock data:",
      error,
    );

    return {
      ...baseData,
      workspace_type: workspaceType,
    };
  }
}
