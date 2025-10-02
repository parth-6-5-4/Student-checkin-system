import React, { useState } from 'react';

export function StudentForm({ onSubmit, submitting }) {
  const [form, setForm] = useState({ name: '', email: '', studentId: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onSubmit(form);
    if (success) {
      setForm({ name: '', email: '', studentId: '' });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
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
      <button className="btn btn-submit" disabled={submitting}>
        {submitting ? 'Adding…' : 'Add Student'}
      </button>
    </form>
  );
}
