import React from 'react';

export function DateRangeFilter({ from, to, onFromChange, onToChange, onApply }) {
  return (
    <div className="grid-3" style={{ marginBottom: '0.75rem' }}>
      <div>
        <label>From (UTC)</label>
        <div className="date-input-wrapper">
          <input type="date" value={from} onChange={(e) => onFromChange(e.target.value)} />
          <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
      </div>
      <div>
        <label>To (UTC)</label>
        <div className="date-input-wrapper">
          <input type="date" value={to} onChange={(e) => onToChange(e.target.value)} />
          <svg className="calendar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
      </div>
      <div className="align-end">
        <button className="btn" onClick={onApply}>Apply</button>
      </div>
    </div>
  );
}
