import axiosClient from '../../api/axiosClient';

export const mockTestService = {
  // Lấy danh sách đề thi của giáo viên
  getMyQuizzes: async (params = { page: 0, size: 50, sortBy: 'createdAt', direction: 'desc' }) => {
    const response = await axiosClient.get('/quizzes/my-quizzes', { params });
    return response.content || response;
  },

  // Tạo đề thi mới
  createQuiz: async (payload) => {
    return await axiosClient.post('/quizzes', payload);
  },

  // Cập nhật đề thi theo ID
  updateQuiz: async (id, payload) => {
    return await axiosClient.put(`/quizzes/${id}`, payload);
  },

  // Xóa đề thi
  deleteQuiz: async (id) => {
    return await axiosClient.delete(`/quizzes/${id}`);
  }
};