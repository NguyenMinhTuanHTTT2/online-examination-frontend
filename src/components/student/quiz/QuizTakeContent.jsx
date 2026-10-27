import React from 'react';
import { quizTakeStyles as styles } from '../../../assets/styles/student/quizTakeStyles';

export default function QuizTakeContent({
  currentQuestion,
  currentQId,
  currentIndex,
  totalQuestions,
  selectedAnswers,
  isBookmarked,
  onSelectOption,
  onBookmarkToggle,
  onPrev,
  onNext,
  onSubmitClick,
  isSubmitting,
}) {
  if (!currentQuestion) {
    return <div style={{ textAlign: 'center', padding: '30px', color: '#888' }}>Không có dữ liệu câu hỏi.</div>;
  }

  return (
    <div style={styles.questionPane}>
      <div>
        <div style={styles.questionHeader}>
          <span style={styles.questionBadge}>Câu {currentIndex + 1}</span>
          <span style={{ color: '#64748b', fontSize: '12px' }}>({currentQuestion.points || 1} điểm)</span>
        </div>

        <p style={styles.questionText}>{currentQuestion.content}</p>

        {currentQuestion.imageUrl && (
          <img
            src={currentQuestion.imageUrl.startsWith('http') ? currentQuestion.imageUrl : `http://localhost:8080${currentQuestion.imageUrl}`}
            alt="Question Attachment"
            style={styles.questionImage}
          />
        )}

        <div style={styles.optionsList}>
          {(currentQuestion.options || []).map((option, idx) => {
            const isSelected = selectedAnswers[currentQId] === option.id;
            const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
            return (
              <div
                key={option.id}
                onClick={() => onSelectOption(currentQId, option.id)}
                style={{
                  ...styles.optionCard,
                  borderColor: isSelected ? '#2563eb' : '#e2e8f0',
                  backgroundColor: isSelected ? '#eff6ff' : '#ffffff',
                }}
              >
                <input
                  type="radio"
                  name={`q_${currentQId}`}
                  checked={isSelected}
                  onChange={() => {}}
                  style={{ marginRight: '12px', accentColor: '#2563eb' }}
                />
                <span><strong>{optionLabels[idx]}.</strong> {option.content}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.actionRow}>
        <button onClick={() => onBookmarkToggle(currentQId)} style={styles.bookmarkBtn}>
          {isBookmarked ? '🔖 Đã đánh dấu' : '📑 Đánh dấu câu hỏi'}
        </button>

        <div style={styles.navButtonsGroup}>
          <button disabled={currentIndex === 0} onClick={onPrev} style={styles.secondaryBtn}>
            ← Câu trước
          </button>
          {currentIndex < totalQuestions - 1 ? (
            <button onClick={onNext} style={styles.primaryBtn}>
              Câu tiếp theo →
            </button>
          ) : (
            <button onClick={onSubmitClick} disabled={isSubmitting} style={styles.submitBtn}>
              {isSubmitting ? 'Đang nộp...' : '🏁 Hoàn thành bài'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}