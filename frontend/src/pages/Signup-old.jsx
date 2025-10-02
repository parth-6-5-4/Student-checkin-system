import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { apiPost } from '../api';
import { parseError } from '../util';

export default function Signup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ adminId: '', email: '', password: '', instituteName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiPost('/admin/signup', form);
      const from = location.state?.from?.pathname || '/students';
      window.location.replace(from);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <section className="card" style={{ maxWidth: 560, margin: '2rem auto' }}>
        <h2>Create Admin Account</h2>
        <p className="muted">Use a Gmail address. Password must be at least 6 characters.</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="grid-2">
            <div>
              <label>Admin ID</label>
              <input
                value={form.adminId}
                onChange={(e) => setForm({ ...form, adminId: e.target.value })}
                placeholder="admin123"
                required
                minLength={3}
              />
            </div>
            <div>
              <label>Institute Name</label>
              <input
                value={form.instituteName}
                onChange={(e) => setForm({ ...form, instituteName: e.target.value })}
                placeholder="My College"
                required
                minLength={2}
              />
            </div>
          </div>
          <div className="grid-2">
            <div>
              <label>Gmail</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@gmail.com"
                required
              />
            </div>
            <div>
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••"
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <button className="btn" disabled={loading}>{loading ? 'Creating…' : 'Create Account'}</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="muted" style={{ textAlign: 'center' }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </div>
  );
}
