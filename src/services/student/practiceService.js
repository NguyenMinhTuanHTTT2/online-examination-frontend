import axiosClient from '../../api/axiosClient';

export const practiceService = {
  // Lấy các danh mục phục vụ bộ lọc (Môn học, Chủ đề, Mức độ)
  getFilterCategories: () => {
    return axiosClient.get('/student/practice/categories');
  },

  // Lấy danh sách đề luyện tập theo bộ lọc
  getPracticeQuizzes: (params) => {
    // params bao gồm: { subjectId, topicId, difficulty, sortBy, search }
    return axiosClient.get('/student/practice/quizzes', { params });
  },

  // Khởi tạo lượt làm bài tập tự do
  startPractice: (quizId) => {
    return axiosClient.post('/student/practice/start', { quizId });
  },
};