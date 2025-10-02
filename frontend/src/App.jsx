import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from './api';

function AdminLogin({ onLoggedIn }) {
  const [form, setForm] = useState({ adminId: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const body = form.adminId ? { adminId: form.adminId, password: form.password } : { email: form.email, password: form.password };
      const me = await apiPost('/admin/login', body);
      onLoggedIn(me);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
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
    </section>
  );
}

function AdminSignup({ onSignedUp }) {
  const [form, setForm] = useState({ adminId: '', email: '', password: '', instituteName: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const me = await apiPost('/admin/signup', form);
      onSignedUp(me);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  return (
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
    </section>
  );
}

function StudentsSection() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ name: '', email: '', studentId: '' });
  const [submitting, setSubmitting] = useState(false);
  const [q, setQ] = useState('');

  const load = async (query) => {
    setLoading(true);
    setError('');
    try {
      const qp = query && query.trim() ? `?q=${encodeURIComponent(query.trim())}` : '';
      const data = await apiGet(`/students${qp}`);
      setStudents(data);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(q);
  }, [q]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await apiPost('/students', form);
      setForm({ name: '', email: '', studentId: '' });
      await load();
    } catch (e) {
      setError(parseError(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="card">
      <h2>Student Management</h2>
      <div className="grid-2" style={{ marginBottom: '0.75rem' }}>
        <div>
          <label>Search</label>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Filter by name or Student ID"
          />
        </div>
      </div>
      <form className="form" onSubmit={onSubmit}>
        <div className="grid-3">
          <div>
            <label>Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Jane Doe"
              required
              minLength={2}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="jane@example.com"
              required
            />
          </div>
          <div>
            <label>Student ID</label>
            <input
              value={form.studentId}
              onChange={(e) => setForm({ ...form, studentId: e.target.value })}
              placeholder="S123"
              required
              minLength={3}
            />
          </div>
        </div>
        <button className="btn" disabled={submitting}>
          {submitting ? 'Adding…' : 'Add Student'}
        </button>
      </form>

      {loading && <p className="muted">Loading students…</p>}
      {error && <p className="error">{error}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Student ID</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s._id}>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.studentId}</td>
                <td>{formatDate(s.createdAt)}</td>
              </tr>
            ))}
            {!loading && students.length === 0 && (
              <tr>
                <td colSpan={4} className="muted">No students yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function CheckinsSection() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [todayCount, setTodayCount] = useState(null);

  const [studentId, setStudentId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiGet('/checkins');
      setCheckins(data);
      const today = await apiGet('/checkins/todayCount');
      setTodayCount(today?.count ?? 0);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onCheckin = async (e) => {
    e.preventDefault();
    if (!studentId.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      await apiPost('/checkin', { studentId: studentId.trim() });
      setStudentId('');
      await load();
    } catch (e) {
      setError(parseError(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="card">
      <h2>Check-in Management</h2>
      <p className="muted" style={{ marginTop: '-0.5rem' }}>
        Total check-ins today: <strong>{todayCount ?? '—'}</strong>
      </p>
      <form className="form" onSubmit={onCheckin}>
        <div className="grid-2">
          <div>
            <label>Student ID</label>
            <input
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="S123"
              required
            />
          </div>
          <div className="align-end">
            <button className="btn" disabled={submitting}>
              {submitting ? 'Checking In…' : 'Check In'}
            </button>
          </div>
        </div>
      </form>

      {loading && <p className="muted">Loading check-ins…</p>}
      {error && <p className="error">{error}</p>}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Student ID</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {checkins.map((c) => (
              <tr key={c._id}>
                <td>{c.student?.name}</td>
                <td>{c.student?.email}</td>
                <td>{c.student?.studentId}</td>
                <td>{formatDate(c.timestamp)}</td>
              </tr>
            ))}
            {!loading && checkins.length === 0 && (
              <tr>
                <td colSpan={4} className="muted">No check-ins yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function parseError(e) {
  try {
    const obj = JSON.parse(e.message);
    if (obj?.message) return obj.message;
    if (obj?.errors?.length) return obj.errors.map(x => x.msg || x.path).join(', ');
  } catch (_) {}
  return e.message || 'Request failed';
}

function formatDate(d) {
  if (!d) return '';
  const date = new Date(d);
  return date.toLocaleString();
}

export default function App() {
  const [admin, setAdmin] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const me = await apiGet('/admin/me');
        if (mounted) setAdmin(me);
      } catch (_) {
        if (mounted) setAdmin(null);
      } finally {
        if (mounted) setAuthLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const logout = async () => {
    try {
      await apiPost('/admin/logout', {});
    } catch (_) {}
    setAdmin(null);
  };

  return (
    <div className="container">
      <header>
        <h1>Student Check-In Dashboard</h1>
        {admin && (
          <div style={{ marginTop: '0.5rem' }}>
            <span className="muted">Institute: {admin.instituteName}</span>
            <button className="btn" style={{ marginLeft: 12 }} onClick={logout}>Logout</button>
          </div>
        )}
      </header>
      {authLoading ? (
        <main>
          <p className="muted">Checking session…</p>
        </main>
      ) : !admin ? (
        <main>
          {showSignup ? (
            <>
              <AdminSignup onSignedUp={setAdmin} />
              <p className="muted" style={{ textAlign: 'center' }}>
                Already have an account?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setShowSignup(false); }}>Login</a>
              </p>
            </>
          ) : (
            <>
              <AdminLogin onLoggedIn={setAdmin} />
              <p className="muted" style={{ textAlign: 'center' }}>
                New here?{' '}
                <a href="#" onClick={(e) => { e.preventDefault(); setShowSignup(true); }}>Create an account</a>
              </p>
            </>
          )}
          {authError && <p className="error">{authError}</p>}
        </main>
      ) : (
        <main className="grid">
          <StudentsSection />
          <CheckinsSection />
        </main>
      )}
      <footer>
        <span className="muted">Powered by Express + MongoDB</span>
      </footer>
    </div>
  );
}
