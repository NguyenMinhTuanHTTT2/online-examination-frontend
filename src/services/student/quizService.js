import axiosClient from '../../api/axiosClient';

export const quizService = {
  // Lấy nội dung đề thi để bắt đầu làm bài
  getQuizToTake: (attemptId) => axiosClient.get(`/student/quiz-take/${attemptId}`),

  // Lưu nháp câu trả lời trong quá trình làm bài
  saveDraftAnswer: (attemptId, questionId, selectedOptionId) =>
    axiosClient.post(`/student/quiz-take/${attemptId}/draft`, { questionId, selectedOptionId }),

  // Nộp bài thi
  submitQuiz: (attemptId, answers) =>
    axiosClient.post(`/student/quiz-take/${attemptId}/submit`, { answers }),

  // Lấy kết quả bài thi sau khi nộp
  getQuizResult: (attemptId) => axiosClient.get(`/student/quiz-result/${attemptId}`),
};