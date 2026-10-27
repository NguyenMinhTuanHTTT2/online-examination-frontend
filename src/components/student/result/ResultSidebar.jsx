import React from 'react';
import { quizResultStyles as styles } from '../../../assets/styles/student/quizResultStyles';

export default function ResultSidebar({ details, currentIndex, onSelectIndex, onRetry, onBackToDashboard }) {
  return (
    <div style={styles.sidebar}>
      <h4 style={styles.sidebarTitle}>
        <span>📋</span> Danh sách câu hỏi
      </h4>

      <div style={styles.gridNumbers}>
        {details.map((q, idx) => {
          const isCorrect = Boolean(q.isCorrect);
          const rawStudent = q.studentAnswerIds ?? q.studentAnswerId ?? [];
          const studentAnswers = Array.isArray(rawStudent) ? rawStudent : [rawStudent];
          const isUnanswered = studentAnswers.length === 0 || studentAnswers[0] === null || studentAnswers[0] === undefined;
          const isCurrent = idx === currentIndex;

          let bg = '#f8fafc';
          let color = '#334155';
          let border = '1px solid #cbd5e1';

          if (isCurrent) {
            bg = '#2563eb';
            color = '#ffffff';
            border = '2px solid #1d4ed8';
          } else if (isCorrect) {
            bg = '#f0fdf4';
            color = '#16a34a';
            border = '1px solid #bbf7d0';
          } else if (!isUnanswered && !isCorrect) {
            bg = '#fef2f2';
            color = '#dc2626';
            border = '1px solid #fecaca';
          }

          return (
            <button
              key={q.questionId || idx}
              onClick={() => onSelectIndex(idx)}
              style={{
                ...styles.numberBtn,
                backgroundColor: bg,
                color: color,
                border: border,
              }}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      <div style={styles.legendBox}>
        <div style={styles.legendItem}>
          <span style={{ ...styles.dot, backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}></span> Trả lời đúng
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.dot, backgroundColor: '#fef2f2', border: '1px solid #fecaca' }}></span> Trả lời sai
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.dot, backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}></span> Chưa trả lời
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
        <button onClick={onRetry} style={styles.primaryBtn}>
          🔄 Làm lại bài
        </button>
        <button onClick={onBackToDashboard} style={styles.secondaryBtn}>
          🏠 Về kết quả chung
        </button>
      </div>
    </div>
  );
}