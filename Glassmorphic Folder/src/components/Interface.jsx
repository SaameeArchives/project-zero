import React, { useState, useEffect } from 'react';
import { Search, Grid, Clock, Battery, Wifi, MoreVertical, HardDrive, Star, Cloud, Settings, Command, Bell, User, Plus, X } from 'lucide-react';

// --- MOCK DATA ---
const INITIAL_FOLDERS = [
  {
    id: 'f1',
    title: 'Project Specs',
    color: 'bg-blue-100',
    files: [
      { id: 101, title: 'Architecture.pdf' },
      { id: 102, title: 'User_Flows.fig' },
      { id: 103, title: 'ReadMe.txt' },
      { id: 104, title: 'Roadmap_2024.pdf' },
    ]
  },
  {
    id: 'f2',
    title: 'Brand Assets',
    color: 'bg-purple-100',
    files: [
      { id: 201, title: 'Logo_Main.svg' },
      { id: 202, title: 'Style_Guide.doc' },
      { id: 203, title: 'Colors.json' },
    ]
  },
  {
    id: 'f3',
    title: 'Budget 2024',
    color: 'bg-emerald-100',
    files: [
      { id: 301, title: 'Q1_Expenses.xlsx' },
      { id: 302, title: 'Forecast.xlsx' },
    ]
  },
  {
    id: 'f4',
    title: 'Marketing',
    color: 'bg-rose-100',
    files: [
      { id: 401, title: 'Ad_Campaign.mp4' },
      { id: 402, title: 'Social_Posts.zip' },
      { id: 403, title: 'Pr_Release.doc' },
    ]
  },
  {
    id: 'f5',
    title: 'Archive 23',
    color: 'bg-slate-100',
    files: [
      { id: 501, title: 'Old_Site.zip' },
      { id: 502, title: 'Legacy.doc' },
    ]
  }
];

// --- SUB-COMPONENTS ---

const FileCard = ({ title, color, index, isExpanded, isHovered }) => {
  let transformStyle = '';
  const isVisibleInStack = index < 3;

  if (isExpanded) {
    transformStyle = 'none';
  } else if (isHovered && isVisibleInStack) {
    // EDITED: Cards now fan out in different directions
    if (index === 0) transformStyle = 'translate(-15px, -45px) rotate(-10deg)'; // Front card moves Left
    if (index === 1) transformStyle = 'translate(15px, -40px) rotate(10deg)';   // Middle card moves Right
    if (index === 2) transformStyle = 'translate(0px, -55px) rotate(0deg)';     // Back card moves Up/Center
  } else {
    if (index === 0) transformStyle = 'translate(0px, 0px) scale(1)';
    else if (index === 1) transformStyle = 'translate(10px, -4px) rotate(4deg) scale(0.96)';
    else if (index === 2) transformStyle = 'translate(-10px, -6px) rotate(-4deg) scale(0.92)';
    else transformStyle = 'scale(0.8) opacity(0)';
  }

  return (
    <div
      className={`
        bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col p-3 gap-2 shrink-0 select-none
        transition-all duration-700 cubic-bezier(0.25, 1, 0.5, 1)
        ${isExpanded
          ? 'w-44 h-56 opacity-100 hover:translate-y-[-6px] cursor-pointer relative'
          : `absolute w-32 h-40 origin-bottom shadow-xl ${!isVisibleInStack ? 'opacity-0' : 'opacity-100'}`
        }
      `}
      style={{
        transform: transformStyle,
        zIndex: isExpanded ? 1 : 10 - index,
        bottom: isExpanded ? 'auto' : '12px',
        transitionDelay: isExpanded ? `${index * 60}ms` : '0ms'
      }}
    >
      <div className="flex items-center gap-2">
        <div className={`w-7 h-7 rounded-lg ${color} flex items-center justify-center`}>
          <div className="w-2.5 h-2.5 rounded-full bg-white/50"></div>
        </div>
        <div className="flex-1">
          <div className="h-1.5 w-6 bg-gray-200 rounded-full mb-1"></div>
          <div className="h-1.5 w-10 bg-gray-100 rounded-full"></div>
        </div>
      </div>

      <div className="space-y-1.5 mt-1">
        <div className="w-full h-1 bg-gray-100 rounded-full"></div>
        <div className="w-5/6 h-1 bg-gray-100 rounded-full"></div>
        <div className="w-full h-1 bg-gray-100 rounded-full"></div>
      </div>

      <div className="mt-auto pt-2 border-t border-gray-50 flex justify-between items-center">
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest truncate pr-1">{title}</span>
        <div className="w-1.5 h-1.5 rounded-full bg-gray-200"></div>
      </div>
    </div>
  );
};

const Folder = ({ data, isFullView, isClosing, onOpen, onClose }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isFullView) {
      requestAnimationFrame(() => setMounted(true));
    } else {
      setMounted(false);
    }
  }, [isFullView]);

  // Combined state to determine if we are showing the full content nicely
  const isActive = isFullView && mounted && !isClosing;

  return (
    <div
      onClick={() => !isFullView && onOpen()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        transition-all duration-500 cubic-bezier(0.2, 0.8, 0.2, 1)
        ${isFullView
          ? `absolute inset-0 z-50 p-8 md:p-12 bg-white ${isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`
          : 'relative w-full h-48 cursor-pointer'
        }
      `}
    >
      {/* Back Panel */}
      <div className={`
        absolute inset-0 bg-[#111] rounded-[24px] shadow-2xl origin-center transition-all duration-700
        ${isFullView ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100 scale-100'}
      `}>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700/30 to-black rounded-[inherit] opacity-60"></div>
      </div>

      {/* Glass Front */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 z-30 
          bg-gradient-to-b from-white/20 to-white/5
          backdrop-blur-md border-t border-white/30 border-x border-white/10
          shadow-[0_-5px_15px_rgba(0,0,0,0.1)]
          rounded-b-[24px] rounded-t-xl
          overflow-hidden pointer-events-none origin-bottom
          transition-all duration-700 ease-in-out
          ${isFullView ? 'opacity-0' : 'h-[62%]'}
        `}
        style={{ transform: !isFullView ? 'perspective(400px) rotateX(-15deg)' : 'none' }}
      >
        <div className="absolute top-0 inset-x-0 h-[1px] bg-white/50 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>

        {/* Title on Glass - UPDATED: Centered Alignment */}
        {!isFullView && (
          <div className="absolute bottom-6 inset-x-0 text-center px-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-widest  truncate">{data.title}</h3>
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className={`
        transition-all duration-700
        ${isFullView
          ? 'relative w-full h-full flex content-start flex-wrap gap-8 z-20'
          : 'absolute inset-0 flex justify-center items-end pb-4 z-20'
        }
      `}>
        {/* Floating Close Button REMOVED - Logic moved to header below */}

        {isFullView && (
          // EDITED: Header now uses justify-between to group Title (left) and Buttons (right)
          <div className="w-full mb-8 flex items-center justify-between border-b border-slate-100 pb-6 shrink-0">
            <div>
              <h2 className="text-3xl font-light text-slate-900 tracking-tight">{data.title}</h2>
              <p className="text-slate-400 text-sm mt-1">{data.files.length} active documents</p>
            </div>

            <div className="flex items-center gap-3">
              {/* Action Button for Folder */}
              <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg hover:scale-105 active:scale-95">
                <Plus size={16} />
                <span>Add File</span>
              </button>

              {/* Integrated Close Button */}
              <button
                onClick={(e) => { e.stopPropagation(); onClose(); }}
                className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-all duration-300 hover:rotate-90 hover:scale-110 active:scale-95 shadow-sm border border-slate-200"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {data.files.map((file, idx) => (
          <FileCard
            key={file.id}
            {...file}
            color={data.color}
            index={idx}
            isExpanded={isFullView}
            isHovered={isHovered}
          />
        ))}

        {isFullView && (
          <div className="w-44 h-56 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-3 text-slate-300 hover:border-blue-400 hover:text-blue-400 hover:bg-blue-50 transition-all cursor-pointer animate-in fade-in duration-700" style={{ animationDelay: '300ms', animationFillMode: 'both' }}>
            <Plus size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Add Item</span>
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN INTERFACE ---

const Interface = () => {
  const [currentView, setCurrentView] = useState('Workspace');
  const [activeFolderId, setActiveFolderId] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(t);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for the animation to complete before unmounting
    setTimeout(() => {
      setActiveFolderId(null);
      setIsClosing(false);
    }, 500);
  };

  const activeFolder = INITIAL_FOLDERS.find(f => f.id === activeFolderId);

  return (
    <div className="min-h-screen bg-[#f1f5f9] font-sans text-slate-900 overflow-hidden flex flex-col">

      {/* Universal Top Nav */}
      <nav className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-[60] shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <Command size={16} />
            </div>
            <span className="font-bold text-base tracking-tighter">PROJECT ZERO</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {['Workspace', 'Shared', 'Cloud'].map(item => (
              <button
                key={item}
                onClick={() => setCurrentView(item)}
                className={`text-xs font-bold uppercase tracking-widest transition-colors ${currentView === item ? 'text-slate-900 relative' : 'text-slate-400 hover:text-slate-700'
                  }`}
              >
                {item}
                {currentView === item && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-slate-900 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search assets..."
              className="bg-slate-100 border-none rounded-full pl-9 pr-4 py-1.5 text-xs w-48 focus:ring-2 focus:ring-slate-200 transition-all"
            />
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <Bell size={18} className="hover:text-slate-600 cursor-pointer" />
            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
              <User size={16} />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 relative overflow-hidden">

        {/* Full Expanded View Portal */}
        {activeFolderId && (
          <div className={`absolute inset-0 z-50 bg-white/50 backdrop-blur-sm transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
            <Folder
              data={activeFolder}
              isFullView={true}
              isClosing={isClosing}
              onClose={handleClose}
            />
          </div>
        )}

        {/* Grid of Folders */}
        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-light text-slate-900 tracking-tight">{currentView}</h1>
              <p className="text-slate-400 text-sm mt-1">
                {currentView === 'Workspace' && "Manage project resources and active drafts"}
                {currentView === 'Shared' && "Collaborate on shared assets and team projects"}
                {currentView === 'Cloud' && "Access your synchronized files and backups"}
              </p>
            </div>

            {/* Top Level Actions */}
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg hover:scale-105 active:scale-95">
                <Plus size={16} />
                <span>New Project</span>
              </button>

              <div className="flex gap-2 text-slate-400 items-center">
                <Grid size={18} className="text-slate-900" />
                <div className="w-px h-4 bg-slate-200 mx-1"></div>
                <MoreVertical size={18} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16">
            {INITIAL_FOLDERS.map(folder => (
              <Folder
                key={folder.id}
                data={folder}
                isFullView={false}
                onOpen={() => setActiveFolderId(folder.id)}
              />
            ))}

            {/* Ghost New Folder Placeholder */}
            <div className="h-48 rounded-[24px] border-2 border-dashed border-slate-300 flex flex-col items-center justify-center gap-3 text-slate-400 hover:bg-white hover:border-slate-400 transition-all cursor-pointer group">
              <div className="p-2 bg-slate-200 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition-all">
                <Plus size={20} />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest">New Project</span>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <footer className="absolute bottom-0 inset-x-0 h-9 bg-white/80 backdrop-blur-md border-t border-slate-200 px-6 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> Online</span>
            <span className="hidden sm:inline">Storage: 42.8 GB Free</span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Wifi size={12} /> <span>Node_Primary</span>
            </div>
            <div className="w-px h-3 bg-slate-200"></div>
            <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Interface;