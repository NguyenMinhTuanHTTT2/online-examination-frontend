import { useState, useEffect } from 'react';
import { mockTestService } from '../../services/teacher/mockTestService';

export function useMockTestManagement() {
  const [viewMode, setViewMode] = useState('LIST'); // 'LIST', 'CREATE', 'EDIT'
  const [editingExamId, setEditingExamId] = useState(null);
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(false);

  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    code: '',
    status: 'DRAFT',
    settings: {
      durationMinutes: 60,
      passScorePercentage: 50,
      maxAttempts: 1,
      shuffleQuestions: false,
      shuffleAnswers: false,
      showResultImmediately: true,
      allowReview: true,
      startTime: null,
      endTime: null
    }
  });

  const [quizTypeSelection, setQuizTypeSelection] = useState('Đề thi thử');

  // Lấy danh sách đề thi
  const fetchMyQuizzes = async () => {
    try {
      setLoading(true);
      const dataList = await mockTestService.getMyQuizzes();
      setExams(Array.isArray(dataList) ? dataList : []);
    } catch (error) {
      console.error('Lỗi khi tải danh sách đề thi:', error);
      alert('Không thể tải danh sách đề thi. Vui lòng kiểm tra lại quyền đăng nhập!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyQuizzes();
  }, []);

  // Đổi loại đề thi (Thi thử vs Luyện tập)
  const handleTypeChange = (type) => {
    setQuizTypeSelection(type);
    if (type === 'Đề thi thử') {
      setQuizForm(prev => ({
        ...prev,
        settings: { ...prev.settings, durationMinutes: 60, passScorePercentage: 50, maxAttempts: 1 }
      }));
    } else {
      setQuizForm(prev => ({
        ...prev,
        settings: { ...prev.settings, durationMinutes: 0, passScorePercentage: 0, maxAttempts: 999 }
      }));
    }
  };

  // Xóa đề thi
  const handleDeleteExam = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đề thi này không?')) {
      try {
        await mockTestService.deleteQuiz(id);
        alert('Xóa đề thi thành công!');
        fetchMyQuizzes();
      } catch (error) {
        console.error('Lỗi khi xóa đề thi:', error);
        alert('Xóa thất bại. Vui lòng thử lại.');
      }
    }
  };

  // Thay đổi trạng thái nhanh
  const handleToggleStatus = async (e, exam) => {
    if (e) e.stopPropagation();

    const currentStatus = exam.status;
    const newStatus = (currentStatus === 'PUBLISHED') ? 'HIDDEN' : 'PUBLISHED';

    const safeSettings = exam.settings || {
      durationMinutes: 60,
      passScorePercentage: 50,
      maxAttempts: 1,
      shuffleQuestions: false,
      shuffleAnswers: false,
      showResultImmediately: true,
      allowReview: true,
      startTime: null,
      endTime: null
    };

    try {
      // Giữ nguyên quizType hiện tại khi đổi trạng thái nhanh
      const backendQuizType = exam.quizType || ((safeSettings.durationMinutes || 0) === 0 ? 'PRACTICE' : 'MOCK_TEST');

      const updatedPayload = {
        title: exam.title || 'Đề thi chưa đặt tên',
        description: exam.description || '',
        code: exam.code || '',
        status: newStatus,
        quizType: backendQuizType,
        settings: safeSettings
      };

      await mockTestService.updateQuiz(exam.id, updatedPayload);

      setExams(prevExams => 
        prevExams.map(item => item.id === exam.id ? { ...item, status: newStatus, quizType: backendQuizType, settings: safeSettings } : item)
      );
    } catch (error) {
      console.error('Lỗi thay đổi trạng thái:', error);
      alert('Không thể thay đổi trạng thái đề thi. Kiểm tra lại Validation Backend!');
    }
  };

  // Mở form Sửa
  const handleOpenEditExam = (exam) => {
    setEditingExamId(exam.id);
    const s = exam.settings || {};
    
    // Đọc quizType từ backend trả về hoặc dựa vào durationMinutes để chọn đúng tiếng Việt cho dropdown
    const isPracticeType = exam.quizType === 'PRACTICE' || (s.durationMinutes || 0) === 0;

    setQuizTypeSelection(isPracticeType ? 'Luyện tập' : 'Đề thi thử');
    setQuizForm({
      title: exam.title || '',
      description: exam.description || '',
      code: exam.code || '',
      status: exam.status || 'DRAFT',
      settings: {
        durationMinutes: s.durationMinutes ?? 60,
        passScorePercentage: s.passScorePercentage ?? 50,
        maxAttempts: s.maxAttempts ?? 1,
        shuffleQuestions: s.shuffleQuestions ?? false,
        shuffleAnswers: s.shuffleAnswers ?? false,
        showResultImmediately: s.showResultImmediately ?? true,
        allowReview: s.allowReview ?? true,
        startTime: s.startTime ?? null,
        endTime: s.endTime ?? null
      }
    });
    setViewMode('EDIT');
  };

  // Mở form Tạo mới
  const handleOpenCreateExam = () => {
    setEditingExamId(null);
    setQuizTypeSelection('Đề thi thử');
    setQuizForm({
      title: '',
      description: '',
      code: '',
      status: 'DRAFT',
      settings: {
        durationMinutes: 60,
        passScorePercentage: 50,
        maxAttempts: 1,
        shuffleQuestions: false,
        shuffleAnswers: false,
        showResultImmediately: true,
        allowReview: true,
        startTime: null,
        endTime: null
      }
    });
    setViewMode('CREATE');
  };

  // Lưu form (Tạo / Sửa)
  const handleSaveQuizSubmit = async (e, targetStatus) => {
    if (e) e.preventDefault();
    if (!quizForm.title.trim()) {
      alert('Vui lòng nhập tiêu đề đề thi!');
      return;
    }

    // 🛠️ CHUYỂN ĐỔI TIẾNG VIỆT SANG TIẾNG ANH ĐỂ GỬI LÊN BACKEND
    const backendQuizType = (quizTypeSelection === 'Luyện tập') ? 'PRACTICE' : 'MOCK_TEST';

    const payload = { 
      ...quizForm, 
      status: targetStatus,
      quizType: backendQuizType // Đính kèm trường loại đề chuẩn backend
    };

    try {
      if (viewMode === 'EDIT') {
        await mockTestService.updateQuiz(editingExamId, payload);
        alert(targetStatus === 'PUBLISHED' ? 'Cập nhật và xuất bản đề thi thành công!' : 'Đã lưu bản nháp thành công!');
      } else {
        await mockTestService.createQuiz(payload);
        alert(targetStatus === 'PUBLISHED' ? 'Tạo và xuất bản đề thi thành công!' : 'Lưu bản nháp thành công!');
      }

      setViewMode('LIST');
      fetchMyQuizzes();
    } catch (error) {
      console.error('Lỗi khi lưu đề thi:', error);
      alert('Đã xảy ra lỗi khi lưu đề thi. Vui lòng kiểm tra lại!');
    }
  };

  // Helper chuẩn hóa nhãn trạng thái
  const getExamStatusLabel = (exam) => {
    const st = exam.status;
    if (st === 'PUBLISHED' || st === 'Công khai') return 'Công khai';
    if (st === 'DRAFT' || st === 'Nháp') return 'Nháp';
    if (st === 'HIDDEN' || st === 'Ẩn') return 'Ẩn';
    return 'Nháp';
  };

  // Danh sách đề đã qua bộ lọc
  const filteredExams = exams.filter(exam => {
    const statusLabel = getExamStatusLabel(exam);
    const matchesTab = activeTab === 'Tất cả' || statusLabel === activeTab;
    const matchesSearch = (exam.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (exam.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Thống kê số liệu
  const totalCount = exams.length;
  const publicCount = exams.filter(e => getExamStatusLabel(e) === 'Công khai').length;
  const draftCount = exams.filter(e => getExamStatusLabel(e) === 'Nháp').length;
  const hiddenCount = exams.filter(e => getExamStatusLabel(e) === 'Ẩn').length;
  const mockTypeCount = exams.filter(e => e.quizType === 'MOCK_TEST' || ((e.settings?.durationMinutes || 0) > 0 && e.quizType !== 'PRACTICE')).length;
  const practiceTypeCount = totalCount - mockTypeCount;

  return {
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    loading,
    filteredExams,
    stats: { totalCount, publicCount, draftCount, hiddenCount, mockTypeCount, practiceTypeCount },
    quizForm,
    setQuizForm,
    quizTypeSelection,
    handleTypeChange,
    handleDeleteExam,
    handleToggleStatus,
    handleOpenEditExam,
    handleOpenCreateExam,
    handleSaveQuizSubmit,
    getExamStatusLabel
  };
}