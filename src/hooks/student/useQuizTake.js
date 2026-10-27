import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizTakeService, formatAnswersForApi } from '../../services/student/quizTakeService';

export const useQuizTake = (attemptId) => {
  const navigate = useNavigate();

  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
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

  // Lấy dữ liệu bài thi
  const fetchAttemptDetails = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg(null);

      const res = await quizTakeService.getAttemptDetails(attemptId);
      const data = res?.data?.data || res?.data || res;

      if (!data || (!data.questions && !data.quizTitle && !data.id && !data.attemptId)) {
        setErrorMsg('Không tìm thấy dữ liệu lượt thi!');
        return;
      }

      if (Array.isArray(data.questions) && data.questions.length === 0) {
        setErrorMsg('Bài thi này hiện chưa có câu hỏi nào!');
        return;
      }

      if (['COMPLETED', 'SUBMITTED', 'EXPIRED'].includes(data.status)) {
        navigate(`/quiz-result/${attemptId}`);
        return;
      }

      setQuizTitle(data.quizTitle || 'Luyện đề trắc nghiệm');
      setQuestions(data.questions || []);

      if (data.remainingSeconds !== undefined && data.remainingSeconds !== null) {
        setTimeLeft(data.remainingSeconds);
      } else {
        setTimeLeft((data.durationMinutes || 45) * 60);
      }

      // Khôi phục nháp
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
          } else if (typeof parsed === 'object' && parsed !== null) {
            Object.keys(parsed).forEach((k) => {
              const qId = Number(k);
              if (!isNaN(qId)) draftObj[qId] = parsed[k];
            });
          }
        } catch (e) {
          console.error("Lỗi khôi phục nháp:", e);
        }
        setSelectedAnswers(draftObj);
      }
    } catch (err) {
      console.error('Lỗi tải bài thi:', err);
      setErrorMsg('Không thể tải bài thi hoặc lượt thi không tồn tại!');
    } finally {
      setLoading(false);
    }
  }, [attemptId, navigate]);

  useEffect(() => {
    fetchAttemptDetails();
    return () => clearInterval(timerRef.current);
  }, [fetchAttemptDetails]);

  // Đồng hồ đếm ngược (không bắt buộc tự động nộp nếu hết giờ theo yêu cầu học tập linh hoạt, nhưng vẫn đếm để hiển thị)
  useEffect(() => {
    if (loading || errorMsg || timeLeft <= 0 || isFinishedRef.current) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [loading, errorMsg, timeLeft]);

  // Tự động lưu nháp
  const saveDraft = useCallback(async (updatedAnswers) => {
    if (isFinishedRef.current) return;
    try {
      setSavingStatus('Đang lưu...');
      await quizTakeService.autoSaveDraft(attemptId, updatedAnswers, 0);
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

  const executeSubmission = async () => {
    if (isFinishedRef.current) return;
    try {
      isFinishedRef.current = true;
      setIsSubmitting(true);
      if (timerRef.current) clearInterval(timerRef.current);

      const payloadAnswers = formatAnswersForApi(selectedAnswersRef.current);
      await quizTakeService.submitQuiz(attemptId, payloadAnswers);

      navigate(`/quiz-result/${attemptId}`);
    } catch (err) {
      console.error('Lỗi khi nộp bài:', err);
      setIsSubmitting(false);
      setSystemNotice('Nộp bài thất bại hoặc lượt thi đã bị đóng.');
    }
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
    executeSubmission,
  };
};