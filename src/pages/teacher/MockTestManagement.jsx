import React from 'react';
import TeacherLayout from '../../components/layouts/TeacherLayout'; // Bọc Layout chung
import { useMockTestManagement } from '../../hooks/teacher/useMockTestManagement';
import { mockTestStyles as styles } from '../../assets/styles/teacher/mockTestStyles';

import MockTestHeader from '../../components/teacher/mockTest/MockTestHeader';
import MockTestFilter from '../../components/teacher/mockTest/MockTestFilter';
import MockTestTable from '../../components/teacher/mockTest/MockTestTable';
import MockTestSidebar from '../../components/teacher/mockTest/MockTestSidebar';
import MockTestForm from '../../components/teacher/mockTest/MockTestForm';

export default function MockTestManagement() {
  const {
    viewMode,
    setViewMode,
    activeTab,
    setActiveTab,
    searchTerm,
    setSearchTerm,
    loading,
    filteredExams,
    stats,
    quizForm,
    setQuizForm,
    quizTypeSelection,
    handleTypeChange,
    handleDeleteExam,
    handleToggleStatus,
    handleOpenEditExam,
    handleOpenCreateExam,
    handleSaveQuizSubmit,
    getExamStatusLabel
  } = useMockTestManagement();

  return (
    <TeacherLayout activeMenu="Đề thi">
      <div style={styles.container}>
        {/* MÀN HÌNH DANH SÁCH ĐỀ THI */}
        {viewMode === 'LIST' && (
          <>
            <div style={styles.mainContent}>
              <MockTestHeader onOpenCreate={handleOpenCreateExam} />

              <MockTestFilter
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                stats={stats}
              />

              <MockTestTable
                filteredExams={filteredExams}
                loading={loading}
                getExamStatusLabel={getExamStatusLabel}
                onToggleStatus={handleToggleStatus}
                onEdit={handleOpenEditExam}
                onDelete={handleDeleteExam}
              />
            </div>

            {/* CỘT PHẢI: THỐNG KÊ NHANH & MẸO (ĐÃ GIỮ NGUYÊN) */}
            <MockTestSidebar stats={stats} />
          </>
        )}

        {/* MÀN HÌNH FORM TẠO MỚI HOẶC SỬA */}
        {(viewMode === 'CREATE' || viewMode === 'EDIT') && (
          <MockTestForm
            viewMode={viewMode}
            quizForm={quizForm}
            setQuizForm={setQuizForm}
            quizTypeSelection={quizTypeSelection}
            handleTypeChange={handleTypeChange}
            onSave={handleSaveQuizSubmit}
            onCancel={() => setViewMode('LIST')}
          />
        )}
      </div>
    </TeacherLayout>
  );
}