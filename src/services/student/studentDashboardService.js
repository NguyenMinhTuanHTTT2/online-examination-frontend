import axiosClient from '../../api/axiosClient';

export const studentDashboardService = {
  // 1. Lấy thông tin cá nhân học sinh
  getProfile: () => axiosClient.get('/auth/me'),

  // 2. Lấy các chỉ số thống kê (4 ô)
  getStats: () => axiosClient.get('/student/dashboard/stats'),

  // 3. Lấy biểu đồ phân bố điểm số
  getScoreDistribution: () => axiosClient.get('/student/dashboard/score-distribution'),

  // 4. Lấy đề thi nổi bật
  getFeaturedExam: () => axiosClient.get('/student/dashboard/featured-exam'),

  // 5. Lấy danh sách đề thi chưa làm / làm dở
  getPendingExams: () => axiosClient.get('/student/dashboard/pending-exams'),

  // 6. Lấy danh sách đề thi gợi ý
  getSuggestedExams: () => axiosClient.get('/student/dashboard/suggested-exams'),

  // 7. Lấy dữ liệu tiến độ học tập theo phạm vi thời gian
  getProgress: (range) => 
    axiosClient.get(`/student/dashboard/progress?range=${encodeURIComponent(range)}`),
};