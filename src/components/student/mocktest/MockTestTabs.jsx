import React from 'react';
import { mockTestStyles as styles } from '../../../assets/styles/student/mockTestStyles';

export default function MockTestTabs({ activeTab, setActiveTab, counts }) {
  const tabs = [
    { key: 'ALL', label: `Tất cả đề thi (${counts.all})` },
    { key: 'NOT_STARTED', label: `Chưa làm (${counts.notStarted})` },
    { key: 'IN_PROGRESS', label: `Đang làm (${counts.inProgress})` },
    { key: 'COMPLETED', label: `Đã hoàn thành (${counts.completed})` },
  ];

  return (
    <div style={styles.tabsRow}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...styles.tabBtn,
              ...(isActive ? styles.tabBtnActive : {}),
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}