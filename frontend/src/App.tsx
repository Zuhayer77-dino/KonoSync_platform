import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { LandingHero } from "./components/LandingHero";
import { ExecutiveSummaryCard } from "./components/ExecutiveSummaryCard";
import { ClaimCard } from "./components/ClaimCard";
import { AdminReviewBar } from "./components/AdminReviewBar";
import { fetchHandoverReport } from "./services/api";
import type { HandoverReport } from "./types/handover";

export default function App() {
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(
    null,
  );
  const [reportData, setReportData] = useState<HandoverReport | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedWorkspace) return;

    let isMounted = true;
    setLoading(true);

    fetchHandoverReport(selectedWorkspace)
      .then((data: HandoverReport) => {
        if (isMounted) {
          setReportData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedWorkspace]);

  if (!selectedWorkspace) {
    return (
      <LandingHero onSelectWorkspace={(type) => setSelectedWorkspace(type)} />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-slate-800 selection:text-white">
      <Navbar
        workspaceName={selectedWorkspace}
        onSwitchWorkspace={() => {
          setSelectedWorkspace(null);
          setReportData(null);
        }}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        {loading || !reportData ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-6 h-6 border-2 border-slate-600 border-t-white rounded-full animate-spin"></div>
            <p className="text-xs font-mono text-slate-400">
              Reconstructing knowledge graph & verifying citations...
            </p>
          </div>
        ) : (
          <>
            {/* Detailed Executive Summary Card with Export/Copy Actions */}
            <ExecutiveSummaryCard report={reportData} />

            {/* Admin Review & Approval Bar */}
            <AdminReviewBar
              initialReview={reportData.admin_review}
              onUpdateReview={(updatedReview) => {
                setReportData({ ...reportData, admin_review: updatedReview });
              }}
            />

            {/* Verifiable Claims List Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold tracking-tight text-white flex items-center space-x-2">
                  <span>Verifiable Claims</span>
                  <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                    {reportData.claims.length}
                  </span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Evidence-Backed Verification Mode
                </span>
              </div>

              <div className="space-y-3">
                {reportData.claims.map((claim) => (
                  <ClaimCard key={claim.id} claim={claim} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
