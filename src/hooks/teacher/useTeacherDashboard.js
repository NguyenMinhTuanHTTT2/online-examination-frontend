import { useState, useEffect } from 'react';
import { teacherService } from '../../services/teacher/teacherService';

export function useTeacherDashboard() {
  const [user, setUser] = useState({
    fullName: 'Nguyễn Văn Nam',
    role: 'Giáo viên - Content Creator'
  });

  const [dashboardStats, setDashboardStats] = useState({
    totalExams: 0,
    totalQuestions: 0,
    activeExams: 0,
    totalAttempts: 0
  });

  const [featuredExams, setFeaturedExams] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [activityTrend, setActivityTrend] = useState({ dates: [], values: [] });
  const [subjectDistribution, setSubjectDistribution] = useState([]);
  const [currentDateStr, setCurrentDateStr] = useState('');

  useEffect(() => {
    // 1. Ngày tháng
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDateStr(now.toLocaleDateString('vi-VN', options));

    // 2. User từ localStorage
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          fullName: parsedUser.fullName || parsedUser.name || parsedUser.username || 'Nguyễn Văn Nam',
          role: parsedUser.roles ? parsedUser.roles.join(', ') : 'Giáo viên - Content Creator'
        });
      } catch (e) {
        console.error("Lỗi đọc user:", e);
      }
    }

    // 3. Gọi API qua Service
    teacherService.getDashboardData()
      .then(data => {
        if (data) {
          setDashboardStats({
            totalExams: data.totalExams || 0,
            totalQuestions: data.totalQuestions || 0,
            activeExams: data.activeExams || 0,
            totalAttempts: data.totalAttempts || 0
          });
          setFeaturedExams(data.featuredExams || []);
          setRecentActivities(data.recentActivities || []);
          setActivityTrend(data.activityTrend || { dates: [], values: [] });
          setSubjectDistribution(data.subjectDistribution || []);
        }
      })
      .catch(err => console.error("Lỗi tải dashboard giáo viên:", err));
  }, []);

  const getInitials = (name) => {
    if (!name) return 'GV';
    const words = name.trim().split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return {
    user,
    dashboardStats,
    featuredExams,
    recentActivities,
    activityTrend,
    subjectDistribution,
    currentDateStr,
    getInitials
  };
}