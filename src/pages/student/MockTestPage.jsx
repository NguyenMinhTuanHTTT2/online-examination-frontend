import React from 'react';
import { mockTestStyles as styles } from '../../assets/styles/student/mockTestStyles';
import { useMockTests } from '../../hooks/student/useMockTests';

import MockTestBanner from '../../components/student/mocktest/MockTestBanner';
import MockTestFilterBar from '../../components/student/mocktest/MockTestFilterBar';
import MockTestTabs from '../../components/student/mocktest/MockTestTabs';
import MockTestGrid from '../../components/student/mocktest/MockTestGrid';
import MockTestTipBanner from '../../components/student/mocktest/MockTestTipBanner';

export default function MockTestPage() {
  const {
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
  } = useMockTests();

  return (
    <div style={styles.container}>
      <MockTestBanner />

      <MockTestFilterBar
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
      />

      <MockTestTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        counts={counts}
      />

      <MockTestGrid
        mockTests={mockTests}
        loading={loading}
        onStart={handleStartMockTest}
      />

      <MockTestTipBanner
        show={showTip}
        onClose={() => setShowTip(false)}
      />
    </div>
  );
}