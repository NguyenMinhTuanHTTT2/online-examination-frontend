import React from 'react';
import { studentStyles as styles } from '../../../assets/styles/student/studentStyles';

export default function GreetingBanner({ userInfo }) {
  // Tự động thay đổi câu chào theo thời gian thực (Sáng / Chiều / Tối)
  const getGreetingText = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Chúc bạn một buổi sáng học tập hiệu quả! ☀️';
    if (hour < 18) return 'Chúc bạn một buổi chiều tràn đầy năng lượng! 🌤️';
    return 'Chúc bạn một buổi tối ôn luyện vui vẻ! 🌙';
  };

  // Style riêng cho Banner Lời chào (khớp với bộ màu dark theme của Sidebar)
  const bannerStyle = {
    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    borderRadius: '12px',
    padding: '18px 24px',
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid #334155',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
  };

  const titleStyle = {
    margin: 0,
    fontSize: '20px',
    fontWeight: '700',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const subTitleStyle = {
    margin: '6px 0 0 0',
    fontSize: '13px',
    color: '#94a3b8',
  };

  const badgeGoalStyle = {
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
    border: '1px solid #2563eb',
    color: '#93c5fd',
    padding: '6px 14px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  return (
    <div style={bannerStyle}>
      <div>
        <h2 style={titleStyle}>
          Xin chào, {userInfo?.fullName || 'Học sinh'}! 👋
        </h2>
        <p style={subTitleStyle}>{getGreetingText()}</p>
      </div>

      <div style={badgeGoalStyle}>
        <span>🎯</span>
        <span>Mục tiêu hôm nay: Hoàn thành ít nhất 1 bài thi</span>
      </div>
    </div>
  );
}