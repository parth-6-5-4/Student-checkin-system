import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStudentDetail } from '../hooks/useStudentDetail';
import { DateRangeFilter } from '../components/DateRangeFilter';
import { formatDate } from '../util';
import { downloadCSV } from '../utils/downloadCSV';

export function StudentDetailPage() {
  const { id } = useParams();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const { student, checkins, loading, error, load } = useStudentDetail(id);

  const handleApplyFilter = () => {
    load(from, to);
  };

  const handleDownload = () => {
    const data = checkins.map(c => ({
      'Student Name': student.name,
      'Student ID': student.studentId,
      Timestamp: formatDate(c.timestamp)
    }));
    downloadCSV(data, `${student.studentId}-checkins-${new Date().toISOString().split('T')[0]}`);
  };

  return (
    <section className="card">
      <h2>Student Details</h2>
      {error && <p className="error">{error}</p>}
      {!student ? (
        <p className="muted">Loading…</p>
      ) : (
        <>
          <div className="student-info">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Student ID:</strong> {student.studentId}</p>
          </div>
          <div className="filter-section">
            <DateRangeFilter
              from={from}
              to={to}
              onFromChange={setFrom}
              onToChange={setTo}
              onApply={handleApplyFilter}
            />
          </div>
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
