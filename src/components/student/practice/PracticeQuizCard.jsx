import React from 'react';
import { practiceStyles as styles } from '../../../assets/styles/student/practiceStyles';

export default function PracticeQuizCard({ quiz, onStart }) {
  // Lấy tên môn học từ JSON trả về
  const subjectName = quiz.subjectName || 'Tổng hợp';

  const getSubjectIconMeta = (name) => {
    switch (name?.toLowerCase()) {
      case 'lập trình':
      case 'java':
        return { icon: '</>', bg: '#8b5cf6', color: '#ffffff' };
      case 'toán học':
      case 'toán':
        return { icon: '🧮', bg: '#2563eb', color: '#ffffff' };
      case 'vật lý':
        return { icon: '⚛️', bg: '#10b981', color: '#ffffff' };
      case 'tiếng anh':
        return { icon: '🇬🇧', bg: '#f43f5e', color: '#ffffff' };
      case 'ngữ văn':
        return { icon: '📖', bg: '#f97316', color: '#ffffff' };
      case 'hóa học':
        return { icon: '🧪', bg: '#14b8a6', color: '#ffffff' };
      default:
        return { icon: '📝', bg: '#64748b', color: '#ffffff' };
    }
  };

  const meta = getSubjectIconMeta(subjectName);

  // Lấy trực tiếp từ quiz vì JSON trả về phẳng
  const difficulty = quiz.difficulty || 'Trung bình';

  const getDifficultyBadgeStyle = (diff) => {
    switch (diff) {
      case 'EASY':
      case 'Dễ':
      case 'Dễ - Trung bình':
        return { backgroundColor: '#f0fdf4', color: '#16a34a' };
      case 'MEDIUM':
      case 'Trung bình':
        return { backgroundColor: '#fff7ed', color: '#ea580c' };
      case 'HARD':
      case 'Khó':
      case 'Trung bình - Khó':
        return { backgroundColor: '#fef2f2', color: '#dc2626' };
      default:
        return { backgroundColor: '#f1f5f9', color: '#475569' };
    }
  };

  const durationMinutes = quiz.durationMinutes || 0;

  return (
    <div style={styles.quizCard}>
      <div>
        <div style={styles.cardTop}>
          <div
            style={{
              ...styles.subjectIconBox,
              backgroundColor: meta.bg,
              color: meta.color,
            }}
          >
            {meta.icon}
          </div>

          <div style={styles.cardContent}>
            <h3 style={styles.cardTitle}>{quiz.title}</h3>
            <div style={styles.badgeRow}>
              <span style={styles.badgeSubject}>{subjectName}</span>
              <span
                style={{
                  ...styles.badgeDifficulty,
                  ...getDifficultyBadgeStyle(difficulty),
                }}
              >
                {difficulty}
              </span>
            </div>
          </div>
        </div>

        <p style={styles.cardDesc}>{quiz.description}</p>
      </div>

      <div style={styles.cardFooter}>
        <div style={styles.metaInfo}>
          <span>📄 {quiz.totalQuestions || 0} câu</span>
          <span>⏱️ {durationMinutes} phút</span>
        </div>

        <button style={styles.btnStartPractice} onClick={() => onStart(quiz.id)}>
          Bắt đầu luyện →
        </button>
      </div>
    </div>
  );
}