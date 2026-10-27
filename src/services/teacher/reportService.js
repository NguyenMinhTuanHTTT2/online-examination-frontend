import axiosClient from '../../api/axiosClient';

export const reportService = {
  // Lấy tổng quan số liệu thống kê
  getSummary: async (timeRange) => {
    const res = await axiosClient.get(`/statistics/summary?timeRange=${timeRange}`).catch(() => ({ data: null }));
    return res.data;
  },

  // Lấy dữ liệu biểu đồ hoạt động
  getActivity: async (timeRange) => {
    const res = await axiosClient.get(`/statistics/activity?timeRange=${timeRange}`).catch(() => ({ data: [] }));
    return res.data || [];
  },

  // Lấy dữ liệu phân bổ theo môn học
  getSubjects: async (timeRange) => {
    const res = await axiosClient.get(`/statistics/subjects?timeRange=${timeRange}`).catch(() => ({ data: [] }));
    return res.data || [];
  },

  // Lấy danh sách kết quả kỳ thi gần đây
  getRecentExams: async () => {
    const res = await axiosClient.get('/statistics/recent-exams').catch(() => ({ data: [] }));
    return res.data || [];
  },

  // Lấy top câu hỏi sai nhiều nhất
  getTopErrorQuestions: async () => {
    const res = await axiosClient.get('/statistics/top-error-questions').catch(() => ({ data: [] }));
    return res.data || [];
  },

  // Lấy dữ liệu phân tích chuyên đề / độ khó
  getTopicDifficulty: async () => {
    const res = await axiosClient.get('/statistics/topic-difficulty').catch(() => ({ data: [] }));
    return res.data || [];
  },

  // Lấy dữ liệu phổ điểm
  getScoreDistribution: async () => {
    const res = await axiosClient.get('/statistics/score-distribution').catch(() => ({ data: [] }));
    return res.data || [];
  },

  // Gọi tất cả API đồng thời thông qua Promise.all
  getAllStatistics: async (timeRange) => {
    const [
      summary,
      activity,
      subjects,
      recentExams,
      errorQuestions,
      topicDifficulty,
      scoreDistribution
    ] = await Promise.all([
      reportService.getSummary(timeRange),
      reportService.getActivity(timeRange),
      reportService.getSubjects(timeRange),
      reportService.getRecentExams(),
      reportService.getTopErrorQuestions(),
      reportService.getTopicDifficulty(),
      reportService.getScoreDistribution()
    ]);

    return {
      summary,
      activity,
      subjects,
      recentExams,
      errorQuestions,
      topicDifficulty,
      scoreDistribution
    };
  }
};