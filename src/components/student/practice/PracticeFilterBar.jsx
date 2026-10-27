import React from 'react';
import { practiceStyles as styles } from '../../../assets/styles/student/practiceStyles';

export default function PracticeFilterBar({
  subjects = [],
  topics = [],
  difficulties = [],
  selectedSubject,
  setSelectedSubject,
  selectedTopic,
  setSelectedTopic,
  selectedDifficulty,
  setSelectedDifficulty,
  onSearch,
}) {
  return (
    <div style={styles.filterCard}>
      <div style={styles.filterGroup}>
        <label style={styles.filterLabel}>Môn học</label>
        <select
          style={styles.selectInput}
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
        >
          <option value="ALL">Tất cả môn học</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.filterLabel}>Chủ đề</label>
        <select
          style={styles.selectInput}
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
        >
          <option value="ALL">Tất cả chủ đề</option>
          {topics.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      <div style={styles.filterGroup}>
        <label style={styles.filterLabel}>Mức độ</label>
        <select
          style={styles.selectInput}
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
        >
          <option value="ALL">Tất cả mức độ</option>
          <option value="EASY">Dễ</option>
          <option value="MEDIUM">Trung bình</option>
          <option value="HARD">Khó</option>
        </select>
      </div>

      <button style={styles.btnSearch} onClick={onSearch}>
        🔍 Tìm kiếm
      </button>
    </div>
  );
}