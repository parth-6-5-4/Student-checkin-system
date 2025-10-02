import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../util';
import { downloadCSV } from '../utils/downloadCSV';

export function StudentsTable({ students, loading }) {
  const handleDownload = () => {
    const data = students.map(s => ({
      Name: s.name,
      Email: s.email,
      'Student ID': s.studentId,
      Created: formatDate(s.createdAt)
    }));
    downloadCSV(data, `students-${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <>
      {students.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '12px' }}>
          <button className="btn btn-download" onClick={handleDownload}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download CSV
          </button>
        </div>
      )}
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
    </>
  );
}
