import React from 'react';
import TeacherLayout from '../../components/layouts/TeacherLayout';
import ExamListView from '../../components/teacher/exams/ExamListView';
import ExamCreateView from '../../components/teacher/exams/ExamCreateView';
import { useExamManagement } from '../../hooks/teacher/useExamManagement';
import { examStyles as styles } from '../../assets/styles/teacher/examStyles';

export default function ExamManagementPage() {
  const {
    currentView,
    setCurrentView,
    quizList,
    loading,
    formState,
    setFormState,
    filterType,
    setFilterType,
    filterStatus,
    setFilterStatus,
    searchTerm,
    setSearchTerm,
    totalExams,
    openExams,
    upcomingExams,
    closedExams,
    filteredExams,
    handleCreateExam,
    handleDeleteExam
  } = useExamManagement();

  return (
    <TeacherLayout activeMenu="Quản lý Kỳ thi">
      <div style={styles.scrollArea}>
        {currentView === 'LIST' ? (
          <ExamListView 
            filteredExams={filteredExams}
            loading={loading}
            totalExams={totalExams}
            openExams={openExams}
            upcomingExams={upcomingExams}
            closedExams={closedExams}
            filterType={filterType}
            setFilterType={setFilterType}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onNavigateToCreate={() => setCurrentView('CREATE')}
            onDeleteExam={handleDeleteExam}
          />
        ) : (
          <ExamCreateView 
            formState={formState}
            setFormState={setFormState}
            quizList={quizList}
            onBackToList={() => setCurrentView('LIST')}
            onCreateExam={handleCreateExam}
          />
        )}
      </div>
    </TeacherLayout>
  );
}