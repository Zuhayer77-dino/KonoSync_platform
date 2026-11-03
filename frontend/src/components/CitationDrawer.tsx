import React from "react";
import type { Citation } from "../types/handover";

interface CitationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  citation: Citation | null;
}

export const CitationDrawer: React.FC<CitationDrawerProps> = ({
  isOpen,
  onClose,
  citation,
}) => {
  if (!isOpen || !citation) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-sm flex justify-end transition-opacity">
      <div className="w-full max-w-md bg-slate-900 border-l border-slate-800 h-full p-6 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <h3 className="text-base font-bold text-white">
                Citation Inspector
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="mt-6 space-y-4">
            <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="text-indigo-400 font-semibold px-2 py-0.5 bg-indigo-500/10 rounded border border-indigo-500/20">
                  {citation.source_type}
                </span>
                <span>Ref ID: {citation.reference_id}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-100">
                {citation.title}
              </h4>

              <div className="space-y-1.5 pt-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Source Excerpt
                </span>
                <blockquote className="text-xs text-slate-300 italic bg-slate-900/80 p-3 rounded-lg border border-slate-800/60 leading-relaxed">
                  "{citation.snippet}"
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          {citation.url ? (
            <a
              href={citation.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-colors shadow-lg shadow-indigo-600/20"
            >
              Open External Source
            </a>
          ) : (
            <span className="text-xs text-slate-500 italic">
              No external URL linked for this reference.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
