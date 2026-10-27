import React from 'react';
import { mockTestStyles as styles } from '../../../assets/styles/student/mockTestStyles';

export default function MockTestCard({ test, onStart }) {
  // Quy định màu icon và badge theo môn
  const getSubjectMeta = (subjectName) => {
    switch (subjectName?.toLowerCase()) {
      case 'tin học':
        return { icon: '💻', bg: '#9333ea', color: '#fff' };
      case 'toán học':
      case 'toán':
        return { icon: '🧮', bg: '#2563eb', color: '#fff' };
      case 'tiếng anh':
        return { icon: 'Ag', bg: '#10b981', color: '#fff' };
      case 'hóa học':
        return { icon: '🧪', bg: '#f43f5e', color: '#fff' };
      case 'ngữ văn':
        return { icon: '📖', bg: '#f97316', color: '#fff' };
      case 'sinh học':
        return { icon: '🧬', bg: '#14b8a6', color: '#fff' };
      default:
        return { icon: '📝', bg: '#64748b', color: '#fff' };
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'NOT_STARTED':
        return { label: 'Chưa làm', bg: '#f1f5f9', color: '#475569' };
      case 'IN_PROGRESS':
        return { label: 'Đang làm', bg: '#fff7ed', color: '#ea580c' };
      case 'COMPLETED':
        return { label: 'Đã hoàn thành', bg: '#f0fdf4', color: '#16a34a' };
      default:
        return { label: 'Chưa làm', bg: '#f1f5f9', color: '#475569' };
    }
  };

  const meta = getSubjectMeta(test.subjectName);
  const statusBadge = getStatusBadge(test.status);

  return (
    <div style={styles.mockCard}>
      <div>
        <div style={styles.cardTop}>
          <div style={{ ...styles.subjectIconBox, backgroundColor: meta.bg, color: meta.color }}>
            {meta.icon}
          </div>

          <div style={styles.cardContent}>
            <div style={styles.cardTitleRow}>
              <h3 style={styles.cardTitle}>{test.title}</h3>
              <button style={styles.bookmarkIcon}>🔖</button>
            </div>
            <div style={styles.badgeRow}>
              <span style={styles.badgeSubject}>{test.subjectName || 'Tổng hợp'}</span>
              <span style={{ ...styles.badgeStatus, backgroundColor: statusBadge.bg, color: statusBadge.color }}>
                {statusBadge.label}
              </span>
            </div>
          </div>
        </div>

        <p style={styles.cardDesc}>{test.description}</p>
      </div>

      <div style={styles.cardFooter}>
        <div style={styles.metaInfoRow}>
          <span>📄 {test.totalQuestions || 50} câu</span>
          <span>⏱️ {test.durationMinutes || 60} phút</span>
        </div>

        <div style={{ fontSize: '11px', color: '#64748b' }}>
          {test.status === 'IN_PROGRESS' 
            ? '🔄 Bài thi đang diễn ra' 
            : test.status === 'COMPLETED'
            ? '✔️ Bạn đã sử dụng lượt thi'
            : '⏰ Chưa sử dụng lượt thi'}
        </div>

        <button
          onClick={() => onStart(test.id)}
          style={{
            ...styles.btnAction,
            backgroundColor: test.status === 'COMPLETED' ? '#f1f5f9' : '#2563eb',
            color: test.status === 'COMPLETED' ? '#64748b' : '#ffffff',
            cursor: test.status === 'COMPLETED' ? 'not-allowed' : 'pointer',
          }}
          disabled={test.status === 'COMPLETED'}
        >
          {test.status === 'IN_PROGRESS' ? 'Tiếp tục thi' : test.status === 'COMPLETED' ? 'Đã nộp bài' : 'Bắt đầu thi →'}
        </button>
      </div>
    </div>
  );
}