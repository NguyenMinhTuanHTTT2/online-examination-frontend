import { useState, useEffect } from 'react';
import { studentDashboardService } from '../../services/student/studentDashboardService'; // Đường dẫn tới file service

export const useStudentDashboard = (setUserInfo) => {
  const [loading, setLoading] = useState(true);

  // State lưu 4 chỉ số thống kê
  const [stats, setStats] = useState({
    totalExamsDone: 0,
    avgScore: 0,
    totalStudyHours: 0,
    accuracyRate: 0,
  });

  // State lưu dữ liệu các khối hiển thị
  const [progressData, setProgressData] = useState([]);
  const [scoreDistribution, setScoreDistribution] = useState([]);
  const [featuredExam, setFeaturedExam] = useState(null);
  const [pendingExams, setPendingExams] = useState([]);
  const [suggestedExams, setSuggestedExams] = useState([]);
  const [progressTimeRange, setProgressTimeRange] = useState('7 ngày');

  // Hàm hỗ trợ bóc tách dữ liệu từ Axios
  const getData = (res) => res?.data ?? res;

  // 1. Tải toàn bộ dữ liệu ban đầu cho Dashboard
  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Gọi song song tất cả các API
        const [
          profileRes,
          statsRes,
          distributionRes,
          featuredRes,
          pendingRes,
          suggestedRes,
        ] = await Promise.all([
          studentDashboardService.getProfile().catch(() => null),
          studentDashboardService.getStats().catch(() => null),
          studentDashboardService.getScoreDistribution().catch(() => null),
          studentDashboardService.getFeaturedExam().catch(() => null),
          studentDashboardService.getPendingExams().catch(() => null),
          studentDashboardService.getSuggestedExams().catch(() => null),
        ]);

        if (!isMounted) return;

        // Cập nhật Profile học sinh
        const profileData = getData(profileRes);
        if (profileData && typeof setUserInfo === 'function') {
          setUserInfo(profileData);
        }

        // Cập nhật 4 chỉ số thống kê
        const statsData = getData(statsRes);
        if (statsData) {
          setStats(statsData);
        }

        // Cập nhật biểu đồ phân bố điểm
        const distData = getData(distributionRes);
        if (distData) {
          setScoreDistribution(distData);
        }

        // Cập nhật đề thi nổi bật
        const featData = getData(featuredRes);
        if (featData && Object.keys(featData).length > 0) {
          setFeaturedExam(featData);
        } else {
          setFeaturedExam(null);
        }

        // Cập nhật bài làm dở
        const pendData = getData(pendingRes);
        if (pendData) {
          setPendingExams(pendData);
        }

        // Cập nhật đề thi gợi ý
        const suggData = getData(suggestedRes);
        if (suggData) {
          setSuggestedExams(suggData);
        }

      } catch (error) {
        console.error('Lỗi khi tải dữ liệu Tổng quan học sinh:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, [setUserInfo]);

  // 2. Tải lại biểu đồ tiến độ khi thay đổi mốc thời gian (7 ngày, 30 ngày, 90 ngày)
  useEffect(() => {
    let isMounted = true;

    const fetchProgress = async () => {
      try {
        const res = await studentDashboardService.getProgress(progressTimeRange);
        const data = getData(res);
        if (isMounted && data) {
          setProgressData(data);
        }
      } catch (error) {
        console.error('Lỗi khi tải tiến độ học tập:', error);
      }
    };

    fetchProgress();

    return () => {
      isMounted = false;
    };
  }, [progressTimeRange]);

  return {
    loading,
    stats,
    progressData,
    scoreDistribution,
    featuredExam,
    pendingExams,
    suggestedExams,
    progressTimeRange,
    setProgressTimeRange,
  };
};