import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTestService } from '../../services/student/mockTestService';

export const useMockTests = () => {
  const navigate = useNavigate();

  const [mockTests, setMockTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // State lưu danh sách toàn bộ bài thi để tính số lượng Badge trên Tabs chính xác
  const [allMockTests, setAllMockTests] = useState([]);

  // State bộ lọc
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [activeTab, setActiveTab] = useState('ALL'); // ALL, NOT_STARTED, IN_PROGRESS, COMPLETED
  const [showTip, setShowTip] = useState(true);

  const fetchMockTests = useCallback(async () => {
    setLoading(true);
    try {
      const params = {
        search: searchKeyword || null,
        subjectId: selectedSubject !== 'ALL' ? selectedSubject : null,
        status: activeTab !== 'ALL' ? activeTab : null,
      };

      const res = await mockTestService.getMockTests(params);
      console.log("DƯ LIỆU MOCK TESTS TRẢ VỀ TỪ API:", res);

      // Xử lý linh hoạt cả 2 trường hợp: res là mảng trực tiếp HOẶC bọc trong res.data
      let dataList = [];
      if (Array.isArray(res)) {
        dataList = res;
      } else if (res && Array.isArray(res.data)) {
        dataList = res.data;
      }

      setMockTests(dataList);

      // Nếu đang ở tab ALL, cập nhật mảng tổng để tính toán số lượng Badge trên Tabs
      if (activeTab === 'ALL') {
        setAllMockTests(dataList);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách thi thử:', error);
      setMockTests([]);
    } finally {
      setLoading(false);
    }
  }, [searchKeyword, selectedSubject, activeTab]);

  useEffect(() => {
    fetchMockTests();
  }, [fetchMockTests]);

  const handleStartMockTest = async (examId) => {
    try {
      const res = await mockTestService.startMockTest(examId);
      
      // Xử lý linh hoạt lấy attemptId
      const attemptId = res?.attemptId || res?.data?.attemptId;
      
      if (attemptId) {
        navigate(`/quiz-take/${attemptId}`);
      }
    } catch (error) {
      console.error('Lỗi khi khởi tạo thi thử:', error);
    }
  };

  // Tính toán số lượng từng trạng thái cho các nút Tab
  const sourceForCounts = activeTab === 'ALL' ? mockTests : allMockTests;
  const counts = {
    all: sourceForCounts.length,
    notStarted: sourceForCounts.filter((m) => m.status === 'NOT_STARTED').length,
    inProgress: sourceForCounts.filter((m) => m.status === 'IN_PROGRESS').length,
    completed: sourceForCounts.filter((m) => m.status === 'COMPLETED').length,
  };

  return {
    mockTests,
    loading,
    searchKeyword,
    setSearchKeyword,
    selectedSubject,
    setSelectedSubject,
    activeTab,
    setActiveTab,
    showTip,
    setShowTip,
    counts,
    handleStartMockTest,
  };
};