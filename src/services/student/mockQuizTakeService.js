import axiosClient from '../../api/axiosClient';
import { formatAnswersForApi } from './quizTakeService';

export const mockQuizTakeService = {
  // Lấy chi tiết đề thi thử
  getMockAttemptDetails: (attemptId) => axiosClient.get(`/student/mock-attempts/${attemptId}/take`),

  // Đồng bộ nháp tự động trong lúc thi thử
  autoSaveMockDraft: (attemptId, answers) =>
    axiosClient.patch(`/student/mock-attempts/${attemptId}/auto-save`, {
      answers: formatAnswersForApi(answers),
    }),

  // Nộp bài thi thử chính thức (Backend phải kiểm tra thời gian và chặn nộp nhiều lần)
  submitMockQuiz: (attemptId, answers) =>
    axiosClient.post(`/student/mock-attempts/${attemptId}/submit`, {
      answers: formatAnswersForApi(answers),
    }),
};