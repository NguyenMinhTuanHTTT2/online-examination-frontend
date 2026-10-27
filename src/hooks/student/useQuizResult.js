import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizResultService } from '../../services/student/quizResultService';
import axiosClient from '../../api/axiosClient';

export const useQuizResult = (attemptId) => {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filterTab, setFilterTab] = useState('ALL'); // ALL, INCORRECT, CORRECT, UNANSWERED

  const fetchQuizResult = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const res = await quizResultService.getQuizResult(attemptId);
      const data = res?.data?.data || res?.data || res;

      if (!data || typeof data !== 'object') {
        setError('Dữ liệu kết quả không hợp lệ!');
        return;
      }
      setResult(data);
    } catch (err) {
      console.error('Lỗi khi tải kết quả:', err);
      const backendMsg = err.response?.data?.message || err.response?.data;
      setError(typeof backendMsg === 'string' ? backendMsg : 'Không thể tải kết quả bài thi.');
    } finally {
      setLoading(false);
    }
  }, [attemptId]);

  useEffect(() => {
    fetchQuizResult();
  }, [fetchQuizResult]);

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const apiBase = axiosClient.defaults?.baseURL || '';
    const origin = apiBase.replace(/\/api\/?$/, '').replace(/\/$/, '');
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return origin ? `${origin}${cleanPath}` : `http://localhost:8080${cleanPath}`;
  };

  // Lọc danh sách câu hỏi dựa theo tab đang chọn
  const details = result?.details || [];
  const filteredDetails = details.filter((q) => {
    const isCorrect = Boolean(q.isCorrect);
    const rawStudent = q.studentAnswerIds ?? q.studentAnswerId ?? [];
    const studentAnswers = Array.isArray(rawStudent) ? rawStudent : [rawStudent];
    const isUnanswered = studentAnswers.length === 0 || studentAnswers[0] === null || studentAnswers[0] === undefined;

    if (filterTab === 'CORRECT') return isCorrect;
    if (filterTab === 'INCORRECT') return !isCorrect && !isUnanswered;
    if (filterTab === 'UNANSWERED') return isUnanswered;
    return true; // ALL
  });

  return {
    result,
    loading,
    error,
    currentIndex,
    setCurrentIndex,
    filterTab,
    setFilterTab,
    filteredDetails,
    details,
    getImageUrl,
    fetchQuizResult,
    navigate,
  };
};