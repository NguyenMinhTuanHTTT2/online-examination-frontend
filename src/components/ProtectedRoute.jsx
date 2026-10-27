import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, allowedRoles }) {
  // SỬA: Lấy thông tin từ sessionStorage thay vì localStorage
  const token = sessionStorage.getItem('token');
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  // 1. Nếu chưa đăng nhập -> Chuyển hướng ngay về trang Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Kiểm tra quyền dựa trên mảng roles do Backend trả về (user.roles)
  if (allowedRoles && allowedRoles.length > 0) {
    // Lấy mảng roles từ object user (hỗ trợ cả user.roles hoặc user.data.roles)
    const userRoles = user.roles || user.data?.roles || []; 
    
    // Kiểm tra xem người dùng có ít nhất một quyền nằm trong danh sách được phép không
    const hasPermission = allowedRoles.some(role => userRoles.includes(role));

    if (!hasPermission) {
      alert('Bạn không có quyền truy cập vào khu vực này!');
      
      // Nếu là Học sinh cố vào trang Giáo viên -> Về trang Học sinh
      const isStudent = userRoles.includes('ROLE_STUDENT');
      if (isStudent) {
        return <Navigate to="/student/dashboard" replace />;
      }
      
      // Nếu là Giáo viên cố vào trang Học sinh -> Về trang Giáo viên
      const isTeacher = userRoles.includes('ROLE_TEACHER') || userRoles.includes('ROLE_ADMIN');
      if (isTeacher) {
        return <Navigate to="/teacher/dashboard" replace />;
      }

      return <Navigate to="/login" replace />;
    }
  }

  // 3. Hợp lệ -> Cho phép truy cập giao diện con
  return children;
}