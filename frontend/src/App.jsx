import React, { useEffect, useState } from 'react';
import { Link, Routes, Route, Navigate, useNavigate, useParams, useLocation } from 'react-router-dom';
import { apiGet, apiPost } from './api';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import { formatDate, parseError } from './util';

// We now use dedicated pages for Login and Signup (see src/pages)

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
      await load(q);
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
                <td>
                  <Link to={`/students/${encodeURIComponent(s.studentId)}`}>{s.name}</Link>
                </td>
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

function StudentDetail() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const s = await apiGet(`/students/${encodeURIComponent(id)}`);
      setStudent(s);
      const qs = [];
      if (from) qs.push(`from=${from}`);
      if (to) qs.push(`to=${to}`);
      const query = qs.length ? `?${qs.join('&')}` : '';
      const c = await apiGet(`/students/${encodeURIComponent(id)}/checkins${query}`);
      setCheckins(c);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <section className="card">
      <h2>Student Details</h2>
      {error && <p className="error">{error}</p>}
      {!student ? (
        <p className="muted">Loading…</p>
      ) : (
        <>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Student ID:</strong> {student.studentId}</p>
          <div className="grid-3" style={{ marginTop: '0.5rem' }}>
            <div>
              <label>From (UTC)</label>
              <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            </div>
            <div>
              <label>To (UTC)</label>
              <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <div className="align-end">
              <button className="btn" onClick={load}>Apply</button>
            </div>
          </div>
          <div className="table-wrap" style={{ marginTop: '0.75rem' }}>
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {checkins.map((c) => (
                  <tr key={c._id}>
                    <td>{formatDate(c.timestamp)}</td>
                  </tr>
                ))}
                {!loading && checkins.length === 0 && (
                  <tr>
                    <td className="muted">No check-ins</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
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
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const qs = [];
      if (from) qs.push(`from=${from}`);
      if (to) qs.push(`to=${to}`);
      const query = qs.length ? `?${qs.join('&')}` : '';
      const data = await apiGet(`/checkins${query}`);
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
      <div className="grid-3" style={{ marginBottom: '0.75rem' }}>
        <div>
          <label>From (UTC)</label>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
        </div>
        <div>
          <label>To (UTC)</label>
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div className="align-end">
          <button className="btn" onClick={load}>Apply</button>
        </div>
      </div>
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
function RequireAuth({ admin, children }) {
  const location = useLocation();

  if (!admin) {
    // redirect to login but remember where user wanted to go
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function App() {
  const [admin, setAdmin] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const location = useLocation();

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

  const navigate = useNavigate();
  const logout = async () => {
    try {
      await apiPost('/admin/logout', {});
    } catch (_) {}
    setAdmin(null);
    navigate('/login');
  };

  return (
    <div className="container">
      <header>
        <h1>Student Check-In Dashboard</h1>
        {admin && (
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: 12, alignItems: 'center' }}>
            <span className="muted">Institute: {admin.instituteName}</span>
            <nav style={{ display: 'flex', gap: 8 }}>
              <Link to="/students">Students</Link>
              <Link to="/checkins">Check-ins</Link>
            </nav>
            <button className="btn" onClick={logout}>Logout</button>
          </div>
        )}
      </header>
      {authLoading ? (
        <main>
          <p className="muted">Checking session…</p>
        </main>
      ) : (
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/students"
              element={
                <RequireAuth admin={admin}>
                  <div className="grid"><StudentsSection /></div>
                </RequireAuth>
              }
            />
            <Route
              path="/students/:id"
              element={
                <RequireAuth admin={admin}>
                  <StudentDetail />
                </RequireAuth>
              }
            />
            <Route
              path="/checkins"
              element={
                <RequireAuth admin={admin}>
                  <div className="grid"><CheckinsSection /></div>
                </RequireAuth>
              }
            />
            <Route path="/" element={<Navigate to={admin ? '/students' : '/login'} replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      )}
      <footer>
        <span className="muted">Powered by Express + MongoDB</span>
      </footer>
    </div>
  );
}
