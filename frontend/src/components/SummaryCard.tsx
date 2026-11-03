import React from "react";
import type { HandoverReport } from "../types/handover";

interface SummaryCardProps {
  report: HandoverReport;
  workspaceType: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  report,
  workspaceType,
}) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md space-y-6">
      {/* Top Row: Workspace & Generation Timestamp */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-slate-800/80">
        <div className="flex items-center space-x-3">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/25">
            {workspaceType} Handover
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Project ID: {report.project_id}
          </span>
        </div>
        <div className="text-xs text-slate-400 flex items-center space-x-1.5">
          <svg
            className="w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Generated: {new Date(report.generated_at).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Departing Member Card */}
        <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-4">
          <span className="text-xs text-slate-400 font-medium block mb-1">
            Departing Member
          </span>
          <span className="text-sm font-bold text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>
              {report.departing_member.name} ({report.departing_member.role})
            </span>
          </span>
        </div>

        {/* Incoming Member Card */}
        <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-4">
          <span className="text-xs text-slate-400 font-medium block mb-1">
            Incoming Member
          </span>
          <span className="text-sm font-bold text-white flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>
              {report.incoming_member.name} ({report.incoming_member.role})
            </span>
          </span>
        </div>

        {/* Verified Claims Stats Card */}
        <div className="bg-slate-950/50 border border-slate-800/60 rounded-xl p-4">
          <span className="text-xs text-slate-400 font-medium block mb-1">
            Extracted Metrics
          </span>
          <span className="text-sm font-bold text-emerald-400 flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{report.claims.length} Verifiable Claims</span>
          </span>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          Executive Summary
        </h4>
        <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/30 p-4 rounded-xl border border-slate-800/40">
          {report.handover_summary}
        </p>
      </div>
    </div>
  );
};
