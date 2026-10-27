import axiosClient from '../../api/axiosClient';

export const questionService = {
  // Lấy danh sách tất cả đề thi
  getQuizzes: async () => {
    const res = await axiosClient.get('/quizzes');
    return Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
  },

  // Lấy danh sách câu hỏi theo ID đề thi
  getQuestionsByQuizId: async (quizId) => {
    const res = await axiosClient.get(`/quizzes/${quizId}/questions`);
    return Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
  },

  // Thêm mới câu hỏi vào đề thi
  createQuestion: async (quizId, payload) => {
    const res = await axiosClient.post(`/quizzes/${quizId}/questions`, payload);
    return res.data;
  },

  // Cập nhật câu hỏi
  updateQuestion: async (quizId, questionId, payload) => {
    const res = await axiosClient.put(`/quizzes/${quizId}/questions/${questionId}`, payload);
    return res.data;
  },

  // Xóa câu hỏi
  deleteQuestion: async (quizId, questionId) => {
    const res = await axiosClient.delete(`/quizzes/${quizId}/questions/${questionId}`);
    return res.data;
  },

  // Import câu hỏi từ file Excel/Word
  importQuestions: async (quizId, file) => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await axiosClient.post(`/quizzes/${quizId}/questions/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }
};