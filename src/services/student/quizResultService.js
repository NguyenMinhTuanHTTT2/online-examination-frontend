import axiosClient from '../../api/axiosClient';

export const quizResultService = {
  // Lấy chi tiết kết quả bài thi từ Backend
  getQuizResult: (attemptId) => axiosClient.get(`/attempts/${attemptId}/result`),
};