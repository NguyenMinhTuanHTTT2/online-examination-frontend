import React from 'react';
import { quizTakeStyles as styles } from '../../../assets/styles/student/quizTakeStyles';

export default function QuizTakeSidebar({
  questions,
  selectedAnswers,
  bookmarkedQuestions,
  currentIndex,
  onSelectIndex,
  getQId,
  onSubmitClick,
  isSubmitting,
}) {
  const answeredCount = Object.keys(selectedAnswers).filter(
    (k) => selectedAnswers[k] !== undefined && selectedAnswers[k] !== null
  ).length;

  return (
    <div style={styles.sidebar}>
      <h4 style={styles.sidebarTitle}>
        <span>📋</span> Danh sách câu hỏi
      </h4>

      <div style={{ fontSize: '12px', color: '#64748b' }}>
        Đã làm: <strong>{answeredCount}</strong> / {questions.length} câu
      </div>

      <div style={styles.gridNumbers}>
        {questions.map((q, idx) => {
          const qId = getQId(q);
          const isAnswered = selectedAnswers[qId] !== undefined && selectedAnswers[qId] !== null;
          const isCurrent = idx === currentIndex;
          const isBookmarked = bookmarkedQuestions[qId];

          let bg = '#f8fafc';
          let color = '#334155';
          let border = '1px solid #cbd5e1';

          if (isCurrent) {
            bg = '#2563eb';
            color = '#ffffff';
            border = '2px solid #1d4ed8';
          } else if (isAnswered) {
            bg = '#eff6ff';
            color = '#1e40af';
            border = '1px solid #93c5fd';
          }

          return (
            <button
              key={qId || idx}
              onClick={() => onSelectIndex(idx)}
              style={{
                ...styles.numberBtn,
                backgroundColor: bg,
                color: color,
                border: border,
              }}
            >
              {idx + 1}
              {isBookmarked && <span style={styles.bookmarkIndicator}>🔖</span>}
            </button>
          );
        })}
      </div>

      <div style={styles.legendBox}>
        <div style={styles.legendItem}>
          <span style={{ ...styles.dot, backgroundColor: '#eff6ff', border: '1px solid #93c5fd' }}></span> Đã trả lời
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.dot, backgroundColor: '#2563eb' }}></span> Câu hiện tại
        </div>
        <div style={styles.legendItem}>
          <span style={{ ...styles.dot, backgroundColor: '#f8fafc', border: '1px solid #cbd5e1' }}></span> Chưa trả lời
        </div>
        <div style={styles.legendItem}>
          <span>🔖 Đã đánh dấu</span>
        </div>
      </div>

      <button
        onClick={onSubmitClick}
        disabled={isSubmitting}
        style={{
          ...styles.submitBtn,
          width: '100%',
          marginTop: '10px',
          padding: '11px',
        }}
      >
        {isSubmitting ? 'Đang nộp...' : '🏁 Hoàn thành bài'}
      </button>
    </div>
  );
}