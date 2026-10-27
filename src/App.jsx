import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Public Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Student Layout & Pages
import StudentLayout from './components/layouts/StudentLayout';
import StudentDashboardPage from './pages/student/StudentDashboardPage';
import PracticePage from './pages/student/PracticePage';
import MockTestPage from './pages/student/MockTestPage';
import QuizTakePage from './pages/student/QuizTakePage';
import MockQuizTakePage from './pages/student/MockQuizTakePage';
import QuizResultPage from './pages/student/QuizResultPage';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import MockTestManagement from './pages/teacher/MockTestManagement';
import ExamManagement from './pages/teacher/ExamManagementPage';
import QuestionBank from './pages/teacher/QuestionBankPage';
import ReportManagementPage from './pages/teacher/ReportManagementPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Redirect tuyến đường cũ /dashboard về /student/dashboard */}
        <Route path="/dashboard" element={<Navigate to="/student/dashboard" replace />} />

        {/* ================= KHU VỰC HỌC SINH (Có Sidebar & Header) ================= */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN']}>
              <StudentLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboardPage />} />
          <Route path="practice" element={<PracticePage />} />
          <Route path="mock-test" element={<MockTestPage />} />

          {/* Các nút menu còn lại dùng placeholder tạm thời */}
          <Route path="history" element={<div style={{ padding: 20 }}>Trang Lịch sử & Kết quả</div>} />
          <Route path="saved-questions" element={<div style={{ padding: 20 }}>Trang Câu hỏi đã lưu</div>} />
          <Route path="leaderboard" element={<div style={{ padding: 20 }}>Trang Bảng xếp hạng</div>} />
          <Route path="profile" element={<div style={{ padding: 20 }}>Trang Cài đặt cá nhân</div>} />
        </Route>

        {/* ================= MÀN HÌNH LÀM BÀI LUYỆN ĐỀ ================= */}
        <Route
          path="/quiz-take/:attemptId"
          element={
            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN']}>
              <QuizTakePage />
            </ProtectedRoute>
          }
        />

        {/* ================= MÀN HÌNH LÀM BÀI THI THỬ ================= */}
        <Route
          path="/mock-quiz-take/:attemptId"
          element={
            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN']}>
              <MockQuizTakePage />
            </ProtectedRoute>
          }
        /> 
        {/* ================= MÀN HÌNH KẾT QUẢ & XEM ĐÁP ÁN ================= */}
        <Route
          path="/quiz-result/:attemptId"
          element={
            <ProtectedRoute allowedRoles={['ROLE_STUDENT', 'ROLE_TEACHER', 'ROLE_ADMIN']}>
              <QuizResultPage />
            </ProtectedRoute>
          }
        />

        {/* ================= GIAO DIỆN GIÁO VIÊN (Giữ nguyên) ================= */}
        <Route
          path="/teacher/dashboard"
          element={
            <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/mock-tests"
          element={
            <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
              <MockTestManagement />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/teacher/exams"
          element={
            <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
              <ExamManagement />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/teacher/questions"
          element={
            <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
              <QuestionBank />
            </ProtectedRoute>
          }
        /> 
        <Route
          path="/teacher/reports"
          element={
            <ProtectedRoute allowedRoles={['ROLE_TEACHER', 'ROLE_ADMIN']}>
              <ReportManagementPage />
            </ProtectedRoute>
          }
        /> 

        {/* ================= TRANG 404 ================= */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}