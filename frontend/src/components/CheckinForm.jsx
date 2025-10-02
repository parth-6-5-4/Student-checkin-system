import React, { useState } from 'react';

export function CheckinForm({ onSubmit, submitting }) {
  const [studentId, setStudentId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!studentId.trim()) return;
    const success = await onSubmit(studentId);
    if (success) {
      setStudentId('');
    }
  };

  return (
    <form className="form form-checkin" onSubmit={handleSubmit}>
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
          <button className="btn btn-submit-checkin" disabled={submitting}>
            {submitting ? 'Checking In…' : 'Check In'}
          </button>
        </div>
      </div>
    </form>
  );
}
