import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, GitPullRequest, BarChart3, Settings } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-surface border-r border-slate-700/50 flex flex-col hidden md:flex">
      <div className="p-6 flex items-center gap-3 border-b border-slate-700/50">
        <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/50 flex items-center justify-center">
          <GitPullRequest className="text-primary w-5 h-5" />
        </div>
        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">
          AI Reviewer
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`
          }
        >
          <LayoutDashboard className="w-5 h-5" />
          <span className="font-medium">Dashboard</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive ? 'bg-primary/10 text-primary border border-primary/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`
          }
        >
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium">Analytics</span>
        </NavLink>
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors rounded-lg hover:bg-slate-800">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
