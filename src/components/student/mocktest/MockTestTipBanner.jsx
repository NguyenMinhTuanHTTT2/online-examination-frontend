import React from 'react';
import { mockTestStyles as styles } from '../../../assets/styles/student/mockTestStyles';

export default function MockTestTipBanner({ show, onClose }) {
  if (!show) return null;

  return (
    <div style={styles.tipBanner}>
      <div style={styles.tipLeft}>
        <span style={{ fontSize: '16px' }}>💡</span>
        <span style={styles.tipText}>
          <strong>Lưu ý:</strong> Mỗi đề thi thử chỉ được làm 1 lần. Thời gian làm bài có giới hạn theo quy định của hệ thống.
        </span>
      </div>
      <button onClick={onClose} style={styles.closeTipBtn}>✕</button>
    </div>
  );
}