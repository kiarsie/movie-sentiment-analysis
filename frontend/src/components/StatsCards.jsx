import React from "react";

export default function StatsCards({ counts }) {
  const total = counts.positive + counts.neutral + counts.negative;
  const getPercentage = (value) => total > 0 ? ((value / total) * 100).toFixed(1) : 0;
  
  return (
    <div className="card-row">
      <div className="card">
        <div style={{ fontSize: '0.75rem', color: '#065f46', fontWeight: 600, marginBottom: 8 }}>Positive</div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981', marginBottom: 4 }}>{counts.positive}</div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>{getPercentage(counts.positive)}%</div>
      </div>
      <div className="card">
        <div style={{ fontSize: '0.75rem', color: 'var(--neutral)', fontWeight: 600, marginBottom: 8 }}>Neutral</div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--neutral)', marginBottom: 4 }}>{counts.neutral}</div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>{getPercentage(counts.neutral)}%</div>
      </div>
      <div className="card">
        <div style={{ fontSize: '0.75rem', color: '#991b1b', fontWeight: 600, marginBottom: 8 }}>Negative</div>
        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ef4444', marginBottom: 4 }}>{counts.negative}</div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>{getPercentage(counts.negative)}%</div>
      </div>
    </div>
  );
}
