import React from 'react';
import { studentStyles as styles } from '../../../assets/styles/student/studentStyles';

export default function StatsGrid({ stats }) {
  return (
    <div style={styles.statsGrid}>
      <div style={styles.statCard}>
        <div style={{ ...styles.statIcon, backgroundColor: '#eff6ff', color: '#2563eb' }}>📄</div>
        <div>
          <div style={styles.statLabel}>Tổng bài đã làm</div>
          <div style={styles.statVal}>{stats.totalExamsDone} bài</div>
          <div style={styles.statTrendGreen}>
            ↑ {stats.totalExamsTrend}% <span style={styles.statTrendSub}>so với tuần trước</span>
          </div>
        </div>
      </div>

      <div style={styles.statCard}>
        <div style={{ ...styles.statIcon, backgroundColor: '#f0fdf4', color: '#16a34a' }}>🎯</div>
        <div>
          <div style={styles.statLabel}>Điểm trung bình</div>
          <div style={styles.statVal}>
            {stats.avgScore} <span style={{ fontSize: '13px', color: '#64748b' }}>/ 10</span>
          </div>
          <div style={styles.statTrendGreen}>
            ↑ {stats.avgScoreTrend} <span style={styles.statTrendSub}>so với tuần trước</span>
          </div>
        </div>
      </div>

      <div style={styles.statCard}>
        <div style={{ ...styles.statIcon, backgroundColor: '#f3e8ff', color: '#9333ea' }}>⏱️</div>
        <div>
          <div style={styles.statLabel}>Thời gian luyện tập</div>
          <div style={styles.statVal}>{stats.totalPracticeHours} giờ</div>
          <div style={styles.statTrendGreen}>
            ↑ {stats.practiceHoursTrend}% <span style={styles.statTrendSub}>so với tuần trước</span>
          </div>
        </div>
      </div>

      <div style={styles.statCard}>
        <div style={{ ...styles.statIcon, backgroundColor: '#fff7ed', color: '#ea580c' }}>✓</div>
        <div>
          <div style={styles.statLabel}>Tỷ lệ làm đúng</div>
          <div style={styles.statVal}>{stats.accuracyRate}%</div>
          <div style={styles.statTrendGreen}>
            ↑ {stats.accuracyTrend}% <span style={styles.statTrendSub}>so với tuần trước</span>
          </div>
        </div>
      </div>
    </div>
  );
}