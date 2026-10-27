import React from 'react';
import { quizTakeStyles as styles } from '../../../assets/styles/student/quizTakeStyles';

export default function QuizTakeHeader({ quizTitle, savingStatus, timeLeft, currentIndex, totalQuestions }) {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = totalQuestions > 0 ? Math.round(((currentIndex + 1) / totalQuestions) * 100) : 0;

  return (
    <header style={styles.header}>
      <div style={styles.headerTopRow}>
        <div>
          <h3 style={styles.quizTitle}>{quizTitle}</h3>
          <span style={styles.headerSubInfo}>Trạng thái: {savingStatus}</span>
        </div>
        <div style={styles.progressInfoRight}>
          <span style={styles.timerBox}>⏱️ {formatTime(timeLeft)}</span>
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>
          <span>Tiến độ làm bài</span>
          <span>Câu {currentIndex + 1} / {totalQuestions} ({progressPercent}%)</span>
        </div>
        <div style={styles.progressBarTrack}>
          <div style={{ ...styles.progressBarFill, width: `${progressPercent}%` }} />
        </div>
      </div>
    </header>
  );
}