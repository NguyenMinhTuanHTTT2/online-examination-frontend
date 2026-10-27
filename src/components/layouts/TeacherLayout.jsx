import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TeacherLayout({ children, activeMenu }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const fetchTeacherProfile = async () => {
      try {
        // Đọc token từ sessionStorage (cô lập theo từng Tab)
        const token = sessionStorage.getItem('token');
        
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('http://localhost:8080/api/v1/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        // Nếu token không hợp lệ -> Xoá sessionStorage
        if (response.status === 401 || response.status === 403) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Không thể xác thực người dùng');
        }

        const data = await response.json();
        
        // KIỂM TRA ROLE (Hỗ trợ cả mảng roles hoặc chuỗi role/roleName)
        const roles = data.roles || (data.roleName ? [data.roleName] : (data.role ? [data.role] : []));
        const isStudent = roles.includes('ROLE_STUDENT') || roles.includes('STUDENT') || roles.includes('HỌC SINH');

        if (isStudent) {
          // Tự động chuyển về trang Học sinh nếu tài khoản hiện tại ở Tab này là Học sinh
          navigate('/student/dashboard');
          return;
        }

        const teacherName = data.fullName || data.username || data.name || 'Giáo viên';

        setUserInfo({
          fullName: teacherName,
          email: data.email || 'teacher@system.com',
          roleName: roles[0] || 'Giáo viên'
        });

      } catch (error) {
        console.error('Lỗi xác thực Giáo viên:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeacherProfile();
  }, [navigate]);

  const getInitials = (name) => {
    if (!name) return 'GV';
    const words = name.trim().split(' ');
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
  };

  const menuItems = [
    { name: 'Tổng quan', path: '/teacher/dashboard', icon: '🏠' },
    { name: 'Đề thi', path: '/teacher/mock-tests', icon: '📝' },
    { name: 'Kỳ thi', path: '/teacher/exams', icon: '📅' },
    { name: 'Ngân hàng câu hỏi', path: '/teacher/questions', icon: '📚' },
    { name: 'Thống kê & Báo cáo', path: '/teacher/reports', icon: '📊' },
  ];

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8fafc' }}>
        Đang xác thực thông tin...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif" }}>
      
      {/* 1. SIDEBAR MENU BÊN TRÁI */}
      <aside style={{ width: '250px', backgroundColor: '#0f172a', color: '#fff', display: 'flex', flexDirection: 'column', flexShrink: 0, boxShadow: '2px 0 8px rgba(0,0,0,0.05)' }}>
        
        {/* Header Logo */}
        <div style={{ padding: '20px 24px', fontWeight: 'bold', fontSize: '18px', borderBottom: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
          <span style={{ fontSize: '22px' }}>🎓</span>
          <span>Giáo Viên Panel</span>
        </div>

        {/* Danh sách các nút Menu */}
        <nav style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path || activeMenu === item.name;
            const isHovered = hoveredIndex === index;

            let bgColor = 'transparent';
            let textColor = '#94a3b8';
            let fontWeight = '500';

            if (isHovered || isActive) {
              bgColor = '#2563eb';
              textColor = '#ffffff';
              fontWeight = '600';
            }

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: bgColor,
                  color: textColor,
                  fontWeight: fontWeight,
                  fontSize: '14px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease-in-out',
                  transform: isHovered ? 'translateX(4px)' : 'none'
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </nav>

       {/* Thông tin Giáo viên dưới đáy Sidebar */}
<div style={{ padding: '16px', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#090d16' }}>
  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '15px', flexShrink: 0 }}>
    {getInitials(userInfo?.fullName)}
  </div>
  <div style={{ overflow: 'hidden' }}>
    <div style={{ fontSize: '13px', fontWeight: '600', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {userInfo?.fullName || 'Giáo viên'}
    </div>
    <div style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      {userInfo?.email || 'teacher@system.com'}
    </div>
  </div>
</div>
      </aside>

      {/* 2. NỘI DUNG TRANG BÊN PHẢI */}
      <main style={{ flex: 1, minWidth: 0, overflowY: 'auto', padding: '24px' }}>
        {children}
      </main>

    </div>
  );
}