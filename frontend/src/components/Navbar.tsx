import React from "react";

interface NavbarProps {
  workspaceName: string;
  onSwitchWorkspace: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  workspaceName,
  onSwitchWorkspace,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-50 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center font-mono font-bold text-xs text-white">
            K
          </div>
          <span className="font-semibold text-sm tracking-tight text-white">
            KonoSync
          </span>
        </div>
        <span className="text-slate-700">/</span>
        <div className="flex items-center space-x-2 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>{workspaceName}</span>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-md bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Backend Connected</span>
        </div>
        <button
          onClick={onSwitchWorkspace}
          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-medium transition-all"
        >
          Switch Workspace
        </button>
      </div>
    </header>
  );
};
