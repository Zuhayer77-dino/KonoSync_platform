import React, { useState } from "react";

interface AdminReviewBarProps {
  initialReview?: any;
  onUpdateReview: (updated: any) => void;
}

export const AdminReviewBar: React.FC<AdminReviewBarProps> = ({
  initialReview,
  onUpdateReview,
}) => {
  // Provide a safe fallback if initialReview is undefined
  const safeReview = initialReview || {
    status: "Pending Review",
    reviewed_by: "Lead Engineering Manager (Demo Admin)",
    review_timestamp: null,
    redaction_notes: "No compliance redactions flagged.",
  };

  const [review, setReview] = useState<any>(safeReview);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesInput, setNotesInput] = useState(review?.redaction_notes || "");

  const handleStatusChange = (newStatus: string) => {
    const updated = {
      ...review,
      status: newStatus,
      reviewed_by: "Lead Engineering Manager (Demo Admin)",
      review_timestamp: new Date().toISOString(),
    };
    setReview(updated);
    onUpdateReview(updated);
  };

  const handleSaveNotes = () => {
    const updated = {
      ...review,
      redaction_notes: notesInput,
    };
    setReview(updated);
    onUpdateReview(updated);
    setIsEditingNotes(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "Changes Requested":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default:
        return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    }
  };

  return (
    <div className="rounded-xl bg-slate-900/80 border border-slate-800 p-6 space-y-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-xs font-mono font-medium uppercase tracking-wider text-slate-400">
            Engineering Manager & Compliance Review
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Required sign-off before handover archival and credential transfer.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-mono border ${getStatusBadge(
              review?.status || "Pending Review",
            )}`}
          >
            {review?.status || "Pending Review"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80 text-xs">
        <div className="space-y-1 font-mono text-slate-400">
          <div>
            Reviewed By:{" "}
            <span className="text-slate-200">
              {review?.reviewed_by || "Pending Sign-off"}
            </span>
          </div>
          <div>
            Timestamp:{" "}
            <span className="text-slate-200">
              {review?.review_timestamp
                ? new Date(review.review_timestamp).toLocaleString()
                : "Pending Sign-off"}
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-slate-400 font-mono">
            <span>Redaction Notes:</span>
            {!isEditingNotes && (
              <button
                onClick={() => setIsEditingNotes(true)}
                className="text-indigo-400 hover:text-indigo-300 underline text-[11px]"
              >
                Edit Notes
              </button>
            )}
          </div>
          {isEditingNotes ? (
            <div className="space-y-2 pt-1">
              <input
                type="text"
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2.5 py-1 text-slate-200 text-xs font-mono focus:outline-none focus:border-slate-500"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveNotes}
                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-white text-slate-950 text-[11px] font-semibold"
                >
                  Save Notes
                </button>
                <button
                  onClick={() => setIsEditingNotes(false)}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px]"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-slate-300 font-mono text-xs bg-slate-950/60 p-2 rounded border border-slate-800/80">
              {review?.redaction_notes || "No notes provided."}
            </div>
          )}
        </div>
      </div>

      {/* Interactive Review Action Buttons for Judges */}
      <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-slate-400 font-mono">
          Judge Action Panel:
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleStatusChange("Approved")}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-medium transition-all"
          >
            ✓ Approve Report
          </button>
          <button
            onClick={() => handleStatusChange("Changes Requested")}
            className="px-3.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-medium transition-all"
          >
            ✕ Request Changes
          </button>
        </div>
      </div>
    </div>
  );
};
