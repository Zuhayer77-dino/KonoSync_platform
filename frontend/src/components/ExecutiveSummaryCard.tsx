import React, { useState } from "react";
import type { HandoverReport } from "../types/handover";

interface ExecutiveSummaryCardProps {
  report: HandoverReport;
}

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({
  report,
}) => {
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    return `# KonoSync Handover Report: ${report.project_id}
- **Workspace:** ${report.workspace_type}
- **Generated At:** ${report.generated_at}
- **Departing Member:** ${report.departing_member.name} (${report.departing_member.role})
- **Incoming Member:** ${report.incoming_member.name} (${report.incoming_member.role})

## Executive Summary
${report.handover_summary}

## Verifiable Claims (${report.claims.length})
${report.claims
  .map(
    (c) => `### [${c.id}] ${c.category} - ${c.status} (${c.priority})
- **Statement:** ${c.statement}
- **Verification State:** ${c.verification_state}
${c.verification_note ? `- **Note:** ${c.verification_note}` : ""}
- **Citations:** ${c.citations.length} linked sources
`,
  )
  .join("\n")}

## Engineering Manager & Compliance Review
- **Status:** ${report.admin_review.status}
- **Reviewed By:** ${report.admin_review.reviewed_by}
- **Redaction Notes:** ${report.admin_review.redaction_notes}
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `konosync-handover-${report.project_id}.json`,
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDownloadMarkdown = () => {
    const blob = new Blob([generateMarkdown()], {
      type: "text/markdown;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const downloadAnchor = document.createElement("a");
    downloadAnchor.href = url;
    downloadAnchor.download = `konosync-handover-${report.project_id}.md`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-6 space-y-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400">
            Executive Handover Summary
          </h2>
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-mono mt-1">
            <span>
              Departing:{" "}
              <strong className="text-slate-200">
                {report.departing_member.name}
              </strong>{" "}
              ({report.departing_member.role})
            </span>
            <span>•</span>
            <span>
              Incoming:{" "}
              <strong className="text-slate-200">
                {report.incoming_member.name}
              </strong>{" "}
              ({report.incoming_member.role})
            </span>
          </div>
        </div>

        {/* Export & Download Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/60 transition-all flex items-center space-x-1.5"
            title="Copy full report as Markdown"
          >
            <span>{copied ? "✓ Copied!" : "Copy Report"}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700/60 transition-all flex items-center space-x-1.5"
            title="Download Markdown report file"
          >
            <span>Export .MD</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-medium border border-indigo-500/30 transition-all flex items-center space-x-1.5"
            title="Download structured JSON schema"
          >
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Detailed multi-line handover summary text */}
      <div className="text-sm text-slate-300 leading-relaxed font-normal pt-3 border-t border-slate-800/80 whitespace-pre-line">
        {report.handover_summary}
      </div>
    </div>
  );
};
