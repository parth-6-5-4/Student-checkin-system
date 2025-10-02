import React, { useEffect, useState } from 'react';
import { apiGet, apiPost } from './api';

function StudentsSection() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({ name: '', email: '', studentId: '' });
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiGet('/students');
      setStudents(data);
    } catch (e) {
      setError(parseError(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

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

  const [studentId, setStudentId] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiGet('/checkins');
      setCheckins(data);
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
  return (
    <div className="container">
      <header>
        <h1>Student Check-In Dashboard</h1>
      </header>
      <main className="grid">
        <StudentsSection />
        <CheckinsSection />
      </main>
      <footer>
        <span className="muted">Powered by Express + MongoDB</span>
      </footer>
    </div>
  );
}
