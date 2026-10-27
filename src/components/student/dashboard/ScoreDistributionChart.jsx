import React from 'react';

export default function ScoreDistributionChart({ scoreDistribution = [], totalExamsDone = 0 }) {
  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    padding: '16px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '14px',
  };

  const titleStyle = {
    margin: 0,
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#0f172a',
  };

  const defaultDist = [
    { label: 'Xuất sắc (9 - 10)', percentage: 40, color: '#22c55e' },
    { label: 'Giỏi (8 - 8.9)', percentage: 35, color: '#3b82f6' },
    { label: 'Khá (6.5 - 7.9)', percentage: 15, color: '#eab308' },
    { label: 'Trung bình (< 6.5)', percentage: 10, color: '#ef4444' },
  ];

  const items = scoreDistribution.length > 0 ? scoreDistribution : defaultDist;

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h4 style={titleStyle}>📊 Phân bố điểm số</h4>
        <span style={{ fontSize: '11px', color: '#64748b' }}>Tổng: {totalExamsDone} bài</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {items.map((item, index) => (
          <div key={index}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '4px' }}>
              <span style={{ color: '#334155', fontWeight: '500' }}>{item.label}</span>
              <span style={{ color: '#64748b', fontWeight: 'bold' }}>{item.percentage}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${item.percentage}%`,
                  height: '100%',
                  backgroundColor: item.color || '#2563eb',
                  borderRadius: '4px',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}