import React from 'react';
import { quizResultStyles as styles } from '../../../assets/styles/student/quizResultStyles';

export default function ResultOverviewBanner({ result, onBackToPractice }) {
  const formatDuration = (totalSeconds) => {
    if (!totalSeconds || totalSeconds <= 0) return '0 phút';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} phút ${seconds > 0 ? `${seconds} giây` : ''}`;
  };

  const percentage = typeof result.percentage === 'number' 
    ? result.percentage.toFixed(0) 
    : (Number(result.percentage) ? Number(result.percentage).toFixed(0) : '0');

  // Chuẩn hóa điểm số luôn có 1 chữ số thập phân (ví dụ: 4.0 hoặc 7.8)
  const rawScore = Number(result.scoreObtained ?? 0);
  const formattedScore = !isNaN(rawScore) ? rawScore.toFixed(1) : '0.0';

  return (
    <>
      <div style={styles.topBanner}>
        <div>
          <div style={styles.breadcrumbText}>Luyện đề / {result.quizTitle || 'Bài luyện tập'} / Kết quả</div>
          <div style={styles.bannerTitleRow}>
            <div style={styles.bannerIcon}>📄</div>
            <div>
              <h2 style={styles.titleText}>Kết quả luyện đề</h2>
              <div style={styles.subInfoText}>
                {result.quizTitle} • {result.totalQuestions || 0} câu • Kết quả: {result.correctCount || 0}/{result.totalQuestions || 0} câu đúng
              </div>
            </div>
          </div>
        </div>
        <button onClick={onBackToPractice} style={styles.secondaryBtn}>
          ← Quay về Luyện đề
        </button>
      </div>

      <div style={styles.overviewCard}>
        {/* Điểm số dạng tròn - Cập nhật hiển thị dạng X.X / 10 */}
        <div style={styles.scoreCircleBox}>
          <div style={{
            width: '76px', // Mở rộng nhẹ khung chứa để vừa chữ số thập phân và / 10
            height: '76px',
            borderRadius: '50%',
            border: '4px solid #2563eb',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#1e3a8a',
            fontSize: '15px',
            lineHeight: '1.2'
          }}>
            <div>{formattedScore}</div>
            <div style={{ fontSize: '11px', fontWeight: 'normal', color: '#64748b' }}>/ 10</div>
          </div>
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>Hoàn thành tốt</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Điểm tổng kết</div>
          </div>
        </div>

        {/* Thẻ Số câu đúng */}
        <div style={styles.statCardItem}>
          <div style={{ fontSize: '16px', marginBottom: '2px' }}>✅</div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#16a34a' }}>{result.correctCount || 0} / {result.totalQuestions || 0}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Câu đúng</div>
        </div>

        {/* Thẻ Số câu sai */}
        <div style={styles.statCardItem}>
          <div style={{ fontSize: '16px', marginBottom: '2px' }}>❌</div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#dc2626' }}>{result.incorrectCount || 0}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Câu sai</div>
        </div>

        {/* Thẻ Bỏ trống */}
        <div style={styles.statCardItem}>
          <div style={{ fontSize: '16px', marginBottom: '2px' }}>⚪</div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#64748b' }}>{result.unansweredCount || 0}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Câu bỏ trống</div>
        </div>

        {/* Thẻ Thời gian */}
        <div style={styles.statCardItem}>
          <div style={{ fontSize: '16px', marginBottom: '2px' }}>⏱️</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a' }}>{formatDuration(result.durationSeconds)}</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Thời gian</div>
        </div>

        {/* Thẻ Tỷ lệ chính xác */}
        <div style={{ ...styles.statCardItem, borderLeft: '1px solid #f1f5f9', paddingLeft: '16px' }}>
          <div style={{ fontSize: '18px', fontWeight: '700', color: '#2563eb' }}>{percentage}%</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>Tỷ lệ chính xác</div>
        </div>
      </div>
    </>
  );
}