import React from 'react';
import { questionBankStyles as styles, getDifficultyConfig } from '../../assets/styles/teacher/questionBankStyles';

export default function QuestionDetail({ selectedQuestion, currentQuizId }) {
  const diffCfg = getDifficultyConfig(selectedQuestion.difficulty);

  return (
    <div style={styles.rightColumn}>
      <div style={styles.detailCard}>
        <div style={styles.detailHeader}>
          <h3 style={styles.detailTitle}>Chi tiết câu hỏi</h3>
        </div>

        <div style={styles.metaBox}>
          <div style={styles.metaRow}><span>Đề thi ID:</span> <strong>{currentQuizId}</strong></div>
          <div style={styles.metaRow}><span>Môn học:</span> <strong>{selectedQuestion.subject || 'Toán học'}</strong></div>
          <div style={styles.metaRow}>
            <span>Độ khó:</span> 
            <strong style={{ color: diffCfg.color }}>
              {diffCfg.label}
            </strong>
          </div>
          <div style={styles.metaRow}><span>Điểm số:</span> <strong style={{ color: '#16a34a' }}>{selectedQuestion.scoreWeight || '1.0'} đ</strong></div>
        </div>

        <div style={styles.contentSection}>
          <div style={styles.sectionLabel}>Nội dung câu hỏi</div>
          <div style={styles.mainQuestionText}>{selectedQuestion.content}</div>

          {selectedQuestion.answers && selectedQuestion.answers.length > 0 && (
            <div style={styles.optionsContainer}>
              {selectedQuestion.answers.map((opt, optIdx) => {
                const keyChar = String.fromCharCode(65 + optIdx);
                return (
                  <div
                    key={optIdx}
                    style={{
                      ...styles.optionCard,
                      borderColor: opt.isCorrect ? '#16a34a' : '#e2e8f0',
                      backgroundColor: opt.isCorrect ? '#f0fdf4' : '#ffffff',
                    }}
                  >
                    <span style={styles.optionKey}>{keyChar}.</span>
                    <span style={{ flex: 1, fontSize: '13px' }}>{opt.content}</span>
                    {opt.isCorrect && <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span>}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {selectedQuestion.explanation && (
          <div style={styles.contentSection}>
            <div style={styles.sectionLabel}>Lời giải chi tiết</div>
            <div style={styles.solutionContent}>{selectedQuestion.explanation}</div>
          </div>
        )}
      </div>
    </div>
  );
}