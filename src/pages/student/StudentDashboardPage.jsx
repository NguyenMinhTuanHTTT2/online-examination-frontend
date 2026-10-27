import React from 'react';
import { studentStyles as styles } from '../../assets/styles/student/studentStyles';
import { useStudentDashboard } from '../../hooks/student/useStudentDashboard';
import GreetingBanner from '../../components/student/dashboard/GreetingBanner';
import StatsGrid from '../../components/student/dashboard/StatsGrid';
import FeaturedExamCard from '../../components/student/dashboard/FeaturedExamCard';
import PendingExamsCard from '../../components/student/dashboard/PendingExamsCard';
import LearningProgressChart from '../../components/student/dashboard/LearningProgressChart';
import ScoreDistributionChart from '../../components/student/dashboard/ScoreDistributionChart';
import SuggestedExamsCard from '../../components/student/dashboard/SuggestedExamsCard';
import TipBanner from '../../components/student/dashboard/TipBanner';

export default function StudentDashboardPage({ userInfo, setUserInfo }) {
  const {
    loading,
    stats,
    progressData,
    scoreDistribution,
    featuredExam,
    pendingExams,
    suggestedExams,
    progressTimeRange,
    setProgressTimeRange,
  } = useStudentDashboard(setUserInfo);

  if (loading) {
    return <div style={{ padding: '20px', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  }

  return (
    <>
      <GreetingBanner userInfo={userInfo} />
      <StatsGrid stats={stats} />

      <div style={styles.middleGrid}>
        <FeaturedExamCard featuredExam={featuredExam} />
        <PendingExamsCard pendingExams={pendingExams} />
      </div>

      <div style={styles.bottomGrid}>
        <LearningProgressChart
          progressData={progressData}
          progressTimeRange={progressTimeRange}
          setProgressTimeRange={setProgressTimeRange}
        />
        <ScoreDistributionChart
          scoreDistribution={scoreDistribution}
          totalExamsDone={stats.totalExamsDone}
        />
        <SuggestedExamsCard suggestedExams={suggestedExams} />
      </div>

      <TipBanner />
    </>
  );
}