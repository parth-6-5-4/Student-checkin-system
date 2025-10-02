import React from 'react';
import { formatDate } from '../util';
import { downloadCSV } from '../utils/downloadCSV';

export function CheckinsTable({ checkins, loading }) {
  const handleDownload = () => {
    const data = checkins.map(c => ({
      Student: c.student?.name || 'N/A',
      Email: c.student?.email || 'N/A',
      'Student ID': c.student?.studentId || 'N/A',
      Time: formatDate(c.timestamp)
    }));
    downloadCSV(data, `checkins-${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <>
      {checkins.length > 0 && (
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
    </>
  );
}
