import React from "react";

interface NavbarProps {
  workspaceType: string;
  onSwitchWorkspace: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  workspaceType,
  onSwitchWorkspace,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
            K
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            KonoSync
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-800 text-indigo-300 border border-slate-700">
            {workspaceType}
          </span>
        </div>

        {/* Actions & Backend Status */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>FastAPI Backend: Connected</span>
          </div>
          <button
            onClick={onSwitchWorkspace}
            className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-medium transition-all"
          >
            Switch Workspace
          </button>
        </div>
      </div>
    </header>
  );
};
