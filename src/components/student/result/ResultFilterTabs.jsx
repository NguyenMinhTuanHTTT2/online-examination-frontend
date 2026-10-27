import React from 'react';
import { quizResultStyles as styles } from '../../../assets/styles/student/quizResultStyles';

export default function ResultFilterTabs({ filterTab, setFilterTab, counts }) {
  const tabs = [
    { key: 'ALL', label: `Tất cả câu (${counts.total})` },
    { key: 'INCORRECT', label: `Câu sai (${counts.incorrect})` },
    { key: 'CORRECT', label: `Câu đúng (${counts.correct})` },
    { key: 'UNANSWERED', label: `Câu chưa trả lời (${counts.unanswered})` },
  ];

  return (
    <div style={styles.filterTabsRow}>
      <span style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a', marginRight: '6px' }}>
        📚 Đáp án & lời giải chi tiết
      </span>
      <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
        {tabs.map((tab) => {
          const isActive = filterTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setFilterTab(tab.key)}
              style={{
                ...styles.filterTabBtn,
                ...(isActive ? styles.filterTabActive : {}),
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}