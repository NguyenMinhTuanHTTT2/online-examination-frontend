import axiosClient from '../../api/axiosClient';

export const examService = {
  // Lấy danh sách kỳ thi
  getExams: async () => {
    const response = await axiosClient.get('/exams');
    return Array.isArray(response.data) ? response.data : (Array.isArray(response) ? response : []);
  },

  // Lấy danh sách bộ đề gốc
  getQuizzes: async () => {
    const response = await axiosClient.get('/quizzes');
    return Array.isArray(response) ? response : (response.data || []);
  },

  // Tạo kỳ thi mới
  createExam: async (currentUserId, payload) => {
    const response = await axiosClient.post(`/exams?currentUserId=${currentUserId}`, payload);
    return response.data;
  },

  // Xóa kỳ thi theo ID
  deleteExam: async (id) => {
    const response = await axiosClient.delete(`/exams/${id}`);
    return response.data;
  }
};