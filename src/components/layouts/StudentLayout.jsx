import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import StudentSidebar from '../../components/student/StudentSidebar';
import StudentHeader from '../../components/student/StudentHeader';
import { studentStyles as styles } from '../../assets/styles/student/studentStyles';

export default function StudentLayout() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStudentProfile = async () => {
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

        // Nếu token hết hạn hoặc không hợp lệ -> Xoá sessionStorage
        if (response.status === 401 || response.status === 403) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          navigate('/login');
          return;
        }

        if (!response.ok) {
          throw new Error('Lỗi lấy thông tin người dùng');
        }

        const data = await response.json();
        
        // KIỂM TRA ROLE (Hỗ trợ cả mảng roles hoặc chuỗi role/roleName)
        const roles = data.roles || (data.roleName ? [data.roleName] : (data.role ? [data.role] : []));
        const isTeacher = roles.includes('ROLE_TEACHER') || roles.includes('TEACHER') || roles.includes('GIÁO VIÊN');

        if (isTeacher) {
          // Tự động chuyển về trang Giáo viên nếu tài khoản hiện tại ở Tab này là Giáo viên
          navigate('/teacher/dashboard'); 
          return;
        }

        const primaryRole = roles[0] || 'Học sinh';

        setUserInfo({
          fullName: data.fullName || data.username || data.name || 'Học sinh',
          roleName: primaryRole,
          avatarInitials: (data.fullName || data.username || data.name) 
            ? (data.fullName || data.username || data.name).charAt(0).toUpperCase() 
            : 'HS',
        });

      } catch (error) {
        console.error('Lỗi lấy thông tin học sinh:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStudentProfile();
  }, [navigate]);

  if (isLoading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Đang tải thông tin...</div>;
  }

  return (
    <div style={styles.layoutContainer}>
      <StudentSidebar />
      <div style={styles.mainWrapper}>
        <StudentHeader userInfo={userInfo} />
        <main style={styles.scrollArea}>
          <Outlet context={{ userInfo, setUserInfo }} />
        </main>
      </div>
    </div>
  );
}