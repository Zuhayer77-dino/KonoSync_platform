import React, { useState } from "react";

interface ExecutiveSummaryCardProps {
  report: any;
}

export const ExecutiveSummaryCard: React.FC<ExecutiveSummaryCardProps> = ({
  report,
}) => {
  const [copied, setCopied] = useState(false);

  // Safe extraction for departing member (handles strings or objects)
  const departingName =
    typeof report?.departing_member === "object" &&
    report?.departing_member !== null
      ? report.departing_member?.name || "Team Member"
      : report?.departing_member || "Alex Vance";

  // Safe extraction for incoming member
  const incomingName =
    typeof report?.incoming_member === "object" &&
    report?.incoming_member !== null
      ? report.incoming_member?.name || "Incoming Member"
      : report?.incoming_member || "Incoming Member";

  const executiveSummaryText =
    report?.executive_summary ||
    report?.handover_summary ||
    "No executive summary provided.";

  const generateMarkdown = () => {
    return `# KonoSync Handover Report: ${report?.project_id || "KonoSync"}
- **Workspace:** 
${report?.workspace_type || "N/A"}
- **Departing Member:** 
${departingName}
- **Incoming Member:** 
${incomingName}

## Executive Summary
${executiveSummaryText}

## Key Responsibilities
${(report?.key_responsibilities || [])
  .map((resp: string) => `- ${resp}`)
  .join("\n")}

## Active Tasks
${(report?.active_tasks || [])
  .map((t: any) => `- **${t.task}** [${t.status}]`)
  .join("\n")}
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
      `konosync-handover-${report?.project_id || "report"}.json`,
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
    downloadAnchor.download = `konosync-handover-${report?.project_id || "report"}.md`;
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
              <strong className="text-slate-200">{departingName}</strong>
            </span>
            <span>•</span>
            <span>
              Incoming:{" "}
              <strong className="text-slate-200">{incomingName}</strong>
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
        {executiveSummaryText}
      </div>

      {/* Render Key Responsibilities */}
      {report?.key_responsibilities &&
        report.key_responsibilities.length > 0 && (
          <div className="pt-3 border-t border-slate-800/80 space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Key Responsibilities
            </h3>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              {report.key_responsibilities.map((resp: string, idx: number) => (
                <li key={idx}>{resp}</li>
              ))}
            </ul>
          </div>
        )}

      {/* Render Active Tasks */}
      {report?.active_tasks && report.active_tasks.length > 0 && (
        <div className="pt-3 border-t border-slate-800/80 space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Active Tasks
          </h3>
          <div className="space-y-2">
            {report.active_tasks.map((taskItem: any, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60 text-xs"
              >
                <span className="text-slate-200">{taskItem.task}</span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">
                  {taskItem.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
