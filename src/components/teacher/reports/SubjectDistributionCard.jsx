import React from 'react';
import { reportStyles as styles } from '../../../assets/styles/teacher/reportStyles';

export default function SubjectDistributionCard({ subjectDistribution, totalStudents }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeaderRow}>
        <div>
          <div style={styles.cardTitle}>📊 Phân bổ theo môn học</div>
        </div>
      </div>

      <div style={styles.donutContainer}>
        {/* SVG Donut */}
        <div style={{ position: 'relative', width: '160px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {subjectDistribution.length === 0 ? (
            <div style={{ color: '#94a3b8', fontSize: '11px', fontStyle: 'italic' }}>Chưa có dữ liệu</div>
          ) : (
            <>
              <svg width="160" height="160" viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="15.915" fill="#fff" />
                {subjectDistribution.map((item, idx) => (
                  <circle
                    key={idx}
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke={item.color || '#2563eb'}
                    strokeWidth="6"
                    strokeDasharray={`${item.percentValue || 0} ${100 - (item.percentValue || 0)}`}
                    strokeDashoffset={item.offset || 0}
                  />
                ))}
              </svg>
              <div style={styles.donutCenterText}>
                <div style={{ fontSize: '9px', color: '#64748b' }}>Tổng lượt làm bài</div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#0f172a' }}>
                  {totalStudents?.toLocaleString() || '0'}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Legend List */}
        <div style={styles.legendList}>
          {subjectDistribution.length === 0 ? (
            <div style={{ color: '#94a3b8', fontSize: '12px', fontStyle: 'italic' }}>Chưa có dữ liệu phân bổ môn học.</div>
          ) : (
            subjectDistribution.map((item, idx) => (
              <div key={idx} style={styles.legendItem}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: item.color || '#2563eb' }}></span>
                  <span style={{ fontSize: '12px', color: '#334155' }}>{item.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px' }}>
                  <span style={{ color: '#64748b' }}>{item.percent}</span>
                  <span style={{ fontWeight: 'bold', color: '#0f172a', width: '40px', textAlign: 'right' }}>{item.count}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}