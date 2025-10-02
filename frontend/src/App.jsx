import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RequireAuth } from './components/RequireAuth';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { StudentsPage } from './pages/StudentsPage';
import { StudentDetailPage } from './pages/StudentDetailPage';
import { CheckinsPage } from './pages/CheckinsPage';

export default function App() {
  const { admin, authLoading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  if (authLoading) {
    return (
      <div className="app-container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
          <p className="muted">Checking session…</p>
        </div>
      </div>
    );
  }

  // Auth pages (Login/Signup) - centered layout without sidebar
  if (isAuthPage) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    );
  }

  // Dashboard layout with sidebar
  return (
    <div className="app-container">
      <div className="app-layout">
        <Sidebar admin={admin} onLogout={handleLogout} collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
        <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`}>
          <Header admin={admin} onLogout={handleLogout} onToggleSidebar={toggleSidebar} sidebarCollapsed={sidebarCollapsed} />
          <main className="content-wrapper">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/students"
                element={
                  <RequireAuth admin={admin}>
                    <StudentsPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/students/:id"
                element={
                  <RequireAuth admin={admin}>
                    <StudentDetailPage />
                  </RequireAuth>
                }
              />
              <Route
                path="/checkins"
                element={
                  <RequireAuth admin={admin}>
                    <CheckinsPage />
                  </RequireAuth>
                }
              />
              <Route path="/" element={<Navigate to={admin ? '/students' : '/login'} replace />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
