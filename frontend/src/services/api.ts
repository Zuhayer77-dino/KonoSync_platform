import type { HandoverReport } from "../types/handover";
import { MOCK_HANDOVER_DATA } from "../data/mockHandover";
import { MOCK_STUDENT_HANDOVER_DATA } from "../data/studentMockHandover";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export async function fetchHandoverReport(
  workspaceType: string,
): Promise<HandoverReport> {
  try {
    const response = await fetch(`${BACKEND_URL}/generate-handover`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ workspace_type: workspaceType }),
    });

    if (!response.ok) {
      throw new Error("Backend service unavailable");
    }

    const data: HandoverReport = await response.json();
    return data;
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
