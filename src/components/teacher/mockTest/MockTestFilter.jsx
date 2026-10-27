import React from 'react';
import { mockTestStyles as styles } from '../../../assets/styles/teacher/mockTestStyles';

export default function MockTestFilter({ activeTab, setActiveTab, searchTerm, setSearchTerm, stats }) {
  const tabs = [
    { label: `Tất cả (${stats.totalCount})`, name: 'Tất cả' },
    { label: `Công khai (${stats.publicCount})`, name: 'Công khai' },
    { label: `Nháp (${stats.draftCount})`, name: 'Nháp' },
    { label: `Ẩn (${stats.hiddenCount})`, name: 'Ẩn' }
  ];

  return (
    <div style={styles.filterBarCard}>
      <div style={styles.tabsGroup}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          return (
            <button
              key={tab.name}
              style={isActive ? styles.tabActive : styles.tabInactive}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div style={styles.searchAndFilterRight}>
        <div style={styles.searchBox}>
          <span style={{ color: '#94a3b8', marginRight: '6px' }}>🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm đề thi..."
            style={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button style={styles.filterDropdownBtn}>
          ⚙️ Bộ lọc ∨
        </button>
      </div>
    </div>
  );
}