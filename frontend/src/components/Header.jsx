import React from 'react';
import { Bell, Search, GitBranch } from 'lucide-react';

const Header = () => {
  return (
    <header className="h-16 bg-surface/50 backdrop-blur-md border-b border-slate-700/50 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center bg-slate-800/50 rounded-lg px-3 py-1.5 border border-slate-700/50 w-64">
        <Search className="w-4 h-4 text-slate-400 mr-2" />
        <input 
          type="text" 
          placeholder="Search reviews..." 
          className="bg-transparent border-none outline-none text-sm text-slate-200 w-full placeholder-slate-500"
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-400 hover:text-slate-200 transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 overflow-hidden">
          <GitBranch className="w-5 h-5 text-slate-300" />
        </div>
      </div>
    </header>
  );
};

export default Header;
