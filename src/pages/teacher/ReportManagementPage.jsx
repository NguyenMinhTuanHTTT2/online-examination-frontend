import React from 'react';
import TeacherLayout from '../../components/layouts/TeacherLayout';

import ReportHeader from '../../components/teacher/reports/ReportHeader';
import OverviewCards from '../../components/teacher/reports/OverviewCards';
import ActivityTrendCard from '../../components/teacher/reports/ActivityTrendCard';
import SubjectDistributionCard from '../../components/teacher/reports/SubjectDistributionCard';
import ScoreAndExamCard from '../../components/teacher/reports/ScoreAndExamCard';
import QuestionQualityCard from '../../components/teacher/reports/QuestionQualityCard';
import { useReportManagement } from '../../hooks/teacher/useReportManagement';
import { reportStyles as styles } from '../../assets/styles/teacher/reportStyles';

export default function ReportManagementPage() {
  const {
    user,
    timeRange,
    setTimeRange,
    customDateRange,
    handleApplyDateRange,
    statsSummary,
    activityData,
    subjectDistribution,
    recentExams,
    topErrorQuestions,
    topicDifficulty,
    scoreDistribution,
    loading
  } = useReportManagement();

  return (
    <TeacherLayout activeMenu="Thống kê & Báo cáo" user={user}>
      <div style={styles.container}>
        <ReportHeader
          user={user}
          customDateRange={customDateRange}
          onApplyDateRange={handleApplyDateRange}
        />

        <OverviewCards statsSummary={statsSummary} />

        <div style={styles.chartGridTwo}>
          <ActivityTrendCard
            activityData={activityData}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            loading={loading}
          />
          <SubjectDistributionCard
            subjectDistribution={subjectDistribution}
            totalStudents={statsSummary?.totalStudents}
          />
        </div>

        <div style={styles.bottomGrid}>
          <ScoreAndExamCard
            scoreDistribution={scoreDistribution}
            recentExams={recentExams}
          />
          <QuestionQualityCard
            topErrorQuestions={topErrorQuestions}
            topicDifficulty={topicDifficulty}
          />
        </div>
      </div>
    </TeacherLayout>
  );
}