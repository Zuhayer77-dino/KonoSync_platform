import type { HandoverReport } from "../types/handover";
import { MOCK_HANDOVER_DATA } from "../data/mockHandover";
import { MOCK_STUDENT_HANDOVER_DATA } from "../data/studentMockHandover";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export async function fetchHandoverReport(
  workspaceType: string,
): Promise<HandoverReport> {
  try {
    // Map workspace choice to Sibasish's seeded database member IDs
    const departingId =
      workspaceType.toLowerCase().includes("student") ||
      workspaceType.toLowerCase().includes("club")
        ? "Aarav Sharma"
        : "Alex Vance";

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
    // Handles Sibasish's {"status": "success", "data": report} response structure
    const data: HandoverReport = result.data || result;
    return {
      ...data,
      workspace_type: workspaceType,
    };
  } catch (error) {
    console.warn(
      "Backend API unreachable. Falling back to tailored demo mock data:",
      error,
    );

    // Select the correct mock dataset based on the user's workspace choice
    const isStudentClub =
      workspaceType.toLowerCase().includes("student") ||
      workspaceType.toLowerCase().includes("club");
    const baseData = isStudentClub
      ? MOCK_STUDENT_HANDOVER_DATA
      : MOCK_HANDOVER_DATA;

    return {
      ...baseData,
      workspace_type: workspaceType,
    };
  }
}
