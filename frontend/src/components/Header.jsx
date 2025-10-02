import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export function Header({ admin, onToggleSidebar, sidebarCollapsed }) {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      // Add 'scrolled' class when user scrolls down more than 20px
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const getPageTitle = () => {
    if (location.pathname.startsWith('/students/')) {
      return 'Student Details';
    }
    switch (location.pathname) {
      case '/students':
        return 'Students Management';
      case '/checkins':
        return 'Check-ins Management';
      default:
        return 'Student Check-In Dashboard';
    }
  };

  if (!admin) return null;

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <div className="header-left">
        {sidebarCollapsed && (
          <button className="sidebar-toggle" onClick={onToggleSidebar} aria-label="Toggle Sidebar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        <h1>{getPageTitle()}</h1>
      </div>
    </header>
  );
}
