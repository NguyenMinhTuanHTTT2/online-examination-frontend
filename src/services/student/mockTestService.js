import axiosClient from '../../api/axiosClient';

export const mockTestService = {
  // Lấy danh sách đề thi thử (có kèm bộ lọc tìm kiếm, môn học, trạng thái)
  getMockTests: (params) => {
    return axiosClient.get('/student/mock-tests', { params });
  },

  // Bắt đầu hoặc tiếp tục một kỳ thi thử
  startMockTest: (examId) => {
    return axiosClient.post(`/student/mock-tests/${examId}/start`);
  },
  // 🎯 LẤY DANH SÁCH MÔN HỌC TỪ SUBJECT CONTROLLER CÓ SẴN
  getSubjects: () => {
    return axiosClient.get('/subjects'); 
  },
};