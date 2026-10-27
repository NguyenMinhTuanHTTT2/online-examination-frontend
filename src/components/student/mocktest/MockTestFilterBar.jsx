import React, { useState, useEffect } from 'react';
import { mockTestStyles as styles } from '../../../assets/styles/student/mockTestStyles';
import { mockTestService } from '../../../services/student/mockTestService';

export default function MockTestFilterBar({ searchKeyword, setSearchKeyword, selectedSubject, setSelectedSubject }) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Tự động gọi API lấy danh sách môn học động từ Database
    const fetchSubjects = async () => {
      try {
        const res = await mockTestService.getSubjects();
        if (Array.isArray(res.data)) {
          setSubjects(res.data);
        }
      } catch (error) {
        console.error('Lỗi khi tải danh sách môn học:', error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <div style={styles.filterCard}>
      {/* Ô tìm kiếm từ khóa */}
      <div style={styles.searchBox}>
        <span style={{ color: '#94a3b8', marginRight: '8px' }}>🔍</span>
        <input
          type="text"
          placeholder="Tìm đề thi thử..."
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {/* Select lọc theo môn học (Render động từ CSDL) */}
      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        style={styles.selectInput}
      >
        <option value="ALL">Tất cả môn học</option>
        {subjects.map((sub) => (
          <option key={sub.id} value={sub.id}>
            {sub.name}
          </option>
        ))}
      </select>
    </div>
  );
}