import { useState, useEffect } from 'react';
import { examService } from '../../services/teacher/examService';

export const useExamManagement = () => {
  const [currentView, setCurrentView] = useState('LIST');
  const [examList, setExamList] = useState([]);
  const [quizList, setQuizList] = useState([]);
  const [loading, setLoading] = useState(false);

  const initialFormState = {
    title: '[Mock Test] - Đề Toán THPTQG 2026',
    quizId: '',
    examType: 'Đề thi thử',
    durationMinutes: 90,
    status: 'OPEN', 
    sourceType: 'EXISTING', 
    
    // Cấu hình nâng cao
    startTime: '',
    endTime: '',
    accessPassword: '',
    maxAttempts: 1,
    showAnswers: true,
    allowReview: true,
    shuffleQuestions: true,
    shuffleOptions: true,
  };

  const [formState, setFormState] = useState(initialFormState);

  // Bộ lọc & Tìm kiếm
  const [filterType, setFilterType] = useState('Tất cả');
  const [filterSubject, setFilterSubject] = useState('Tất cả');
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const currentUserId = 1;

  useEffect(() => {
    fetchExams();
    fetchQuizzes();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const data = await examService.getExams();
      setExamList(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách kỳ thi:', error);
      setExamList([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuizzes = async () => {
    try {
      const data = await examService.getQuizzes();
      setQuizList(data);
    } catch (error) {
      console.error('Lỗi khi tải danh sách bộ đề gốc:', error);
      setQuizList([]);
    }
  };

  const handleCreateExam = async (statusSubmit = 'OPEN') => {
    if (formState.sourceType === 'EXISTING' && !formState.quizId) {
      alert('Vui lòng chọn bộ đề gốc từ kho!');
      return;
    }

    try {
      const payload = {
        title: formState.title,
        quizId: formState.quizId ? Number(formState.quizId) : null,
        examType: formState.examType,
        durationMinutes: Number(formState.durationMinutes),
        status: statusSubmit,
      };

      await examService.createExam(currentUserId, payload);
      alert(statusSubmit === 'DRAFT' ? 'Đã lưu bản nháp thành công!' : 'Phát hành kỳ thi thành công!');
      
      // Reset form & Chuyển về màn hình danh sách
      setFormState(initialFormState);
      setCurrentView('LIST');
      fetchExams();
    } catch (error) {
      console.error('Lỗi khi tạo kỳ thi:', error);
      alert('Tạo kỳ thi thất bại, vui lòng kiểm tra lại dữ liệu đầu vào.');
    }
  };

  const handleDeleteExam = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa kỳ thi này không?')) {
      try {
        await examService.deleteExam(id);
        setExamList((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error('Lỗi khi xóa kỳ thi:', error);
        alert('Xóa kỳ thi thất bại.');
      }
    }
  };

  // Tính toán Thống kê
  const safeList = Array.isArray(examList) ? examList : [];
  const totalExams = safeList.length;
  const openExams = safeList.filter((item) => item.status === 'OPEN').length;
  const upcomingExams = safeList.filter((item) => item.status === 'UPCOMING').length;
  const closedExams = safeList.filter((item) => item.status === 'CLOSED' || item.status === 'DRAFT').length;

  // Danh sách đã lọc
  const filteredExams = safeList.filter((item) => {
    const matchType = filterType === 'Tất cả' || item.examType === filterType;
    const matchSubject = filterSubject === 'Tất cả' || item.subjectName === filterSubject;
    
    let matchStatus = true;
    if (filterStatus === 'Đang mở') matchStatus = item.status === 'OPEN';
    else if (filterStatus === 'Sắp mở') matchStatus = item.status === 'UPCOMING';
    else if (filterStatus === 'Đã đóng') matchStatus = item.status === 'CLOSED' || item.status === 'DRAFT';

    const matchSearch =
      (item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.quizTitle && item.quizTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchType && matchSubject && matchStatus && matchSearch;
  });

  return {
    currentView,
    setCurrentView,
    examList,
    quizList,
    loading,
    formState,
    setFormState,
    filterType,
    setFilterType,
    filterSubject,
    setFilterSubject,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    totalExams,
    openExams,
    upcomingExams,
    closedExams,
    filteredExams,
    handleCreateExam,
    handleDeleteExam
  };
};