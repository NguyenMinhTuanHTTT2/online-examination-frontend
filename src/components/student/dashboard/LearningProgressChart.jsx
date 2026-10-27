import React from 'react';

export default function LearningProgressChart({
  progressData = [],
  progressTimeRange = '7 ngày',
  setProgressTimeRange,
}) {
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
    marginBottom: '16px',
  };

  const titleStyle = {
    margin: 0,
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#0f172a',
  };

  const selectStyle = {
    padding: '4px 8px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '11px',
    color: '#334155',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  };

  const defaultPoints = [
    { date: 'T2', val: 65, x: 30, y: 80 },
    { date: 'T3', val: 72, x: 80, y: 65 },
    { date: 'T4', val: 68, x: 130, y: 72 },
    { date: 'T5', val: 85, x: 180, y: 40 },
    { date: 'T6', val: 78, x: 230, y: 55 },
    { date: 'T7', val: 90, x: 280, y: 30 },
    { date: 'CN', val: 88, x: 330, y: 35 },
  ];

  const points = progressData.length > 0 ? progressData : defaultPoints;

  const pathD = points.reduce((acc, pt, i) => {
    return i === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h4 style={titleStyle}>📈 Tiến độ học tập</h4>
        <select
          value={progressTimeRange}
          onChange={(e) => setProgressTimeRange && setProgressTimeRange(e.target.value)}
          style={selectStyle}
        >
          <option value="7 ngày">7 ngày qua</option>
          <option value="30 ngày">30 ngày qua</option>
          <option value="3 tháng">3 tháng qua</option>
        </select>
      </div>

      <div style={{ position: 'relative', width: '100%', height: '140px' }}>
        <svg width="100%" height="100%" viewBox="0 0 360 120" preserveAspectRatio="none">
          <line x1="20" y1="20" x2="350" y2="20" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="20" y1="60" x2="350" y2="60" stroke="#f1f5f9" strokeDasharray="3 3" />
          <line x1="20" y1="100" x2="350" y2="100" stroke="#f1f5f9" strokeDasharray="3 3" />

          <path d={pathD} fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

          {points.map((pt, idx) => (
            <g key={idx}>
              <circle cx={pt.x} cy={pt.y} r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
              <text x={pt.x} y="115" textAnchor="middle" fontSize="9" fill="#94a3b8">
                {pt.date}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}