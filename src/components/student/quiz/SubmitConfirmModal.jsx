import React from 'react';
import { quizTakeStyles as styles } from '../../../assets/styles/student/quizTakeStyles';

export default function SubmitConfirmModal({ onClose, onConfirm, answeredCount, totalCount }) {
  const unansweredCount = totalCount - answeredCount;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <div style={styles.modalHeader}>
          <h3 style={styles.modalTitle}>
            <span>❓</span> Xác nhận hoàn thành bài
          </h3>
          <span onClick={onClose} style={{ cursor: 'pointer', color: '#94a3b8', fontSize: '16px' }}>✕</span>
        </div>
        <p style={styles.modalDesc}>
          {unansweredCount > 0 
            ? `Bạn còn ${unansweredCount} câu hỏi chưa trả lời. Bạn có chắc muốn hoàn thành bài luyện đề?`
            : 'Bạn có chắc muốn hoàn thành bài luyện đề?'} 
          <br />
          Sau khi hoàn thành, bạn có thể xem kết quả và đáp án.
        </p>
        <div style={styles.modalActions}>
          <button onClick={onClose} style={{ ...styles.secondaryBtn, flex: 1 }}>
            Tiếp tục làm
          </button>
          <button onClick={onConfirm} style={{ ...styles.primaryBtn, flex: 1 }}>
            Hoàn thành
          </button>
        </div>
      </div>
    </div>
  );
}