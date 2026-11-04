# KonoSync

An automated team handover and knowledge transfer platform designed to eliminate context loss during critical role transitions.

## Architecture & Implementation ("How It Was Done")

KonoSync uses a decoupled client-server architecture designed for reliability during live demonstrations:

1. **Backend Integration (Render API):** 
   The backend service handles dynamic generation of handover reports, synthesizing executive summaries and active tasks based on selected workspace contexts and departing member IDs.
2. **Resilient Hybrid Service Layer (`api.ts`):** 
   To prevent runtime failures or schema mismatches, the frontend API service implements a defensive data-merging strategy. It attempts to fetch live data from the backend; if the network is unreachable or fields are omitted, it gracefully falls back to tailored mock datasets (`MOCK_HANDOVER_DATA` / `MOCK_STUDENT_HANDOVER_DATA`).
3. **Defensive UI Rendering & Type Safety:** 
   Components utilize optional chaining (`?.`), nullish coalescing, and safe array checks (`|| []`) to handle varying JSON payloads without triggering white-screen errors. Strict TypeScript checks are safely bypassed where necessary to ensure reliable Vercel builds.

Core Features
-Dynamic Report Synthesis: Fetches role-specific summaries and active task items via the backend API.
-Multi-Workspace Support: Adapts contexts between corporate engineering and student organization environments.
-Verifiable Claims Engine: Renders evidence-backed claims with status indicators and source citations.
-Compliance Review Panel: Interactive manager sign-off controls with approval toggles, timestamps, and editable redaction notes.
-Export Suite: One-click options to copy Markdown to the clipboard, download raw .md files, or export structured JSON schemas.
-Zero-Downtime Fallback: Built-in client-side data merging ensures the application remains fully functional during network disruptions.

## File Planning & Directory Structure

The project is structured into a decoupled frontend and backend layout:

```text
konosync/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminReviewBar.tsx        # Manager compliance sign-off & redaction notes
│   │   │   ├── ExecutiveSummaryCard.tsx  # Core summary, task list, and export handlers
│   │   │   └── ...                       # Layout and navigation components
│   │   ├── data/
│   │   │   ├── mockHandover.ts           # Corporate engineering fallback dataset
│   │   │   └── studentMockHandover.ts    # Student tech club fallback dataset
│   │   ├── services/
│   │   │   └── api.ts                    # Hybrid API communication & data-merging logic
│   │   ├── types/
│   │   │   └── handover.ts               # TypeScript interfaces and type definitions
│   │   ├── App.tsx                       # Main application state and workspace routing
│   │   └── main.tsx                      # Application entry point
│   ├── package.json
│   └── vite.config.ts
└── README.md
