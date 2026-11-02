import React, { useState } from "react";

interface LandingHeroProps {
  onEnterWorkspace: (workspaceType: string) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  onEnterWorkspace,
}) => {
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    "Corporate Engineering",
  );

  const workspaces = [
    {
      title: "Corporate Engineering",
      desc: "For enterprise teams, backend migrations, and compliance handovers.",
      badge: "Enterprise Secure",
    },
    {
      title: "Student Tech Club",
      desc: "For university hackathons, open-source maintainers, and club transitions.",
      badge: "Community Fast-Track",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Top Branding Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
          <span>
            KonoSync v1.0-alpha • Zero-Hallucination Handover Platform
          </span>
        </div>

        {/* Main Header */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          Seamless Knowledge Transfer <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            Without the Chaos.
          </span>
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Reconstruct project activity logs, git commits, and task threads into
          verifiable, citation-backed handover reports instantly.
        </p>

        {/* Workspace Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto pt-6">
          {workspaces.map((ws) => {
            const isSelected = selectedWorkspace === ws.title;
            return (
              <div
                key={ws.title}
                onClick={() => setSelectedWorkspace(ws.title)}
                className={`cursor-pointer text-left p-6 rounded-xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-indigo-950/40 border-indigo-500 shadow-lg shadow-indigo-500/10"
                    : "bg-slate-900/50 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-slate-800 text-indigo-300">
                    {ws.badge}
                  </span>
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? "border-indigo-400 bg-indigo-400"
                        : "border-slate-600"
                    }`}
                  >
                    {isSelected && (
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  {ws.title}
                </h3>
                <p className="text-sm text-slate-400">{ws.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Enter Dashboard Button */}
        <div className="pt-4">
          <button
            onClick={() => onEnterWorkspace(selectedWorkspace)}
            className="px-8 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
          >
            Enter {selectedWorkspace} Dashboard →
          </button>
        </div>
      </div>
    </div>
  );
};
