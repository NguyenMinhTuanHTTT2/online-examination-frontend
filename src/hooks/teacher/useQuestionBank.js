import { useState, useEffect, useRef } from 'react';
import axiosClient from '../../api/axiosClient';

export const useQuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizId, setCurrentQuizId] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);

  // State Modal Thêm/Sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  const initialFormState = {
    quizId: 1,
    content: '',
    question_type: 'SINGLE_CHOICE',
    scoreWeight: 1,
    difficulty: 'MEDIUM',
    subjectId: 1,
    explanation: '',
    answers: [
      { content: '', isCorrect: true },
      { content: '', isCorrect: false },
      { content: '', isCorrect: false },
      { content: '', isCorrect: false }
    ]
  };

  const [formData, setFormData] = useState(initialFormState);

  // State Bộ lọc
  const [filterDifficulty, setFilterDifficulty] = useState('ALL');
  const [filterType, setFilterType] = useState('ALL');
  const [filterSubject, setFilterSubject] = useState('ALL');

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (currentQuizId) {
      fetchQuestions(currentQuizId);
    }
  }, [currentQuizId]);

  const fetchQuizzes = async () => {
    try {
      const res = await axiosClient.get('/quizzes');
      const quizData = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
      setQuizzes(quizData);
      if (quizData.length > 0) {
        setCurrentQuizId(quizData[0].id);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách đề thi:', error);
      setQuizzes([{ id: 1, title: 'Đề thi mặc định (ID: 1)' }]);
    }
  };

  const fetchQuestions = async (quizId) => {
    try {
      setLoading(true);
      const res = await axiosClient.get(`/quizzes/${quizId}/questions`);
      const data = Array.isArray(res.data) ? res.data : (Array.isArray(res) ? res : []);
      
      setQuestions(data);

      if (data.length > 0) {
        setSelectedQuestionId(data[0].id);
      } else {
        setSelectedQuestionId(null);
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu câu hỏi:', error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setEditingQuestion(null);
    setFormData({ ...initialFormState, quizId: currentQuizId });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (q) => {
    setEditingQuestion(q);
    setFormData({
      quizId: currentQuizId,
      content: q.content || '',
      question_type: q.question_type || 'SINGLE_CHOICE',
      scoreWeight: q.scoreWeight || 1,
      difficulty: (q.difficulty || q.difficultyType || 'MEDIUM').toUpperCase(),
      subjectId: q.subjectId || 1,
      explanation: q.explanation || '',
      answers: q.answers || [
        { content: '', isCorrect: true },
        { content: '', isCorrect: false },
        { content: '', isCorrect: false },
        { content: '', isCorrect: false }
      ]
    });
    setIsModalOpen(true);
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    try {
      const targetQuizId = currentQuizId;
      const payload = { ...formData, quizId: targetQuizId };

      if (editingQuestion) {
        await axiosClient.put(`/quizzes/${targetQuizId}/questions/${editingQuestion.id}`, payload);
        alert('Cập nhật câu hỏi thành công!');
      } else {
        await axiosClient.post(`/quizzes/${targetQuizId}/questions`, payload);
        alert('Thêm câu hỏi mới vào đề thi thành công!');
      }
      setIsModalOpen(false);
      setEditingQuestion(null);
      fetchQuestions(currentQuizId);
    } catch (error) {
      console.error('Lỗi khi lưu câu hỏi:', error);
      const errorMsg = error.response?.data?.message || 'Không tìm thấy đề thi tương ứng trong hệ thống.';
      alert(`Lỗi: ${errorMsg}`);
    }
  };

  const handleDeleteQuestion = async (e, questionId) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc chắn muốn xóa câu hỏi này khỏi hệ thống?')) {
      try {
        await axiosClient.delete(`/quizzes/${currentQuizId}/questions/${questionId}`);
        setQuestions(prev => prev.filter(q => q.id !== questionId));
        if (selectedQuestionId === questionId) {
          const remaining = questions.filter(q => q.id !== questionId);
          setSelectedQuestionId(remaining.length > 0 ? remaining[0].id : null);
        }
      } catch (error) {
        console.error('Lỗi khi xóa câu hỏi:', error);
        alert('Xóa câu hỏi thất bại.');
      }
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);

    try {
      setLoading(true);
      await axiosClient.post(`/quizzes/${currentQuizId}/questions/import`, uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      alert('Import danh sách câu hỏi thành công!');
      fetchQuestions(currentQuizId);
    } catch (error) {
      console.error('Lỗi import file:', error);
      const errorMsg = error.response?.data || 'Vui lòng kiểm tra lại định dạng file Excel.';
      alert(`Import thất bại: ${errorMsg}`);
    } finally {
      setLoading(false);
      e.target.value = null;
    }
  };

  const handleQuestionTypeChange = (newType) => {
    const updatedAnswers = formData.answers.map((ans, idx) => ({
      ...ans,
      isCorrect: newType === 'SINGLE_CHOICE' ? (idx === 0) : ans.isCorrect
    }));
    setFormData({
      ...formData,
      question_type: newType,
      answers: updatedAnswers
    });
  };

  const handleAnswerChange = (index, field, value) => {
    const updatedAnswers = [...formData.answers];
    if (field === 'isCorrect') {
      if (formData.question_type === 'SINGLE_CHOICE') {
        updatedAnswers.forEach((ans, idx) => {
          ans.isCorrect = (idx === index);
        });
      } else {
        updatedAnswers[index].isCorrect = value;
      }
    } else {
      updatedAnswers[index][field] = value;
    }
    setFormData({ ...formData, answers: updatedAnswers });
  };

  const resetFilters = () => {
    setFilterDifficulty('ALL');
    setFilterType('ALL');
    setFilterSubject('ALL');
  };

  const filteredQuestions = questions.filter(q => {
    const qDiff = (q.difficulty || q.difficultyType || 'MEDIUM').toUpperCase();
    const matchDiff = filterDifficulty === 'ALL' || qDiff === filterDifficulty;
    const matchType = filterType === 'ALL' || q.type === filterType || q.question_type === filterType;
    const matchSub = filterSubject === 'ALL' || q.subjectId === Number(filterSubject) || q.subject === filterSubject;
    return matchDiff && matchType && matchSub;
  });

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId) || questions[0] || {
    content: 'Chưa chọn câu hỏi nào hoặc đề thi này chưa có câu hỏi.',
    options: [],
    answers: [],
    solution: '',
    explanation: '',
    subject: '---',
    difficulty: 'MEDIUM',
    type: '---',
  };

  return {
    questions,
    quizzes,
    currentQuizId,
    setCurrentQuizId,
    loading,
    selectedQuestionId,
    setSelectedQuestionId,
    selectedQuestion,
    filteredQuestions,
    isModalOpen,
    setIsModalOpen,
    editingQuestion,
    formData,
    setFormData,
    filterDifficulty,
    setFilterDifficulty,
    filterType,
    setFilterType,
    filterSubject,
    setFilterSubject,
    fileInputRef,
    handleOpenAddModal,
    handleOpenEditModal,
    handleSaveQuestion,
    handleDeleteQuestion,
    handleFileChange,
    handleQuestionTypeChange,
    handleAnswerChange,
    resetFilters
  };
};