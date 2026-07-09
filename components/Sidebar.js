// components/Sidebar.js
import React from 'react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'my-labs', label: 'My Labs', icon: 'FlaskConical' },
    { id: 'all-labs', label: 'All Labs', icon: 'Grid' },
    { id: 'my-sessions', label: 'My Sessions', icon: 'Clock' },
    { id: 'help', label: 'Help & Support', icon: 'HelpCircle' }
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">AWS</span>
        <span className="logo-text">Lab Portal</span>
      </div>

      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li 
            key={item.id} 
            className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            {activeTab === item.id && <span className="active-dot"></span>}
            <span className="menu-label">{item.label}</span>
          </li>
        ))}
      </ul>

      <div className="sidebar-footer">
        <button className="help-button">Open Help</button>
      </div>
    </nav>
  );
};

export default Sidebar;