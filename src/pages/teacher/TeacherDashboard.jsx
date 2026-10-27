import React from 'react';
import { useNavigate } from 'react-router-dom';
import TeacherLayout from "../../components/layouts/TeacherLayout";
import { teacherStyles as styles } from '../../assets/styles/teacher/teacherStyles';
import { useTeacherDashboard } from '../../hooks/teacher/useTeacherDashboard';

export default function TeacherDashboardPage() {
  const navigate = useNavigate();

  // Lấy dữ liệu từ Hook
  const {
    user: hookUser,
    dashboardStats,
    featuredExams,
    recentActivities,
    currentDateStr,
    getInitials
  } = useTeacherDashboard();

  // Lấy thông tin user chuẩn từ sessionStorage
  const sessionUser = JSON.parse(sessionStorage.getItem('user') || '{}');
  const currentUser = sessionUser.fullName ? sessionUser : hookUser;

  // Lấy tên hiển thị chuẩn (fullName -> username -> name -> Giáo viên)
  const displayName = currentUser?.fullName || currentUser?.username || currentUser?.name || 'Giáo viên';

  return (
    <TeacherLayout activeMenu="Tổng quan">
      <div>
        {/* 1. KHỐI HEADER CHÀO MỪNG & NGÀY THÁNG */}
        <div style={styles.headerRow}>
          <div style={styles.welcomeBanner}>
            <div>
              <h2 style={styles.welcomeTitle}>Xin chào, {displayName}!</h2>
              <p style={styles.welcomeSub}>
                Chào mừng bạn trở lại với hệ thống luyện thi. Cùng tạo nên những kỳ thi chất lượng và hiệu quả!
              </p>
            </div>
          </div>
          <div style={styles.dateCard}>
            <div style={styles.bannerGraphic}>
              📅 {currentDateStr}
            </div>
          </div>
        </div>

        {/* 2. 4 THẺ THỐNG KÊ */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statLabel}>Tổng số lượng đề thi</div>
            <div style={styles.statValue}>{dashboardStats?.totalExams ?? 0}</div>
            <div style={styles.statSubText}>đề thi trong kho</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Ngân hàng câu hỏi</div>
            <div style={styles.statValue}>{dashboardStats?.totalQuestions ?? 0}</div>
            <div style={styles.statSubText}>câu hỏi</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Kỳ thi đang hoạt động</div>
            <div style={styles.statValue}>{dashboardStats?.activeExams ?? 0}</div>
            <div style={styles.statSubText}>kỳ thi</div>
          </div>

          <div style={styles.statCard}>
            <div style={styles.statLabel}>Tổng lượt làm bài</div>
            <div style={styles.statValue}>{(dashboardStats?.totalAttempts ?? 0).toLocaleString()}</div>
            <div style={styles.statSubText}>lượt làm bài</div>
          </div>
        </div>

        {/* 3. THAO TÁC NHANH */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={styles.sectionHeaderTitle}>Thao tác nhanh</h3>
          <div style={styles.quickActionsGrid}>
            
            <div 
              style={{ ...styles.actionCard, backgroundColor: '#2563eb', cursor: 'pointer' }}
              onClick={() => navigate('/teacher/mock-tests')}
            >
              <span style={styles.actionIcon}>📝</span>
              <div>
                <div style={styles.actionTitle}>+ Tạo đề thi mới</div>
                <div style={styles.actionDesc}>Soạn đề thủ công hoặc tự động</div>
              </div>
            </div>

            <div 
              style={{ ...styles.actionCard, backgroundColor: '#16a34a', cursor: 'pointer' }}
              onClick={() => navigate('/teacher/exams')}
            >
              <span style={styles.actionIcon}>📅</span>
              <div>
                <div style={styles.actionTitle}>+ Lên lịch kỳ thi</div>
                <div style={styles.actionDesc}>Cấu hình phòng thi cho học sinh</div>
              </div>
            </div>

            <div 
              style={{ ...styles.actionCard, backgroundColor: '#9333ea', cursor: 'pointer' }}
              onClick={() => navigate('/teacher/questions')}
            >
              <span style={styles.actionIcon}>📚</span>
              <div>
                <div style={styles.actionTitle}>+ Thêm câu hỏi</div>
                <div style={styles.actionDesc}>Bổ sung vào ngân hàng câu hỏi</div>
              </div>
            </div>

            <div 
              style={{ ...styles.actionCard, backgroundColor: '#0284c7', cursor: 'pointer' }}
              onClick={() => navigate('/teacher/reports')}
            >
              <span style={styles.actionIcon}>📊</span>
              <div>
                <div style={styles.actionTitle}>Xem báo cáo nhanh</div>
                <div style={styles.actionDesc}>Biểu đồ phổ điểm, hiệu suất</div>
              </div>
            </div>

          </div>
        </div>

        {/* 4. KHỐI LƯỚI BÊN DƯỚI */}
        <div style={styles.bottomGrid}>
          
          {/* CỘT TRÁI: ĐỀ THI TỪ CSDL */}
          <div style={styles.gridCard}>
            <div style={styles.cardHeader}>
              <h4 style={styles.cardTitle}>🔥 Kỳ thi thử nổi bật</h4>
              <span 
                style={{ ...styles.linkText, cursor: 'pointer' }} 
                onClick={() => navigate('/teacher/mock-tests')}
              >
                Xem tất cả →
              </span>
            </div>
            <div style={styles.examList}>
              {featuredExams && featuredExams.length > 0 ? (
                featuredExams.map((exam) => (
                  <div key={exam.id} style={styles.examItem}>
                    <div style={{ ...styles.examBadgeIcon, backgroundColor: '#2563eb' }}>📝</div>
                    <div style={{ flex: 1 }}>
                      <div style={styles.examName}>{exam.title}</div>
                      <div style={styles.examMeta}>
                        Mã đề: {exam.code} | {exam.participants || 0} lượt làm bài
                      </div>
                    </div>
                    <span style={styles.statusOpen}>{exam.status}</span>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>Chưa có bài thi nào trong CSDL MySQL.</p>
              )}
            </div>
          </div>

          {/* CỘT PHẢI: HOẠT ĐỘNG GẦN ĐÂY TỪ CSDL */}
          <div style={styles.gridCard}>
            <div style={styles.cardHeader}>
              <h4 style={styles.cardTitle}>🕒 Hoạt động gần đây</h4>
            </div>
            <div style={styles.timelineList}>
              {recentActivities && recentActivities.length > 0 ? (
                recentActivities.map((act) => (
                  <div key={act.id} style={styles.timelineItem}>
                    <span style={styles.timePillGreen}>Mới</span>
                    <div style={styles.timelineText}>
                      <strong>{act.studentName}</strong> vừa nộp bài <em>{act.quizTitle}</em>. Điểm: {act.score ?? 'N/A'}
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: '12px', color: '#94a3b8' }}>Chưa có lượt nộp bài nào trong CSDL.</p>
              )}
            </div>
          </div>

        </div>

      </div>
    </TeacherLayout>
  );
}