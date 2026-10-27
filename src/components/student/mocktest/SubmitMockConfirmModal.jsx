import React from 'react';
import { quizTakeStyles as styles } from '../../../assets/styles/student/quizTakeStyles';

export default function SubmitMockConfirmModal({ onClose, onConfirm, answeredCount, totalCount }) {
  const unansweredCount = totalCount - answeredCount;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>
            <span>⚠️</span> Xác nhận nộp bài thi
          </h3>
          <span onClick={onClose} style={{ cursor: 'pointer', color: '#94a3b8', fontSize: '16px' }}>✕</span>
        </div>
        <div style={styles.modalDesc}>
          <p style={{ margin: '0 0 10px 0', fontWeight: '600', color: '#0f172a' }}>
            Bạn có chắc chắn muốn nộp bài thi không?
          </p>
          <ul style={{ margin: '0 0 15px 0', paddingLeft: '20px', color: '#475569', fontSize: '13px' }}>
            <li>Đã trả lời: <strong style={{ color: '#16a34a' }}>{answeredCount}</strong> câu</li>
            <li>Chưa trả lời: <strong style={{ color: '#dc2626' }}>{unansweredCount}</strong> câu</li>
          </ul>
          <p style={{ margin: 0, fontStyle: 'italic', fontSize: '12px', color: '#dc2626' }}>
            Sau khi nộp bài, bạn sẽ không thể tiếp tục làm bài thi này.
          </p>
        </div>
        <div style={styles.modalActions}>
          <button onClick={onClose} style={{ ...styles.secondaryBtn, flex: 1 }}>
            Tiếp tục làm bài
          </button>
          <button onClick={onConfirm} style={{ ...styles.primaryBtn, flex: 1, backgroundColor: '#2563eb' }}>
            Xác nhận nộp bài
          </button>
        </div>
      </div>
    </div>
  );
}