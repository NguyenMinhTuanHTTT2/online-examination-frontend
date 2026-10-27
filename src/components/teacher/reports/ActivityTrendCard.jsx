import React from 'react';
import { reportStyles as styles } from '../../../assets/styles/teacher/reportStyles';

export default function ActivityTrendCard({ activityData, timeRange, setTimeRange, loading }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeaderRow}>
        <div>
          <div style={styles.cardTitle}>📈 Xu hướng hoạt động</div>
          <div style={styles.cardSub}>Số lượng học sinh làm bài thi thử theo thời gian</div>
        </div>
        <div style={styles.pillGroup}>
          <button
            onClick={() => setTimeRange('7_DAYS')}
            style={timeRange === '7_DAYS' ? styles.pillActive : styles.pillInactive}
          >
            7 ngày
          </button>
          <button
            onClick={() => setTimeRange('30_DAYS')}
            style={timeRange === '30_DAYS' ? styles.pillActive : styles.pillInactive}
          >
            30 ngày
          </button>
          <button
            onClick={() => setTimeRange('90_DAYS')}
            style={timeRange === '90_DAYS' ? styles.pillActive : styles.pillInactive}
          >
            90 ngày
          </button>
        </div>
      </div>

      {/* Line Chart Area */}
      <div style={{ marginTop: '16px', position: 'relative', minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {activityData.length === 0 ? (
          <div style={{ color: '#94a3b8', fontSize: '13px', fontStyle: 'italic' }}>
            {loading ? 'Đang tải dữ liệu...' : 'Chưa có dữ liệu biểu đồ'}
          </div>
        ) : (
          <svg width="100%" height="220" viewBox="0 0 580 220" preserveAspectRatio="none">
            <line x1="40" y1="30" x2="560" y2="30" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="40" y1="70" x2="560" y2="70" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="40" y1="110" x2="560" y2="110" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="40" y1="150" x2="560" y2="150" stroke="#f1f5f9" strokeDasharray="3 3" />
            <line x1="40" y1="190" x2="560" y2="190" stroke="#e2e8f0" />

            <text x="30" y="34" fontSize="10" fill="#94a3b8" textAnchor="end">2,500</text>
            <text x="30" y="74" fontSize="10" fill="#94a3b8" textAnchor="end">2,000</text>
            <text x="30" y="114" fontSize="10" fill="#94a3b8" textAnchor="end">1,500</text>
            <text x="30" y="154" fontSize="10" fill="#94a3b8" textAnchor="end">1,000</text>
            <text x="30" y="194" fontSize="10" fill="#94a3b8" textAnchor="end">0</text>

            <defs>
              <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Render dynamic line chart from activityData */}
            {activityData.map((pt, idx) => (
              <g key={idx}>
                <circle cx={pt.x} cy={pt.y} r="4" fill="#ffffff" stroke="#2563eb" strokeWidth="2" />
                <text x={pt.x} y={pt.y - 10} fontSize="10" fontWeight="bold" fill="#0f172a" textAnchor="middle">
                  {pt.value?.toLocaleString()}
                </text>
                <text x={pt.x} y="208" fontSize="11" fill="#64748b" textAnchor="middle">
                  {pt.date}
                </text>
              </g>
            ))}
          </svg>
        )}
      </div>
    </div>
  );
}