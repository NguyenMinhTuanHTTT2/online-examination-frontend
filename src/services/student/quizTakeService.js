import axiosClient from '../../api/axiosClient';

// Hàm chuẩn hóa dữ liệu gửi sang Backend Java (Đã thông minh hơn, chống gọi 2 lần)
export const formatAnswersForApi = (answersInput) => {
  if (!answersInput) return [];

  // Nếu input đã là một mảng (trường hợp bị gọi đúp), trả về luôn không cần format lại
  if (Array.isArray(answersInput)) {
    return answersInput;
  }

  if (typeof answersInput !== 'object') return [];

  return Object.keys(answersInput)
    .map((qId) => Number(qId))
    .filter((qIdNum) => !isNaN(qIdNum) && qIdNum > 0)
    .map((qIdNum) => {
      const rawVal = answersInput[qIdNum] ?? answersInput[String(qIdNum)];
      const idsArray = Array.isArray(rawVal) ? rawVal : [rawVal];

      const cleanIds = idsArray
        .filter((id) => id !== null && id !== undefined && id !== '')
        .map((id) => Number(id))
        .filter((id) => !isNaN(id));

      return {
        questionId: qIdNum,
        selectedAnswerIds: cleanIds,
      };
    });
};

export const quizTakeService = {
  // Lấy chi tiết đề thi và thông tin lượt làm bài
  getAttemptDetails: (attemptId) => axiosClient.get(`/attempts/${attemptId}/take`),

  // Đồng bộ nháp tự động
  autoSaveDraft: (attemptId, answers, violations = 0) =>
    axiosClient.patch(`/attempts/${attemptId}/auto-save`, {
      answers: formatAnswersForApi(answers),
      violations,
    }),

  // Nộp bài chính thức
  submitQuiz: (attemptId, answers) =>
    axiosClient.post(`/attempts/${attemptId}/submit`, {
      answers: formatAnswersForApi(answers),
    }),
};