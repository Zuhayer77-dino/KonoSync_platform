import React, { useState } from "react";
import type { Claim, VerificationState } from "../types/handover";

interface ClaimCardProps {
  claim: Claim;
}

export const ClaimCard: React.FC<ClaimCardProps> = ({ claim }) => {
  const [showCitations, setShowCitations] = useState(false);

  const getVerificationBadge = (state: VerificationState) => {
    switch (state) {
      case "verified":
        return {
          label: "Verified",
          color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        };
      case "uncertain":
        return {
          label: "Uncertain Evidence",
          color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
      case "conflicting":
        return {
          label: "Conflicting Sources",
          color: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        };
      case "missing_evidence":
        return {
          label: "Missing Evidence",
          color: "bg-slate-800 text-slate-300 border-slate-700",
        };
    }
  };

  const badge = getVerificationBadge(claim.verification_state);

  return (
    <div className="rounded-xl bg-slate-900/70 border border-slate-800 p-5 space-y-4 hover:border-slate-700 transition-all">
      {/* Top Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
            {claim.id}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-slate-800/80 text-slate-300 font-medium">
            {claim.category}
          </span>
        </div>

        <div className="flex items-center space-x-2 font-medium">
          <span
            className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono ${badge.color}`}
          >
            {badge.label}
          </span>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
            {claim.priority}
          </span>
        </div>
      </div>

      {/* Main Statement */}
      <div className="text-slate-100 text-sm font-normal leading-relaxed pt-1">
        {claim.statement}
      </div>

      {/* Verification Note if present */}
      {claim.verification_note && (
        <div className="text-xs font-mono text-amber-400/90 bg-amber-500/5 border border-amber-500/10 px-3 py-1.5 rounded-lg">
          ⚠️ Note: {claim.verification_note}
        </div>
      )}

      {/* Verified Citations Drawer Toggle */}
      {claim.citations.length > 0 ? (
        <div className="pt-2 border-t border-slate-800/60">
          <button
            onClick={() => setShowCitations(!showCitations)}
            className="flex items-center justify-between w-full text-xs font-medium text-slate-300 hover:text-white transition-colors pt-1"
          >
            <span className="flex items-center space-x-2">
              <svg
                className="w-3.5 h-3.5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span>Source Citations ({claim.citations.length})</span>
            </span>
            <svg
              className={`w-4 h-4 transform transition-transform text-slate-400 ${showCitations ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Expandable Citation Snippets */}
          {showCitations && (
            <div className="mt-3 space-y-2">
              {claim.citations.map((cit, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-indigo-400 font-medium">
                      {cit.source_type} ({cit.reference_id})
                    </span>

                    {/* Clickable External Source Link */}
                    {cit.url ? (
                      <a
                        href={cit.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono transition-all"
                      >
                        <span>Open Source Link</span>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                        From Activity Log
                      </span>
                    )}
                  </div>

                  <div className="text-slate-200 font-semibold text-xs">
                    {cit.title}
                  </div>
                  <div className="text-slate-300 font-mono text-[11px] leading-relaxed italic">
                    "{cit.snippet}"
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-500 font-mono italic">
          No citations linked (Marked as Missing Evidence)
        </div>
      )}
    </div>
  );
};
