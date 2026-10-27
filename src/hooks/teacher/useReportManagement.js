import { useState, useEffect } from 'react';
import { reportService } from '../../services/teacher/reportService';

export const useReportManagement = () => {
  const [timeRange, setTimeRange] = useState('7_DAYS'); // '7_DAYS', '30_DAYS', '90_DAYS'
  
  // Quản lý thông tin khoảng ngày tuỳ chỉnh
  const [customDateRange, setCustomDateRange] = useState(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0]
    };
  });

  // Thông tin người dùng đang đăng nhập
  const [user, setUser] = useState({ fullName: '', role: '' });

  const [statsSummary, setStatsSummary] = useState(null);
  const [activityData, setActivityData] = useState([]);
  const [subjectDistribution, setSubjectDistribution] = useState([]);
  const [recentExams, setRecentExams] = useState([]);
  const [topErrorQuestions, setTopErrorQuestions] = useState([]);
  const [topicDifficulty, setTopicDifficulty] = useState([]);
  const [scoreDistribution, setScoreDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu tài khoản người dùng đăng nhập từ localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user') || localStorage.getItem('userInfo');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          fullName: parsedUser.fullName || parsedUser.name || parsedUser.username || 'Giáo viên',
          role: parsedUser.role || 'Giáo viên - Content Creator'
        });
      } else {
        setUser({ fullName: 'Giáo viên', role: 'Giáo viên' });
      }
    } catch (error) {
      console.error('Lỗi khi đọc thông tin người dùng từ localStorage:', error);
      setUser({ fullName: 'Giáo viên', role: 'Giáo viên' });
    }
  }, []);

  // Gọi API lấy dữ liệu thống kê
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const data = await reportService.getAllStatistics(timeRange);

        setStatsSummary(data.summary);
        setActivityData(data.activity);
        setSubjectDistribution(data.subjects);
        setRecentExams(data.recentExams);
        setTopErrorQuestions(data.errorQuestions);
        setTopicDifficulty(data.topicDifficulty);
        setScoreDistribution(data.scoreDistribution);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu thống kê:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [timeRange, customDateRange]);

  // Cập nhật khoảng ngày từ Bộ chọn thời gian
  const handleApplyDateRange = (startDate, endDate) => {
    setCustomDateRange({ startDate, endDate });
  };

  return {
    user,
    timeRange,
    setTimeRange,
    customDateRange,
    handleApplyDateRange,
    statsSummary,
    activityData,
    subjectDistribution,
    recentExams,
    topErrorQuestions,
    topicDifficulty,
    scoreDistribution,
    loading
  };
};