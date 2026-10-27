import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { studentStyles as styles } from '../../assets/styles/student/studentStyles';

export default function StudentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: 'Tổng quan', path: '/student/dashboard', icon: '🏠' },
    { label: 'Luyện đề tự do', path: '/student/practice', icon: '📖' },
    { label: 'Thi thử', path: '/student/mock-test', icon: '⏱️' },
    { label: 'Lịch sử & Kết quả', path: '/student/history', icon: '🕒' },
    { label: 'Câu hỏi đã lưu', path: '/student/saved-questions', icon: '🔖' },
    { label: 'Bảng xếp hạng', path: '/student/leaderboard', icon: '🏆' },
    { label: 'Cài đặt cá nhân', path: '/student/profile', icon: '⚙️' },
  ];

  return (
    <aside style={styles.sidebar}>
      <style>{`
        .menu-item {
          padding: 10px 14px;
          font-size: 13px;
          font-weight: 500;
          color: #94a3b8;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.2s;
        }
        .menu-item:hover {
          background-color: #1e293b;
          color: #ffffff;
        }
        .menu-item.active {
          background-color: #2563eb;
          color: #ffffff;
          font-weight: 600;
        }
      `}</style>

      <div>
        <div style={styles.logoBox}>
          <div style={styles.logoIcon}>🎓</div>
          <div>
            <h1 style={styles.logoTitle}>EduTest</h1>
            <span style={styles.logoSub}>Luyện thi linh hoạt</span>
          </div>
        </div>

        <nav style={styles.menuContainer}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.path}
                className={`menu-item ${isActive ? 'active' : ''}`}
                onClick={() => navigate(item.path)}
              >
                <span>{item.icon}</span> {item.label}
              </div>
            );
          })}
        </nav>
      </div>

      <div style={styles.sidebarMotivationCard}>
        <div style={{ fontSize: '24px', marginBottom: '4px' }}>🏔️</div>
        <div style={{ fontWeight: 'bold', fontSize: '11px', color: '#ffffff', marginBottom: '4px' }}>
          Cố gắng mỗi ngày
        </div>
        <div style={{ fontSize: '10px', color: '#94a3b8', lineHeight: '1.3' }}>
          sẽ tạo nên kết quả lớn!
        </div>
        <div style={{ fontSize: '10px', color: '#60a5fa', marginTop: '6px' }}>
          Hành trình của bạn đang tiếp diễn...
        </div>
      </div>
    </aside>
  );
}