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
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`border-r flex flex-col h-screen transition-all duration-300 ease-in-out ${
      isExpanded ? 'w-80' : 'w-16'
    } ${
      isDarkMode 
        ? 'bg-gray-800 border-gray-700' 
        : !isExpanded 
          ? 'bg-gray-100 border-gray-200' 
          : 'bg-white border-gray-200'
    }`}>
      
      {!isExpanded ? (
        // Collapsed mode
        <div className="flex flex-col items-center py-4 space-y-4 h-screen overflow-hidden">
          {/* Logo */}
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
          }`}>
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
          </div>

          {/* Expand toggle button */}
          <button 
            onClick={toggleSidebar}
            className={`p-2 rounded-lg transition-colors group ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
            title="Expand sidebar"
          >
            <PanelLeftClose className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-gray-800'
            }`} />
          </button>

          {/* Main icons */}
          <button 
            className={`p-2 rounded-lg transition-colors group relative ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
            title="Quick search"
          >
            <Search className={`w-5 h-5 ${
              isDarkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-gray-800'
            }`} />
          </button>
          
          <div className="relative">
            <button 
              className={`p-2 rounded-lg transition-colors group relative ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
              title="Inbox"
            >
              <Inbox className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-gray-800'
              }`} />
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center pointer-events-none">12</span>
          </div>
          
          <div className="relative">
            <button 
              className={`p-2 rounded-lg transition-colors group relative ${
                isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
              title="Notifications"
            >
              <Bell className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-gray-800'
              }`} />
            </button>
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-5 flex items-center justify-center pointer-events-none">15+</span>
          </div>

          <div className={`w-8 h-px my-2 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
          
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
                    ? isDarkMode ? 'bg-red-600 text-white' : 'bg-blue-100 text-blue-600'
                    : isDarkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${
                  isActive 
                    ? '' 
                    : isDarkMode ? 'group-hover:text-gray-100' : 'group-hover:text-gray-800'
                }`} />
              </button>
            );
          })}
          
          {/* Spacer */}
          <div className="flex-1"></div>
          
          {/* Pro trial icon */}
          <div 
            className={`w-10 h-10 rounded-lg flex items-center justify-center cursor-pointer transition-colors group ${
              isDarkMode ? 'bg-blue-900 hover:bg-blue-800' : 'bg-blue-100 hover:bg-blue-200'
            }`}
            title="Pro trial - Click to upgrade"
          >
            <Star className={`w-5 h-5 ${
              isDarkMode ? 'text-blue-300 group-hover:text-blue-200' : 'text-blue-600 group-hover:text-blue-700'
            }`} />
          </div>
          
          {/* Bottom icons */}
          {bottomMenuItems.map((item) => {
            const Icon = item.icon;
            
            return (
              <button
                key={item.label}
                onClick={item.label === 'Dark mode' ? toggleDarkMode : undefined}
                title={item.label}
                className={`p-2 rounded-lg transition-colors group ${
                  item.label === 'Dark mode' && isDarkMode
                    ? isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                    : isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                }`}
              >
                <Icon className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-gray-800'
                }`} />
              </button>
            );
          })}
          
          {/* User avatar */}
          <div 
            className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center cursor-pointer hover:from-orange-500 hover:to-orange-600 transition-all group"
            title="Brooklyn - Pro trial"
          >
            <span className="text-white font-medium text-sm group-hover:scale-110 transition-transform">B</span>
          </div>
        </div>
      ) : (
        // Expanded mode
        <>
          {/* Header */}
          <div className={`p-4 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                }`}>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                </div>
                <span className={`font-semibold whitespace-nowrap overflow-hidden ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Pointsale</span>
              </div>
              <div className="flex items-center space-x-2">
                <Copy className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                <button 
                  onClick={toggleSidebar}
                  className={`p-1 rounded transition-colors group ${
                    isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
                  title="Collapse sidebar"
                >
                  <PanelLeftOpen className={`w-5 h-5 ${
                    isDarkMode ? 'text-gray-400 group-hover:text-gray-200' : 'text-gray-400 group-hover:text-gray-600'
                  }`} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick search */}
          <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
              isDarkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'
            }`}>
              <Search className="w-5 h-5 flex-shrink-0" />
              <span className="whitespace-nowrap overflow-hidden">Quick search</span>
            </div>
          </div>

          {/* Inbox and Notifications */}
          <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3 min-w-0">
                <Inbox className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className={`whitespace-nowrap overflow-hidden ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Inbox</span>
              </div>
              <span className={`text-sm px-2 py-1 rounded font-medium flex-shrink-0 ${
                isDarkMode ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}>12</span>
            </div>
            
            <div className={`flex items-center justify-between px-4 py-3 cursor-pointer transition-colors ${
              isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3 min-w-0">
                <Bell className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                <span className={`whitespace-nowrap overflow-hidden ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Notifications</span>
              </div>
              <span className={`text-sm px-2 py-1 rounded font-medium flex-shrink-0 ${
                isDarkMode ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}>15+</span>
            </div>
          </div>

          {/* Menu section */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h3 className={`text-sm font-medium mb-4 whitespace-nowrap overflow-hidden ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Menu</h3>
              
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
                          ? isDarkMode 
                            ? 'bg-red-600 text-white' 
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                          : isDarkMode 
                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white' 
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
              <div className={`rounded-xl p-4 border overflow-hidden ${
                isDarkMode 
                  ? 'bg-gray-750 border-gray-600' 
                  : 'bg-blue-50 border-blue-100'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 ${
                    isDarkMode ? 'bg-gray-600' : 'bg-white'
                  }`}>
                    <Star className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm whitespace-nowrap overflow-hidden ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Current plan:</div>
                    <div className={`font-semibold whitespace-nowrap overflow-hidden ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>Pro trial</div>
                  </div>
                </div>
                
                <p className={`text-sm mb-4 overflow-hidden ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
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
                    onClick={item.label === 'Dark mode' ? toggleDarkMode : undefined}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      item.label === 'Dark mode' && isDarkMode
                        ? 'bg-gray-700 text-white'
                        : isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="whitespace-nowrap overflow-hidden">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User section */}
          <div className={`border-t p-4 ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium text-sm">B</span>
                </div>
                <div className="min-w-0">
                  <div className={`font-medium whitespace-nowrap overflow-hidden ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>Brooklyn</div>
                  <div className={`text-sm whitespace-nowrap overflow-hidden ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}>Pro trial</div>
                </div>
              </div>
              <ChevronUp className={`w-5 h-5 flex-shrink-0 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-400'
              }`} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;