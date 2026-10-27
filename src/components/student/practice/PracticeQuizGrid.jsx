import React from 'react';
import PracticeQuizCard from './PracticeQuizCard';
import { practiceStyles as styles } from '../../../assets/styles/student/practiceStyles';

export default function PracticeQuizGrid({
  quizzes = [],
  loading,
  sortBy,
  setSortBy,
  onStart,
}) {
  return (
    <div>
      <div style={styles.sectionHeader}>
        <h3 style={styles.sectionTitle}>
          <span>📘</span> Danh sách đề luyện tập
        </h3>

        <div style={styles.sortBox}>
          <span>Sắp xếp theo</span>
          <select
            style={styles.selectInput}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="NEWEST">Mới nhất</option>
            <option value="POPULAR">Lượt làm nhiều nhất</option>
            <option value="TITLE_ASC">Tên (A-Z)</option>
          </select>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
            Đang tải danh sách đề thi...
          </div>
        ) : quizzes.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>
            Không tìm thấy đề luyện tập phù hợp với bộ lọc!
          </div>
        ) : (
          <div style={styles.grid}>
            {quizzes.map((quiz) => (
              <PracticeQuizCard key={quiz.id} quiz={quiz} onStart={onStart} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}