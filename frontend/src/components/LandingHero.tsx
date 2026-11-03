import React, { useState } from "react";

interface LandingHeroProps {
  onSelectWorkspace: (type: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onSelectWorkspace,
}) => {
  const [selectedType, setSelectedType] = useState<string>(
    "Corporate Engineering",
  );

  const workspaces = [
    {
      id: "Corporate Engineering",
      title: "Corporate Engineering",
      desc: "Jira tasks, GitHub PRs, and DB scaling handovers.",
      badge: "Enterprise Secure",
    },
    {
      id: "Student Tech Club",
      title: "Student Tech Club",
      desc: "Discord logs, repo handoffs, and event archives.",
      badge: "Community Fast-Track",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 py-6">
      <div className="max-w-2xl w-full text-center space-y-5">
        {/* Top Branding Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
          <span className="w-2 h-2 rounded-full bg-slate-400"></span>
          <span className="text-xs font-mono text-slate-300">
            KonoSync • Evidence-Linked Handover Platform
          </span>
        </div>

        {/* Main Headline */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Seamless Knowledge Transfer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Reconstruct activity logs and task threads into verifiable,
            citation-backed handover reports instantly.
          </p>
        </div>

        {/* Workspace Mode Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {workspaces.map((ws) => {
            const isSelected = selectedType === ws.title;
            return (
              <div
                key={ws.id}
                onClick={() => setSelectedType(ws.title)}
                className={`cursor-pointer rounded-xl p-4 border transition-all flex flex-col justify-between ${
                  isSelected
                    ? "bg-slate-900 border-slate-600 ring-1 ring-slate-600 shadow-sm"
                    : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {ws.badge}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    )}
                  </div>
                  <h3 className="text-sm font-semibold text-white">
                    {ws.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-snug">
                    {ws.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div>
          <button
            onClick={() => onSelectWorkspace(selectedType)}
            className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-white text-slate-950 font-semibold text-xs sm:text-sm shadow-sm transition-all inline-flex items-center space-x-2"
          >
            <span>Start Handover with {selectedType}</span>
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
