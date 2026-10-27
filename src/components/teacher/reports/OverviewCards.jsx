import React from 'react';
import { reportStyles as styles } from '../../../assets/styles/teacher/reportStyles';

export default function OverviewCards({ statsSummary }) {
  return (
    <div style={styles.statsGrid}>
      {/* Card 1: Tổng lượt học sinh tham gia */}
      <div style={styles.statCard}>
        <div style={styles.statTopRow}>
          <div style={{ ...styles.statIconBox, backgroundColor: '#eff6ff', color: '#2563eb' }}>👥</div>
          <div>
            <div style={styles.statTitle}>Tổng lượt học sinh tham gia</div>
            <div style={styles.statValue}>{statsSummary?.totalStudents?.toLocaleString() || '---'}</div>
            <div style={{ ...styles.statTrend, color: '#16a34a' }}>
              {statsSummary?.studentTrend || '+0%'} <span style={{ color: '#64748b', fontWeight: 'normal' }}>so với tuần trước</span>
            </div>
          </div>
        </div>
        <div style={styles.sparklineBox}>
          <svg width="100" height="30" viewBox="0 0 100 30">
            <path d="M0,25 Q20,15 40,20 T80,8 T100,12 L100,30 L0,30 Z" fill="#eff6ff" />
            <path d="M0,25 Q20,15 40,20 T80,8 T100,12" fill="none" stroke="#2563eb" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Card 2: Điểm trung bình chung */}
      <div style={styles.statCard}>
        <div style={styles.statTopRow}>
          <div style={{ ...styles.statIconBox, backgroundColor: '#f3e8ff', color: '#9333ea' }}>⭐</div>
          <div>
            <div style={styles.statTitle}>Điểm trung bình chung</div>
            <div style={styles.statValue}>{statsSummary?.avgScore || '---'} <span style={{ fontSize: '14px', color: '#64748b' }}>/ 10</span></div>
            <div style={{ ...styles.statTrend, color: '#16a34a' }}>
              {statsSummary?.scoreTrend || '+0'} <span style={{ color: '#64748b', fontWeight: 'normal' }}>so với tuần trước</span>
            </div>
          </div>
        </div>
        <div style={styles.sparklineBox}>
          <svg width="100" height="30" viewBox="0 0 100 30">
            <path d="M0,20 Q25,25 50,15 T100,6 L100,30 L0,30 Z" fill="#faf5ff" />
            <path d="M0,20 Q25,25 50,15 T100,6" fill="none" stroke="#9333ea" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Card 3: Tổng số câu hỏi đã tương tác */}
      <div style={styles.statCard}>
        <div style={styles.statTopRow}>
          <div style={{ ...styles.statIconBox, backgroundColor: '#f0fdf4', color: '#16a34a' }}>📄</div>
          <div>
            <div style={styles.statTitle}>Tổng số câu hỏi đã tương tác</div>
            <div style={styles.statValue}>{statsSummary?.totalQuestions?.toLocaleString() || '---'}</div>
            <div style={{ ...styles.statTrend, color: '#16a34a' }}>
              {statsSummary?.questionTrend || '+0%'} <span style={{ color: '#64748b', fontWeight: 'normal' }}>so với tuần trước</span>
            </div>
          </div>
        </div>
        <div style={styles.sparklineBox}>
          <svg width="100" height="30" viewBox="0 0 100 30">
            <path d="M0,22 Q30,12 60,18 T100,5 L100,30 L0,30 Z" fill="#f0fdf4" />
            <path d="M0,22 Q30,12 60,18 T100,5" fill="none" stroke="#16a34a" strokeWidth="2" />
          </svg>
        </div>
      </div>

      {/* Card 4: Tỷ lệ hoàn thành đề thi */}
      <div style={styles.statCard}>
        <div style={styles.statTopRow}>
          <div style={{ ...styles.statIconBox, backgroundColor: '#fff7ed', color: '#ea580c' }}>⏱️</div>
          <div>
            <div style={styles.statTitle}>Tỷ lệ hoàn thành đề thi</div>
            <div style={styles.statValue}>{statsSummary?.completionRate ? `${statsSummary.completionRate}%` : '---'}</div>
            <div style={{ ...styles.statTrend, color: '#16a34a' }}>
              {statsSummary?.completionTrend || '+0%'} <span style={{ color: '#64748b', fontWeight: 'normal' }}>so với tuần trước</span>
            </div>
          </div>
        </div>
        <div style={styles.sparklineBox}>
          <svg width="100" height="30" viewBox="0 0 100 30">
            <path d="M0,18 Q20,24 50,16 T100,8 L100,30 L0,30 Z" fill="#fff7ed" />
            <path d="M0,18 Q20,24 50,16 T100,8" fill="none" stroke="#ea580c" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}