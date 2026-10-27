import React from 'react';
import { useNavigate } from 'react-router-dom';
import { studentStyles as styles } from '../../../assets/styles/student/studentStyles';

export default function FeaturedExamCard({ featuredExam, timeLeft }) {
  const navigate = useNavigate();
  const formatTwoDigits = (num) => String(num || 0).padStart(2, '0');

  return (
    <div style={styles.featuredExamCard}>
      <div style={{ flex: 1, zIndex: 1 }}>
        <div style={styles.featuredTag}>🔥 Thi thử nổi bật</div>
        <h3 style={styles.featuredTitle}>
          {featuredExam ? featuredExam.title : 'Chưa có kỳ thi nổi bật'}
        </h3>
        {featuredExam && (
          <>
            <div style={styles.featuredBadgeRow}>
              <span style={styles.badgeInfo}>📘 Môn: {featuredExam.subject}</span>
              <span style={styles.badgeInfo}>🏫 Khối: {featuredExam.grade}</span>
              <span style={styles.badgeInfo}>
                ⏱️ {featuredExam.totalQuestions} câu • {featuredExam.durationMinutes} phút
              </span>
            </div>
            <div style={styles.participantsText}>
              👥 {featuredExam.participantCount?.toLocaleString()} học sinh đã tham gia
            </div>
            <div style={{ marginTop: '12px' }}>
              <span style={styles.statusOpen}>
                {featuredExam.status === 'OPEN' ? '🟢 Đang mở' : '🔴 Sắp đóng'}
              </span>
            </div>
          </>
        )}
      </div>

      <div style={styles.featuredRightBox}>
        <div style={styles.timerCard}>
          <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>Thời gian kết thúc</div>
          <div style={styles.timerDigits}>
            {/* Hiển thị đếm ngược an toàn, nếu có timeLeft mới hiện số, ngược lại hiện chữ thông báo */}
            {timeLeft ? (
              <>
                <div>{formatTwoDigits(timeLeft?.hours || 0)} <span style={styles.timerUnit}>giờ</span></div> :
                <div>{formatTwoDigits(timeLeft?.minutes || 0)} <span style={styles.timerUnit}>phút</span></div> :
                <div>{formatTwoDigits(timeLeft?.seconds || 0)} <span style={styles.timerUnit}>giây</span></div>
              </>
            ) : (
              <div style={{ fontSize: '12px', color: '#6c757d', fontStyle: 'italic' }}>
                Không giới hạn
              </div>
            )}
          </div>
        </div>
        <button
          style={styles.btnStartExam}
          onClick={() => featuredExam && navigate(`/quiz-take/${featuredExam.id}`)}
        >
          Vào thi ngay →
        </button>
      </div>
    </div>
  );
}