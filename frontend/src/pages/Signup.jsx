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
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••"
                required
                minLength={6}
              />
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
