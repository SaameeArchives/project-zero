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
  HelpCircle,
  ChevronUp,
  PanelLeftOpen,
  PanelLeftClose
} from 'lucide-react';

// Main component for the responsive sidebar
const Sidebar = () => {
  // State to manage the sidebar's expanded/collapsed state
  const [isExpanded, setIsExpanded] = useState(false);
  // State to manage the currently active menu item
  const [activeItem, setActiveItem] = useState('Dashboard');
  // State to manage the dark mode toggle
  const [isDarkMode, setIsDarkMode] = useState(false);
  // State to manage the current theme color, defaults to 'blue'
  const [themeColor, setThemeColor] = useState('blue');

  // Array of main menu items
  const menuItems = [
    { icon: Grid3X3, label: 'Dashboard' },
    { icon: BarChart3, label: 'Product analytics' },
    { icon: FileText, label: 'Reporting' },
    { icon: Receipt, label: 'Order summary' },
    { icon: CreditCard, label: 'Invoices' },
    { icon: Building2, label: 'Manufactures' },
    { icon: Trash2, label: 'Trash' }
  ];

  // Array of bottom menu items (utility/settings)
  const bottomMenuItems = [
    { icon: Settings, label: 'Preferences' },
    { icon: Moon, label: 'Dark mode' },
    { icon: HelpCircle, label: 'Help' }
  ];

  // Available color themes for the palette selector
  const colorThemes = [
    { name: 'Blue', color: 'blue' },
    { name: 'Purple', color: 'purple' },
    { name: 'Green', color: 'green' },
    { name: 'Orange', color: 'orange' },
  ];

  // Handler for clicking a menu item
  const handleItemClick = (label) => {
    setActiveItem(label);
  };

  // Toggles the sidebar's expanded state
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  // Toggles the dark mode state
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handler for selecting a new theme color
  const handleColorChange = (color) => {
    setThemeColor(color);
  };

  // Renders a single menu item, abstracting the common logic
  const renderMenuItem = (item, isCollapsed = false) => {
    const Icon = item.icon;
    const isActive = activeItem === item.label;
    const isSpecialCase = item.label === 'Dark mode' && isDarkMode;

    // Dynamically generate Tailwind classes based on the themeColor state
    const activeClasses = isDarkMode ? `bg-${themeColor}-600 text-white` : `bg-${themeColor}-100 text-${themeColor}-700`;
    const inactiveClasses = isDarkMode ? 'text-gray-300 hover:bg-gray-700 hover:text-white' : 'text-gray-700 hover:bg-gray-50';
    const baseClasses = `rounded-lg transition-colors group`;

    // Handle special case for 'Themes' selector
    if (item.label === 'Themes' && !isCollapsed) {
        return (
          <div key="themes" className="px-3 py-2">
            <h3 className={`text-sm font-medium mb-2 whitespace-nowrap overflow-hidden ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>Themes</h3>
            <div className="flex space-x-2">
              {colorThemes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleColorChange(theme.color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ease-in-out
                    ${themeColor === theme.color ? `border-${theme.color}-500 scale-125 shadow-lg` : 'border-transparent'}
                    ${isDarkMode ? `bg-${theme.color}-500` : `bg-${theme.color}-400 hover:scale-110`}
                  `}
                  title={theme.name}
                />
              ))}
            </div>
          </div>
        );
    }

    return (
      <button
        key={item.label}
        onClick={item.label === 'Dark mode' ? toggleDarkMode : () => handleItemClick(item.label)}
        title={item.label}
        className={`
          ${baseClasses}
          ${isCollapsed ? 'p-2' : 'w-full flex items-center space-x-3 px-3 py-2 text-left'}
          ${isActive ? activeClasses : isSpecialCase ? 'bg-gray-700 text-white' : inactiveClasses}
        `}
      >
        <Icon className={`w-5 h-5 flex-shrink-0 ${isCollapsed && !isActive ? (isDarkMode ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-800') : ''}`} />
        {!isCollapsed && <span className="whitespace-nowrap overflow-hidden">{item.label}</span>}
      </button>
    );
  };

  // Dynamically generate color classes for the logo and upgrade button
  const getThemeClasses = () => {
    return isDarkMode ? `bg-${themeColor}-500` : `bg-${themeColor}-500`;
  };

  const getUpgradeSectionClasses = () => {
    return isDarkMode ? `bg-${themeColor}-950 border-${themeColor}-900` : `bg-${themeColor}-50 border-${themeColor}-100`;
  };

  return (
    // Main container with fixed header and footer
    <div
      className={`
        border-r flex flex-col h-screen transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-80' : 'w-16'}
        ${isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'}
      `}
    >
      {/* CSS for custom scrollbar */}
      <style>{`
        /* Styles for scrollbar in both modes */
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        /* Dark mode scrollbar */
        .custom-scrollbar.dark-mode::-webkit-scrollbar-track {
          background: #111827; /* gray-900 */
        }
        .custom-scrollbar.dark-mode::-webkit-scrollbar-thumb {
          background-color: #4B5563; /* gray-600 */
          border-radius: 4px;
          border: 2px solid #111827;
        }
        .custom-scrollbar.dark-mode::-webkit-scrollbar-thumb:hover {
          background-color: #6B7280; /* gray-500 */
        }

        /* Light mode scrollbar */
        .custom-scrollbar.light-mode::-webkit-scrollbar-track {
          background: #F3F4F6; /* gray-100 */
        }
        .custom-scrollbar.light-mode::-webkit-scrollbar-thumb {
          background-color: #D1D5DB; /* gray-400 */
          border-radius: 4px;
          border: 2px solid #F3F4F6;
        }
        .custom-scrollbar.light-mode::-webkit-scrollbar-thumb:hover {
          background-color: #9CA3AF; /* gray-500 */
        }
      `}</style>
      {!isExpanded ? (
        // Collapsed mode
        <div className="flex flex-col h-full items-center">
          {/* Header section (fixed) */}
          <div className="py-4">
            {/* Logo */}
            <div className={`w-10 h-10 mb-4 rounded-lg flex items-center justify-center ${getThemeClasses()}`}>
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
            </div>

            {/* Expand toggle button */}
            <button
              onClick={toggleSidebar}
              className={`p-2 rounded-lg transition-colors group ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
              }`}
              title="Expand sidebar"
            >
              <PanelLeftOpen className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-gray-800'
              }`} />
            </button>
          </div>
          
          {/* Scrollable Content */}
          <div className={`flex-1 flex flex-col items-center overflow-y-auto overflow-x-hidden custom-scrollbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {/* Quick search */}
            <button
              className={`w-10 h-10 mt-4 rounded-lg flex items-center justify-center transition-colors group relative ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
              }`}
              title="Quick search"
            >
              <Search className={`w-5 h-5 ${
                isDarkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-gray-800'
              }`} />
            </button>

            {/* Inbox icon with badge */}
            <div className="relative mt-2">
              <button
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors group relative ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
                }`}
                title="Inbox"
              >
                <Inbox className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-gray-800'
                }`} />
              </button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center pointer-events-none">12</span>
            </div>

            {/* Notifications icon with badge */}
            <div className="relative mt-2">
              <button
                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors group relative ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'
                }`}
                title="Notifications"
              >
                <Bell className={`w-5 h-5 ${
                  isDarkMode ? 'text-gray-300 group-hover:text-gray-100' : 'text-gray-600 group-hover:text-gray-800'
                }`} />
              </button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-5 flex items-center justify-center pointer-events-none">15+</span>
            </div>

            {/* Separator line */}
            <div className={`w-8 h-px my-2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>

            {/* Map through and render main menu icons */}
            <div className="space-y-2 p-4">
              {menuItems.map((item) => renderMenuItem(item, true))}
            </div>
            
            {/* Pro trial icon */}
            <div
              className={`w-10 h-10 mt-4 rounded-lg flex items-center justify-center cursor-pointer transition-colors group ${
                isDarkMode ? 'bg-blue-950 hover:bg-blue-900' : 'bg-blue-100 hover:bg-blue-200'
              }`}
              title="Pro trial - Click to upgrade"
            >
              <Star className={`w-5 h-5 ${isDarkMode ? `text-${themeColor}-300` : `text-${themeColor}-600`} group-hover:text-${themeColor}-700 transition-colors`} />
            </div>
          </div>

          {/* User avatar (fixed) */}
          <div
            className="w-10 h-10 my-4 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center cursor-pointer hover:from-orange-500 hover:to-orange-600 transition-all group"
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
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getThemeClasses()}`}>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                </div>
                <span className={`font-semibold whitespace-nowrap overflow-hidden ${
                  isDarkMode ? 'text-gray-50' : 'text-gray-900'
                }`}>Pointsale</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleSidebar}
                  className={`p-1 rounded transition-colors group ${
                    isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
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

          {/* Scrollable Content */}
          <div className={`flex-1 overflow-y-auto custom-scrollbar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {/* Quick search */}
            <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                isDarkMode ? 'text-gray-300 hover:bg-gray-800 hover:text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}>
                <Search className="w-5 h-5 flex-shrink-0" />
                <span className="whitespace-nowrap overflow-hidden">Quick search</span>
              </div>
            </div>

            {/* Inbox and Notifications */}
            <div className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              {/* Inbox item with aligned padding */}
              <div className={`flex items-center justify-between px-3 py-2 mx-4 cursor-pointer transition-colors rounded-lg ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}>
                <div className="flex items-center space-x-3 min-w-0">
                  <Inbox className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  <span className={`whitespace-nowrap overflow-hidden ${
                    isDarkMode ? 'text-gray-50' : 'text-gray-900'
                  }`}>Inbox</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded font-medium flex-shrink-0 ${
                  isDarkMode ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}>12</span>
              </div>

              {/* Notifications item with aligned padding */}
              <div className={`flex items-center justify-between px-3 py-2 mx-4 cursor-pointer transition-colors rounded-lg ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}>
                <div className="flex items-center space-x-3 min-w-0">
                  <Bell className={`w-5 h-5 flex-shrink-0 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  <span className={`whitespace-nowrap overflow-hidden ${
                    isDarkMode ? 'text-gray-50' : 'text-gray-900'
                  }`}>Notifications</span>
                </div>
                <span className={`text-sm px-2 py-1 rounded font-medium flex-shrink-0 ${
                  isDarkMode ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'
                }`}>15+</span>
              </div>
            </div>

            {/* Menu section */}
            <div className="p-4">
              <h3 className={`text-sm font-medium mb-4 whitespace-nowrap overflow-hidden ${
                isDarkMode ? 'text-gray-400' : 'text-gray-500'
              }`}>Menu</h3>
              <div className="space-y-1">
                {menuItems.map((item) => renderMenuItem(item))}
              </div>
            </div>

            {/* Pro trial upgrade section */}
            <div className="p-4">
              <div className={`rounded-xl p-4 border overflow-hidden ${getUpgradeSectionClasses()}`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm flex-shrink-0 ${
                    isDarkMode ? 'bg-blue-900' : 'bg-white'
                  }`}>
                    <Star className={`w-4 h-4 ${isDarkMode ? `text-${themeColor}-400` : `text-${themeColor}-600`} transition-colors`} />
                  </div>
                  <div className="min-w-0">
                    <div className={`text-sm whitespace-nowrap overflow-hidden ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Current plan:</div>
                    <div className={`font-semibold whitespace-nowrap overflow-hidden ${
                      isDarkMode ? 'text-gray-50' : 'text-gray-900'
                    }`}>Pro trial</div>
                  </div>
                </div>

                <p className={`text-sm mb-4 overflow-hidden ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Upgrade to Pro to get the latest and exclusive features
                </p>

                <button className={`w-full font-medium py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${
                  isDarkMode ? `bg-${themeColor}-500 hover:bg-${themeColor}-600 text-white` : `bg-${themeColor}-600 hover:bg-${themeColor}-700 text-white`
                }`}>
                  <span className="text-lg">⚡</span>
                  <span className="whitespace-nowrap">Upgrade to Pro</span>
                </button>
              </div>
            </div>

            {/* Bottom menu items and integrated theme selector */}
            <div className="p-4">
              <div className="space-y-1">
                {bottomMenuItems.map((item) => (
                  <React.Fragment key={item.label}>
                    {renderMenuItem(item)}
                    {item.label === 'Dark mode' && (
                      <div className="px-3 py-2">
                        <h3 className={`text-sm font-medium mb-2 whitespace-nowrap overflow-hidden ${
                          isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>Themes</h3>
                        <div className="flex space-x-2">
                          {colorThemes.map((theme) => (
                            <button
                              key={theme.name}
                              onClick={() => handleColorChange(theme.color)}
                              className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ease-in-out
                                ${themeColor === theme.color ? `border-${theme.color}-500 scale-125 shadow-lg` : 'border-transparent'}
                                ${isDarkMode ? `bg-${theme.color}-500` : `bg-${theme.color}-400 hover:scale-110`}
                              `}
                              title={theme.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
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
                    isDarkMode ? 'text-gray-50' : 'text-gray-900'
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
