import React, { useState } from 'react';
import {
  Search,
  Inbox,
  Bell,
  Grid3X3,
  BarChart3,
  FileText,
  Receipt,
  CreditCard,
  Building2,
  Trash2,
  Star,
  Settings,
  Moon,
  Palette,
  HelpCircle,
  ChevronUp,
  Copy,
  PanelLeftOpen,
  PanelLeftClose
} from 'lucide-react';

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { icon: Grid3X3, label: 'Dashboard' },
    { icon: BarChart3, label: 'Product analytics' },
    { icon: FileText, label: 'Reporting' },
    { icon: Receipt, label: 'Order summary' },
    { icon: CreditCard, label: 'Invoices' },
    { icon: Building2, label: 'Manufactures' },
    { icon: Trash2, label: 'Trash' }
  ];

  const bottomMenuItems = [
    { icon: Settings, label: 'Preferences' },
    { icon: Moon, label: 'Dark mode' },
    { icon: Palette, label: 'Themes' },
    { icon: HelpCircle, label: 'Help' }
  ];

  const handleItemClick = (label) => {
    setActiveItem(label);
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  if (!isExpanded) {
    // Collapsed mode
    return (
      <div className="w-16 bg-gray-100 border-r border-gray-200 flex flex-col items-center py-4 space-y-4 h-screen">
        {/* Logo */}
        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
        </div>

        {/* Expand toggle button */}
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors group"
          title="Expand sidebar"
        >
          <PanelLeftClose className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
        </button>

        {/* Main icons */}
        <button 
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors group relative"
          title="Quick search"
        >
          <Search className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
        </button>
        
        <div className="relative">
          <button 
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors group relative"
            title="Inbox"
          >
            <Inbox className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center pointer-events-none">12</span>
        </div>
        
        <div className="relative">
          <button 
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors group relative"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-5 flex items-center justify-center pointer-events-none">15+</span>
        </div>

        <div className="w-8 h-px bg-gray-300 my-2"></div>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.label;
          
          return (
            <button
              key={item.label}
              onClick={() => handleItemClick(item.label)}
              title={item.label}
              className={`p-2 rounded-lg transition-colors group relative ${
                isActive 
                  ? 'bg-blue-100 text-blue-600' 
                  : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? '' : 'group-hover:text-gray-800'}`} />
            </button>
          );
        })}
        
        {/* Spacer */}
        <div className="flex-1"></div>
        
        {/* Pro trial icon */}
        <div 
          className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors group"
          title="Pro trial - Click to upgrade"
        >
          <Star className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
        </div>
        
        {/* Bottom icons */}
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <button
              key={item.label}
              title={item.label}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors group"
            >
              <Icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
            </button>
          );
        })}
        
        {/* User avatar */}
        <div className="w-10 h-10 bg-orange-400 rounded-lg flex items-center justify-center">
          <span className="text-white font-medium text-sm">B</span>
        </div>
      </div>
    );
  }

  // Expanded mode
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-screen">
        <>
          {/* Header */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                </div>
                <span className="font-semibold text-gray-900 whitespace-nowrap overflow-hidden">Pointsale</span>
              </div>
              <div className="flex items-center space-x-2">
                <Copy className="w-5 h-5 text-gray-400" />
                <button 
                  onClick={toggleSidebar}
                  className="p-1 hover:bg-gray-100 rounded transition-colors group"
                  title="Collapse sidebar"
                >
                  <PanelLeftOpen className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick search */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-3 text-gray-600 hover:bg-gray-50 px-3 py-2 rounded-lg cursor-pointer transition-colors">
              <Search className="w-5 h-5 flex-shrink-0" />
              <span className="whitespace-nowrap overflow-hidden">Quick search</span>
            </div>
          </div>

          {/* Inbox and Notifications */}
          <div className="border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3 min-w-0">
                <Inbox className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <span className="text-gray-900 whitespace-nowrap overflow-hidden">Inbox</span>
              </div>
              <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded font-medium flex-shrink-0">12</span>
            </div>
            
            <div className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors">
              <div className="flex items-center space-x-3 min-w-0">
                <Bell className="w-5 h-5 text-gray-600 flex-shrink-0" />
                <span className="text-gray-900 whitespace-nowrap overflow-hidden">Notifications</span>
              </div>
              <span className="bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded font-medium flex-shrink-0">15+</span>
            </div>
          </div>

          {/* Menu section */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-500 mb-4 whitespace-nowrap overflow-hidden">Menu</h3>
              
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeItem === item.label;
                  
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleItemClick(item.label)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pro trial upgrade section */}
            <div className="p-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 overflow-hidden">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                    <Star className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-gray-600 whitespace-nowrap overflow-hidden">Current plan:</div>
                    <div className="font-semibold text-gray-900 whitespace-nowrap overflow-hidden">Pro trial</div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 overflow-hidden">
                  Upgrade to Pro to get the latest and exclusive features
                </p>
                
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors">
                  <span className="text-lg">⚡</span>
                  <span className="whitespace-nowrap">Upgrade to Pro</span>
                </button>
              </div>
            </div>

            {/* Bottom menu items */}
            <div className="p-4 space-y-1">
              {bottomMenuItems.map((item) => {
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.label}
                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium text-sm">B</span>
                </div>
                <div className="min-w-0">
                  <div className="font-medium text-gray-900 whitespace-nowrap overflow-hidden">Brooklyn</div>
                  <div className="text-sm text-gray-500 whitespace-nowrap overflow-hidden">Pro trial</div>
                </div>
              </div>
              <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;