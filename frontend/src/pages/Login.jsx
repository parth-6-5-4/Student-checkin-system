import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { apiPost } from '../api';
import { parseError } from '../util';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ adminId: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const body = form.adminId ? { adminId: form.adminId, password: form.password } : { email: form.email, password: form.password };
      await apiPost('/admin/login', body);
      const from = location.state?.from?.pathname || '/students';
      // Force a reload so App mounts and /admin/me picks up the new session cookie
      window.location.replace(from);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <section className="card" style={{ maxWidth: 480, margin: '2rem auto' }}>
        <h2>Admin Login</h2>
        <p className="muted">Login with Admin ID or Gmail + password</p>
        <form className="form" onSubmit={onSubmit}>
          <div className="grid-2">
            <div>
              <label>Admin ID</label>
              <input
                value={form.adminId}
                onChange={(e) => setForm({ ...form, adminId: e.target.value })}
                placeholder="admin123"
              />
            </div>
            <div>
              <label>Gmail</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="name@gmail.com"
              />
            </div>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="••••••"
              required
              minLength={6}
            />
          </div>
          <button className="btn" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
        </form>
        {error && <p className="error">{error}</p>}
        <p className="muted" style={{ textAlign: 'center' }}>
          New here? <Link to="/signup">Create an account</Link>
        </p>
      </section>
    </div>
  );
}
