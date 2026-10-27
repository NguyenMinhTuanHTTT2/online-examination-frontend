import React from 'react';
import { mockTestStyles as styles } from '../../../assets/styles/teacher/mockTestStyles';

export default function MockTestSidebar({ stats }) {
  const { totalCount, publicCount, draftCount, hiddenCount, mockTypeCount, practiceTypeCount } = stats;

  return (
    <div style={styles.rightSidebar}>
      <div style={styles.sideCard}>
        <h4 style={styles.sideCardTitle}>📊 Thống kê nhanh</h4>
        <div style={styles.statsCircleBox}>
          <div style={styles.donutPlaceholder}>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>{totalCount}</span>
            <span style={{ fontSize: '10px', color: '#64748b' }}>Tổng đề thi</span>
          </div>
          <div style={styles.legendList}>
            <div style={styles.legendItem}>
              <span style={{ color: '#16a34a' }}>●</span> Công khai <b>{publicCount}</b>
            </div>
            <div style={styles.legendItem}>
              <span style={{ color: '#d97706' }}>●</span> Nháp <b>{draftCount}</b>
            </div>
            <div style={styles.legendItem}>
              <span style={{ color: '#64748b' }}>●</span> Ẩn <b>{hiddenCount}</b>
            </div>
          </div>
        </div>
      </div>

      <div style={styles.sideCard}>
        <h4 style={styles.sideCardTitle}>📚 Loại đề thi</h4>
        <div style={styles.progressBarRow}>
          <div style={styles.progressLabel}>
            <span>Đề thi thử</span>
            <b>{mockTypeCount}</b>
          </div>
          <div style={styles.progressBg}>
            <div
              style={{
                ...styles.progressFill,
                width: totalCount ? `${(mockTypeCount / totalCount) * 100}%` : '0%',
                backgroundColor: '#2563eb'
              }}
            ></div>
          </div>
        </div>
        <div style={styles.progressBarRow}>
          <div style={styles.progressLabel}>
            <span>Luyện tập</span>
            <b>{practiceTypeCount}</b>
          </div>
          <div style={styles.progressBg}>
            <div
              style={{
                ...styles.progressFill,
                width: totalCount ? `${(practiceTypeCount / totalCount) * 100}%` : '0%',
                backgroundColor: '#16a34a'
              }}
            ></div>
          </div>
        </div>
      </div>

      <div style={styles.tipCard}>
        <div style={{ fontSize: '14px', marginBottom: '6px', fontWeight: 'bold', color: '#1e40af' }}>
          💡 Mẹo sử dụng
        </div>
        <p style={{ margin: 0, fontSize: '12px', color: '#475569', lineHeight: '1.5' }}>
          Đề thi <b>Công khai</b> cho phép học sinh tham gia làm bài. Chuyển sang <b>Ẩn</b> để tạm ngưng tiếp nhận bài thi mà vẫn giữ câu hỏi. Đề <b>Nháp</b> dành riêng cho đề chưa hoàn thiện.
        </p>
      </div>
    </div>
  );
}