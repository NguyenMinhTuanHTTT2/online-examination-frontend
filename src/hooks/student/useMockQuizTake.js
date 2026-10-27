import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockQuizTakeService } from '../../services/student/mockQuizTakeService';
import { formatAnswersForApi } from '../../services/student/quizTakeService';

export const useMockQuizTake = (attemptId) => {
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // Bắt buộc cho thi thử
  const [loading, setLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState('Đã đồng bộ');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [systemNotice, setSystemNotice] = useState(null);

  const timerRef = useRef(null);
  const isFinishedRef = useRef(false);
  const selectedAnswersRef = useRef(selectedAnswers);

  useEffect(() => {
    selectedAnswersRef.current = selectedAnswers;
  }, [selectedAnswers]);

  const getQId = useCallback((q) => q?.id || q?.questionId, []);

  // Thực thi nộp bài (dùng chung cho cả thủ công và hết giờ)
  const executeSubmission = useCallback(async (isAuto = false) => {
    if (isFinishedRef.current) return;
    try {
      isFinishedRef.current = true;
      setIsSubmitting(true);
      if (timerRef.current) clearInterval(timerRef.current);

      const payloadAnswers = formatAnswersForApi(selectedAnswersRef.current);
      await mockQuizTakeService.submitMockQuiz(attemptId, payloadAnswers);

      if (isAuto) {
        alert('Đã hết thời gian làm bài! Hệ thống đã tự động nộp bài thi của bạn.');
      }

      navigate(`/quiz-result/${attemptId}`);
    } catch (err) {
      console.error('Lỗi khi nộp bài thi thử:', err);
      setIsSubmitting(false);
      setSystemNotice('Nộp bài thất bại hoặc lượt thi đã được đóng trên hệ thống.');
    }
  }, [attemptId, navigate]);

  // Tải chi tiết bài thi thử
  const fetchAttemptDetails = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await mockQuizTakeService.getMockAttemptDetails(attemptId);
      const data = res?.data?.data || res?.data || res;

      if (!data || (!data.questions && !data.quizTitle)) {
        setErrorMsg('Không tìm thấy dữ liệu lượt thi thử!');
        return;
      }

      if (['COMPLETED', 'SUBMITTED', 'EXPIRED'].includes(data.status)) {
        alert('Lượt thi thử này đã hoàn thành. Chuyển hướng sang trang kết quả.');
        navigate(`/quiz-result/${attemptId}`);
        return;
      }

      setQuizTitle(data.quizTitle || 'Bài Thi Thử');
      setQuestions(data.questions || []);

      // Thiết lập thời gian đếm ngược bắt buộc từ backend
      if (data.remainingSeconds !== undefined && data.remainingSeconds !== null) {
        setTimeLeft(data.remainingSeconds);
      } else {
        setTimeLeft((data.durationMinutes || 60) * 60);
      }

      // Khôi phục nháp nếu có
      if (data.draftAnswers) {
        const draftObj = {};
        try {
          const parsed = typeof data.draftAnswers === 'string' ? JSON.parse(data.draftAnswers) : data.draftAnswers;
          if (Array.isArray(parsed)) {
            parsed.forEach((item) => {
              const qId = item.questionId || item.id;
              const ans = item.selectedAnswerIds || item.selectedOptionId;
              if (qId && ans !== undefined) draftObj[qId] = Array.isArray(ans) ? ans[0] : ans;
            });
          }
        } catch (e) {
          console.error("Lỗi khôi phục nháp:", e);
        }
        setSelectedAnswers(draftObj);
      }
    } catch (err) {
      console.error('Lỗi tải bài thi thử:', err);
      setErrorMsg('Không thể tải bài thi thử hoặc lượt thi không tồn tại!');
    } finally {
      setLoading(false);
    }
  }, [attemptId, navigate]);

  useEffect(() => {
    fetchAttemptDetails();
    return () => clearInterval(timerRef.current);
  }, [fetchAttemptDetails]);

  // Đồng hồ đếm ngược theo thời gian thực & Tự động nộp bài khi hết giờ
  useEffect(() => {
    if (loading || errorMsg || isFinishedRef.current) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          executeSubmission(true); // Tự động nộp khi hết giờ
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [loading, errorMsg, executeSubmission]);

  // Tự động lưu nháp
  const saveDraft = useCallback(async (updatedAnswers) => {
    if (isFinishedRef.current) return;
    try {
      setSavingStatus('Đang lưu...');
      await mockQuizTakeService.autoSaveMockDraft(attemptId, updatedAnswers);
      setSavingStatus('Đã đồng bộ');
    } catch (err) {
      console.error('Lỗi đồng bộ nháp:', err);
      setSavingStatus('Lỗi đồng bộ');
    }
  }, [attemptId]);

  const handleSelectOption = (questionId, optionId) => {
    if (isFinishedRef.current || !questionId) return;
    const updated = { ...selectedAnswers, [questionId]: optionId };
    setSelectedAnswers(updated);
    saveDraft(updated);
  };

  const handleBookmarkToggle = (questionId) => {
    setBookmarkedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  return {
    quizTitle,
    questions,
    selectedAnswers,
    bookmarkedQuestions,
    currentIndex,
    setCurrentIndex,
    timeLeft,
    loading,
    savingStatus,
    isSubmitting,
    errorMsg,
    showSubmitModal,
    setShowSubmitModal,
    systemNotice,
    getQId,
    fetchAttemptDetails,
    handleSelectOption,
    handleBookmarkToggle,
    executeSubmission: () => executeSubmission(false),
  };
};