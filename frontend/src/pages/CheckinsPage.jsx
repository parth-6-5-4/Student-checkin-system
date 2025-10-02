import React, { useState } from 'react';
import { useCheckins } from '../hooks/useCheckins';
import { DateRangeFilter } from '../components/DateRangeFilter';
import { CheckinForm } from '../components/CheckinForm';
import { CheckinsTable } from '../components/CheckinsTable';

export function CheckinsPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { checkins, loading, error, todayCount, load, checkIn } = useCheckins();

  const handleApplyFilter = () => {
    load(from, to);
  };

  const handleCheckIn = async (studentId) => {
    setSubmitting(true);
    const success = await checkIn(studentId);
    setSubmitting(false);
    return success;
  };

  return (
    <>
      <section className="card card-summary">
        <div className="summary-header">
          <div>
            <h2 style={{ margin: 0 }}>Today's Summary</h2>
            <p className="muted" style={{ margin: '8px 0 0 0' }}>
              Total check-ins today: <strong style={{ color: 'var(--primary)', fontSize: '18px' }}>{todayCount ?? '—'}</strong>
            </p>
          </div>
        </div>
        <div className="form-section">
          <CheckinForm onSubmit={handleCheckIn} submitting={submitting} />
          {error && <p className="error">{error}</p>}
        </div>
      </section>

      <section className="card">
        <h2>Check-in History</h2>
        <div className="filter-section">
          <DateRangeFilter
            from={from}
            to={to}
            onFromChange={setFrom}
            onToChange={setTo}
            onApply={handleApplyFilter}
          />
        </div>

        {loading && <p className="muted">Loading check-ins…</p>}

        <CheckinsTable checkins={checkins} loading={loading} />
      </section>
    </>
  );
}
