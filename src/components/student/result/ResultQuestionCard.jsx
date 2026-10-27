import React from 'react';
import { quizResultStyles as styles } from '../../../assets/styles/student/quizResultStyles';

export default function ResultQuestionCard({ questionDetail, globalIndex, totalQuestions, getImageUrl, onPrev, onNext }) {
  if (!questionDetail) {
    return <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>Không có dữ liệu câu hỏi trong bộ lọc này.</div>;
  }

  const q = questionDetail;
  const isCorrect = Boolean(q.isCorrect);
  const rawStudent = q.studentAnswerIds ?? q.studentAnswerId ?? [];
  const studentAnswers = Array.isArray(rawStudent) ? rawStudent : [rawStudent];
  const rawCorrect = q.correctAnswerIds ?? q.correctAnswerId ?? [];
  const correctAnswers = Array.isArray(rawCorrect) ? rawCorrect : [rawCorrect];
  const isUnanswered = studentAnswers.length === 0 || studentAnswers[0] === null || studentAnswers[0] === undefined;

  return (
    <div style={styles.questionCard}>
      <div style={styles.qHeaderRow}>
        <span style={styles.qBadge}>Câu {globalIndex + 1}</span>
        <span style={{
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '12px',
          fontWeight: '700',
          backgroundColor: isCorrect ? '#f0fdf4' : isUnanswered ? '#fffbeb' : '#fef2f2',
          color: isCorrect ? '#16a34a' : isUnanswered ? '#d97706' : '#dc2626',
        }}>
          {isCorrect ? '✓ Đúng' : isUnanswered ? '⚪ Chưa trả lời' : '✗ Sai'}
        </span>
      </div>

      <p style={styles.qText}>{q.questionContent}</p>

      {q.imageUrl && (
        <img src={getImageUrl(q.imageUrl)} alt="Question Attachment" style={styles.qImage} />
      )}

      {Array.isArray(q.options) && (
        <div style={styles.optionsList}>
          {q.options.map((opt) => {
            const isUserSelected = studentAnswers.some((id) => String(id) === String(opt.id));
            const isRightOption = correctAnswers.some((id) => String(id) === String(opt.id));

            let bg = '#ffffff';
            let border = '#e2e8f0';
            let badgeText = '';
            let badgeBg = '';

            if (isRightOption) {
              bg = '#f0fdf4';
              border = '#bbf7d0';
              badgeText = '✓ Đáp án đúng';
              badgeBg = '#dcfce7';
            }
            if (isUserSelected && !isRightOption) {
              bg = '#fef2f2';
              border = '#fecaca';
              badgeText = 'Bạn đã chọn';
              badgeBg = '#fee2e2';
            }
            if (isUserSelected && isRightOption) {
              badgeText = 'Bạn đã chọn & Đúng';
              badgeBg = '#dcfce7';
            }

            return (
              <div
                key={opt.id}
                style={{
                  ...styles.optionBox,
                  backgroundColor: bg,
                  borderColor: border,
                  fontWeight: isUserSelected || isRightOption ? '600' : 'normal',
                }}
              >
                <span>{opt.content}</span>
                {badgeText && (
                  <span style={{
                    fontSize: '11px',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    backgroundColor: badgeBg,
                    color: isRightOption ? '#16a34a' : '#dc2626',
                  }}>
                    {badgeText}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {q.explanation && (
        <div style={styles.explanationBox}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>💡</span> Lời giải chi tiết
          </div>
          <div style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
            {q.explanation}
          </div>
        </div>
      )}

      <div style={styles.navActionRow}>
        <button onClick={onPrev} style={styles.secondaryBtn}>
          ← Câu trước
        </button>
        <button onClick={onNext} style={styles.primaryBtn}>
          Câu tiếp theo →
        </button>
      </div>
    </div>
  );
}