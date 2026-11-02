import { HandoverReport } from "../types/handover";
import { MOCK_HANDOVER_DATA } from "../data/mockHandover";

const API_BASE_URL = "http://localhost:8000/api/v1";

export async function fetchHandoverReport(
  departingMemberId: string = "Alex Vance",
  targetRole: string = "Full-Stack Engineer",
): Promise<HandoverReport> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-handover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departing_member_id: departingMemberId,
        target_role: targetRole,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch from backend server");
    }

    const result = await response.json();
    // Matches Sibasish's return format: { status: "success", data: report }
    return result.data;
  } catch (error) {
    console.warn(
      "Backend server offline or unreachable. Falling back to local mock data.",
      error,
    );
    return MOCK_HANDOVER_DATA;
  }
}
