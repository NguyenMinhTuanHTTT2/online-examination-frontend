import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { practiceService } from '../../services/student/practiceService';

export const usePracticeQuizzes = () => {
  const navigate = useNavigate();

  // State cho bộ lọc
  const [subjects, setSubjects] = useState([]);
  const [topics, setTopics] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [selectedTopic, setSelectedTopic] = useState('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState('ALL');
  const [sortBy, setSortBy] = useState('NEWEST');

  // State danh sách bài thi & trạng thái
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Load danh mục bộ lọc khi component vừa mount lần đầu
  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. Fetch danh sách bài luyện tập khi thay đổi bất kỳ bộ lọc hoặc sắp xếp nào
  useEffect(() => {
    fetchQuizzes();
  }, [selectedSubject, selectedTopic, selectedDifficulty, sortBy]);

  const fetchCategories = async () => {
    try {
      const res = await practiceService.getFilterCategories();
      // Xử lý linh hoạt nếu axiosClient đã trả về thẳng data hoặc qua res.data
      const data = res.data || res;
      if (data) {
        setSubjects(data.subjects || []);
        setTopics(data.topics || []);
        setDifficulties(data.difficulties || []);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh mục lọc:', error);
    }
  };

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const params = {
        subjectId: selectedSubject !== 'ALL' ? selectedSubject : null,
        topicId: selectedTopic !== 'ALL' ? selectedTopic : null,
        difficulty: selectedDifficulty !== 'ALL' ? selectedDifficulty : null,
        sortBy,
      };

      const res = await practiceService.getPracticeQuizzes(params);
      
      // 🛠️ FIX QUAN TRỌNG: Kiểm tra linh hoạt mảng trả về từ res hoặc res.data
      const quizData = Array.isArray(res) ? res : (res.data && Array.isArray(res.data) ? res.data : []);
      
      setQuizzes(quizData);
    } catch (error) {
      console.error('Lỗi chi tiết khi tải danh sách đề luyện tập:', error.response || error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    fetchQuizzes();
  };

  const handleStartPractice = async (quizId) => {
    try {
      const res = await practiceService.startPractice(quizId);
      const data = res.data || res;
      if (data && data.attemptId) {
        navigate(`/quiz-take/${data.attemptId}`);
      }
    } catch (error) {
      console.error('Lỗi khi tạo lượt làm bài:', error);
    }
  };

  return {
    subjects,
    topics,
    difficulties,
    selectedSubject,
    setSelectedSubject,
    selectedTopic,
    setSelectedTopic,
    selectedDifficulty,
    setSelectedDifficulty,
    sortBy,
    setSortBy,
    quizzes,
    loading,
    handleSearch,
    handleStartPractice,
  };
};