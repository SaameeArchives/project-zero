import React, { useState } from 'react';
import { Settings, X, RotateCcw } from 'lucide-react';

const Folder = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showConfig, setShowConfig] = useState(true);

  // Configuration State
  const defaultConfig = {
    // Physics (Hidden but active)
    animDuration: 700,
    hoverLift: 80,
    hoverSpread: 20,
    hoverRotate: 12,
    baseScale: 1,
    perspective: 1000,

    // Visuals
    appBg: '#e8eef5',
    folderColor: '#111111',
    folderRadius: 32,      // Controls corner roundness
    glassOpacity: 0.2,
    glassBlur: 12,
  };

  const [config, setConfig] = useState(defaultConfig);

  const resetConfig = () => setConfig(defaultConfig);

  const handleConfigChange = (key, value) => {
    const newValue = key === 'appBg' || key === 'folderColor' ? value : Number(value);
    setConfig(prev => ({ ...prev, [key]: newValue }));
  };

  // Mock data
  const files = [
    { id: 1, color: 'bg-blue-100', title: 'Project Specs' },
    { id: 2, color: 'bg-purple-100', title: 'Assets' },
    { id: 3, color: 'bg-emerald-100', title: 'Budget 2024' },
    { id: 4, color: 'bg-orange-100', title: 'Q1 Report' },
    { id: 5, color: 'bg-rose-100', title: 'Marketing' },
    { id: 6, color: 'bg-slate-100', title: 'Archive' },
  ];

  // Helper for dynamic transition styles
  const transitionStyle = {
    transitionProperty: 'all',
    transitionDuration: `${config.animDuration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
  };

  // Reusable Range Input Component (Dotted/Industrial Style)
  const RangeControl = ({ label, value, min, max, step = 1, onChange, unit = '' }) => {
    const ratio = (value - min) / (max - min);
    const percentage = Math.min(100, Math.max(0, ratio * 100));

    return (
      <div className="group">
        <div className="flex justify-between items-center text-[10px] mb-2 font-bold text-white/50 group-hover:text-white/80 transition-colors duration-300">
          <span className="uppercase tracking-[0.2em]">{label}</span>
          <span className="font-mono text-white/90 bg-white/5 px-2 py-0.5 rounded-md">{value}{unit}</span>
        </div>

        <div className="relative h-7 w-full select-none">
          <input
            type="range" min={min} max={max} step={step}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
          />

          {/* Track Container */}
          <div className="absolute inset-0 rounded-full border border-white/10 bg-[#0c0c0e] overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">

            {/* Active Fill Bar */}
            <div
              className="h-full bg-white/80 relative transition-all duration-150 ease-out rounded-r-[2px]"
              style={{ width: `${percentage}%` }}
            >
              {/* Glowing end cap */}
              <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white to-transparent opacity-50"></div>
              <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
            </div>

            {/* Dots Pattern - Layered on top with blend mode to show on both white and black */}
            <div
              className="absolute inset-0 w-full h-full opacity-40 pointer-events-none z-10 mix-blend-difference"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,1) 1.5px, transparent 1.5px)',
                backgroundSize: '16px 100%',
                backgroundPosition: '8px center',
                backgroundRepeat: 'repeat-x'
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-sans overflow-hidden relative transition-colors duration-700"
      style={{ backgroundColor: config.appBg }}
    >
      {/* Inject custom scrollbar styles for a cleaner "overflowing" look */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
        .custom-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* --- TRIGGER BUTTON --- */}
      {/* --- TRIGGER BUTTON (Improved Visibility) --- */}
      <button
        onClick={() => setShowConfig(true)}
        className={`
          fixed top-8 left-8 z-50 w-14 h-14 
          bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-[0_12px_30px_rgba(0,0,0,0.3)]
          text-white rounded-full 
          flex items-center justify-center 
          hover:scale-110 hover:bg-slate-900 transition-all duration-500 cubic-bezier(0.19, 1, 0.22, 1)
          group
          ${showConfig ? 'opacity-0 pointer-events-none -translate-x-full rotate-[-180deg]' : 'opacity-100 translate-x-0 rotate-0'}
        `}
      >
        <Settings size={24} className="group-hover:rotate-90 transition-transform duration-700 ease-in-out" />
      </button>

      {/* --- SIDEBAR CONFIGURATION (Enhanced Project Zero Style) --- */}
      <div className={`
        fixed top-4 bottom-4 left-4 z-[100] w-[350px]
        bg-[#09090b]/90 backdrop-blur-3xl border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] 
        rounded-[40px] overflow-hidden
        transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1) flex flex-col
        ${showConfig ? 'translate-x-0 opacity-100' : '-translate-x-[120%] opacity-0'}
      `}>

        {/* Header - Glassmorphic Header */}
        <div className="px-10 pt-10 pb-6 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-2xl font-semibold text-white tracking-tight">System</h2>
            <p className="text-[10px] text-blue-400 mt-1 font-bold tracking-[0.2em] uppercase">Control Panel</p>
          </div>
          <button
            onClick={() => setShowConfig(false)}
            className="w-11 h-11 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/50 hover:text-white transition-all active:scale-90"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-10 pb-10 space-y-12 custom-scrollbar">

          {/* Section: theming */}
          <div className="space-y-6">
            <h3 className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] flex items-center gap-3">
              Appearance
              <div className="h-px flex-1 bg-white/10"></div>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Canvas Color */}
              <div className="group flex flex-col gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all cursor-pointer">
                <div className="relative w-12 h-12 rounded-full shadow-inner ring-1 ring-white/10 overflow-hidden group-hover:ring-blue-500/50 transition-all">
                  <input
                    type="color" value={config.appBg}
                    onChange={(e) => handleConfigChange('appBg', e.target.value)}
                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer border-none p-0"
                  />
                </div>
                <label className="text-[10px] font-bold text-white/50 group-hover:text-white/60 transition-colors uppercase tracking-[0.2em]">Environment</label>
              </div>

              {/* Folder Color */}
              <div className="group flex flex-col gap-4 p-4 bg-white/[0.03] rounded-2xl border border-white/5 hover:border-blue-500/30 hover:bg-white/[0.05] transition-all cursor-pointer">
                <div className="relative w-12 h-12 rounded-full shadow-inner ring-1 ring-white/10 overflow-hidden group-hover:ring-blue-500/50 transition-all">
                  <input
                    type="color" value={config.folderColor}
                    onChange={(e) => handleConfigChange('folderColor', e.target.value)}
                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] cursor-pointer border-none p-0"
                  />
                </div>
                <label className="text-[10px] font-bold text-white/50 group-hover:text-white/60 transition-colors uppercase tracking-[0.2em]">Folder Tint</label>
              </div>
            </div>
          </div>

          {[
            {
              title: 'Geometry', controls: [
                { label: 'Radius', key: 'folderRadius', min: 4, max: 60, unit: 'px' }
              ]
            },
            {
              title: 'Glass Properties', controls: [
                { label: 'Transparency', key: 'glassOpacity', min: 0, max: 0.9, step: 0.05 },
                { label: 'Blur', key: 'glassBlur', min: 0, max: 40, unit: 'px' }
              ]
            },
            {
              title: 'Physics', controls: [
                { label: 'Duration', key: 'animDuration', min: 200, max: 2000, step: 50, unit: 'ms' }
              ]
            }
          ].map((section, idx) => (
            <div key={idx} className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-700" style={{ animationDelay: `${idx * 100}ms`, animationFillMode: 'both' }}>
              <h3 className="text-[10px] font-black text-white/60 uppercase tracking-[0.3em] flex items-center gap-3">
                {section.title}
                <div className="h-px flex-1 bg-white/10"></div>
              </h3>

              <div className="space-y-8">
                {section.controls.map(ctrl => (
                  <RangeControl
                    key={ctrl.key}
                    label={ctrl.label}
                    value={config[ctrl.key]}
                    min={ctrl.min} max={ctrl.max} step={ctrl.step}
                    onChange={(v) => handleConfigChange(ctrl.key, v)}
                    unit={ctrl.unit}
                  />
                ))}
              </div>
            </div>
          ))}

        </div>

        {/* Footer */}
        <div className="p-8 border-t border-white/5 shrink-0 bg-black/40">
          <button
            onClick={resetConfig}
            className="w-full py-4 bg-blue-600/10 hover:bg-blue-600/20 active:scale-[0.98] text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all border border-blue-500/20 shadow-lg shadow-blue-500/5 group"
          >
            <RotateCcw size={14} className="group-hover:rotate-[-180deg] transition-transform duration-500" />
            Reset all settings
          </button>
        </div>
      </div>


      {/* --- MAIN INTERACTIVE CONTAINER --- */}
      <div
        onClick={() => !isExpanded && setIsExpanded(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative transition-all
          ${isExpanded
            ? 'w-full h-96 cursor-default z-50'
            : 'w-64 h-56 cursor-pointer'
          }
        `}
        style={{
          ...transitionStyle,
          // Shift the folder right when config is open
          transform: isExpanded
            ? 'none'
            : `scale(${config.baseScale}) translateX(${showConfig ? '120px' : '0px'})`
        }}
      >

        {/* --- 1. THE FOLDER CHROME (Back & Glass) --- */}

        {/* Back Panel */}
        <div
          className={`
            absolute inset-0 shadow-2xl origin-center
            ${isExpanded ? 'opacity-0 scale-150 pointer-events-none' : 'opacity-100 scale-100'}
          `}
          style={{
            ...transitionStyle,
            backgroundColor: config.folderColor,
            borderRadius: `${config.folderRadius}px`
          }}
        >
          {/* Inner plastic texture */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/50 rounded-[inherit]"></div>
        </div>

        {/* Glass Front Panel */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 z-30 
            border-t border-white/30 border-x border-white/10
            shadow-[0_-5px_20px_rgba(0,0,0,0.1)]
            rounded-t-2xl
            overflow-hidden pointer-events-none origin-bottom
            ${isExpanded
              ? 'opacity-0'
              : 'opacity-100 h-[65%]'
            }
          `}
          style={{
            ...transitionStyle,
            // Dynamic Glass Styles
            backgroundColor: 'transparent',
            backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,${config.glassOpacity}), rgba(255,255,255,${Math.max(0, config.glassOpacity - 0.15)}))`,
            backdropFilter: `blur(${config.glassBlur}px)`,

            // Apply dynamic border radius to bottom corners only
            borderBottomLeftRadius: `${config.folderRadius}px`,
            borderBottomRightRadius: `${config.folderRadius}px`,

            // 3D Transform
            transform: isExpanded
              ? 'translateY(5rem) scale(1.5)' // Fly out state
              : `perspective(${config.perspective}px) rotateX(-30deg)` // Resting state
          }}
        >
          <div className="absolute top-0 inset-x-0 h-[1px] bg-white/50 shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
          <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/10 to-transparent rotate-45"></div>
        </div>

        {/* Floor Shadow */}
        <div
          className={`
            absolute -bottom-8 left-10 right-10 h-6 bg-black/40 blur-2xl rounded-full 
            ${isExpanded ? 'opacity-0 scale-150' : 'opacity-100 scale-100'}
          `}
          style={transitionStyle}
        ></div>


        {/* --- 2. THE FILES (Content) --- */}
        <div className={`
          absolute inset-0 z-20
          ${isExpanded
            ? 'flex items-center overflow-x-auto gap-8 px-8 py-4' // Row Layout
            : 'flex justify-center items-end pb-4' // Stack Layout
          }
          /* Hide scrollbar */
          custom-scrollbar
        `}
          style={{
            ...transitionStyle,
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {files.map((file, index) => {
            const isVisibleInStack = index < 3;

            // Calculate Transform States
            let transformStyle = '';

            if (isExpanded) {
              // Expanded: Reset transforms
              transformStyle = 'none';
            } else if (isHovered && isVisibleInStack) {
              // --- DYNAMIC HOVER STATE ---
              let x = 0;
              let y = -config.hoverLift; // Base lift
              let r = 0;

              if (index === 0) {
                x = -config.hoverSpread;
                y = -config.hoverLift - 20; // Top card goes higher
                r = -config.hoverRotate;
              } else if (index === 1) {
                x = 0;
                y = -config.hoverLift * 0.75;
                r = -config.hoverRotate * 0.25;
              } else if (index === 2) {
                x = config.hoverSpread;
                y = -config.hoverLift * 0.5;
                r = config.hoverRotate * 0.5;
              }

              transformStyle = `translate(${x}px, ${y}px) rotate(${r}deg)`;

            } else {
              // --- RESTING STACK STATE ---
              if (index === 0) transformStyle = 'translate(0px, 0px) scale(1)';
              else if (index === 1) transformStyle = 'translate(16px, -6px) rotate(5deg) scale(0.95)';
              else if (index === 2) transformStyle = 'translate(-16px, -6px) rotate(-5deg) scale(0.9)';
              else transformStyle = 'translate(0px, 0px) scale(0.8) opacity(0)'; // Hide others
            }

            return (
              <div
                key={file.id}
                className={`
                  bg-white rounded-xl shadow-xl border border-gray-100 flex flex-col p-5 gap-4 shrink-0
                  ${isExpanded
                    ? 'w-72 h-80 opacity-100 hover:scale-[1.02] cursor-pointer'
                    : `absolute w-44 h-48 origin-bottom ${!isVisibleInStack ? 'opacity-0' : 'opacity-100'}`
                  }
                `}
                style={{
                  ...transitionStyle,
                  transitionDuration: `${Math.max(config.animDuration * 0.7, 300)}ms`,
                  transform: transformStyle,
                  zIndex: isExpanded ? 1 : 3 - index,
                  bottom: isExpanded ? 'auto' : '20px'
                }}
              >
                {/* Card Content */}
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${file.color} flex items-center justify-center text-gray-600`}>
                    <div className="w-4 h-4 rounded-full bg-white/50"></div>
                  </div>
                  <div className="flex-1">
                    <div className="h-2 w-12 bg-gray-200 rounded-full mb-1"></div>
                    <div className="h-2 w-20 bg-gray-100 rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-2 mt-2">
                  <div className="w-full h-2 bg-gray-100 rounded-full"></div>
                  <div className="w-5/6 h-2 bg-gray-100 rounded-full"></div>
                  <div className="w-full h-2 bg-gray-100 rounded-full"></div>
                  <div className="w-4/5 h-2 bg-gray-100 rounded-full"></div>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{file.title}</span>
                  <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                </div>
              </div>
            );
          })}
        </div>


        {/* --- 3. CLOSE BUTTON (When Expanded) --- */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(false);
            setIsHovered(false); // Reset hover state on close
          }}
          className={`
            absolute -top-12 right-0 z-50 px-4 py-2 rounded-full 
            bg-black/80 backdrop-blur-md text-white text-sm font-medium shadow-lg hover:bg-black/90 border border-white/20
            delay-100
            ${isExpanded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}
          `}
          style={transitionStyle}
        >
          Close View
        </button>

      </div>
    </div>
  );
};

export default Folder;