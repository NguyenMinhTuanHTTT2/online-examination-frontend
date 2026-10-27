import React from 'react';
import TeacherLayout from '../../components/layouts/TeacherLayout';
import QuestionDetail from '../../components/questions/QuestionDetail';
import QuestionModal from '../../components/questions/QuestionModal';
import { useQuestionBank } from '../../hooks/teacher/useQuestionBank';
import { questionBankStyles as styles, getDifficultyConfig } from '../../assets/styles/teacher/questionBankStyles';

export default function QuestionBankPage() {
  const {
    questions,
    quizzes,
    currentQuizId,
    setCurrentQuizId,
    loading,
    selectedQuestionId,
    setSelectedQuestionId,
    selectedQuestion,
    filteredQuestions,
    isModalOpen,
    setIsModalOpen,
    editingQuestion,
    formData,
    setFormData,
    filterDifficulty,
    setFilterDifficulty,
    filterType,
    setFilterType,
    filterSubject,
    setFilterSubject,
    fileInputRef,
    handleOpenAddModal,
    handleOpenEditModal,
    handleSaveQuestion,
    handleDeleteQuestion,
    handleFileChange,
    handleQuestionTypeChange,
    handleAnswerChange,
    resetFilters
  } = useQuestionBank();

  return (
    <TeacherLayout activeMenu="Ngân hàng câu hỏi">
      <div style={styles.container}>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".xlsx, .xls, .docx" 
          onChange={handleFileChange}
        />

        <div style={styles.mainLayout}>
          {/* CỘT TRÁI: Quản lý, Thống kê, Bộ lọc & Bảng câu hỏi */}
          <div style={styles.leftColumn}>
            
            <div style={styles.cardBox}>
              <div style={styles.headerRow}>
                <div style={styles.headerTitleGroup}>
                  <div style={styles.headerIcon}>📑</div>
                  <div>
                    <h1 style={styles.pageTitle}>Ngân hàng câu hỏi</h1>
                    <div style={styles.quizSelectorWrapper}>
                      <span style={styles.textSubLabel}>Đang xem đề thi:</span>
                      <select 
                        style={styles.selectQuizHeader}
                        value={currentQuizId}
                        onChange={(e) => setCurrentQuizId(Number(e.target.value))}
                      >
                        {quizzes.map(quiz => (
                          <option key={quiz.id} value={quiz.id}>
                            {quiz.title || `Đề thi #${quiz.id}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div style={styles.actionButtonGroup}>
                  <button style={styles.btnPrimary} onClick={handleOpenAddModal}>
                    + Thêm câu hỏi
                  </button>
                  <button style={styles.btnSecondary} onClick={() => fileInputRef.current.click()}>
                    📤 Import File
                  </button>
                </div>
              </div>

              {/* Thẻ Thống Kê Nhanh */}
              <div style={styles.statsGrid}>
                <div style={styles.statItem}>
                  <div style={{ ...styles.statIcon, backgroundColor: '#eff6ff', color: '#2563eb' }}>📄</div>
                  <div>
                    <div style={styles.statNum}>{questions.length}</div>
                    <div style={styles.statLbl}>Tổng câu hỏi</div>
                  </div>
                </div>
                <div style={styles.statItem}>
                  <div style={{ ...styles.statIcon, backgroundColor: '#f0fdf4', color: '#16a34a' }}>✓</div>
                  <div>
                    <div style={styles.statNum}>
                      {questions.filter(q => q.type === 'Trắc nghiệm' || q.question_type === 'SINGLE_CHOICE' || !q.question_type).length}
                    </div>
                    <div style={styles.statLbl}>Trắc nghiệm</div>
                  </div>
                </div>
                <div style={styles.statItem}>
                  <div style={{ ...styles.statIcon, backgroundColor: '#f3e8ff', color: '#9333ea' }}>≡</div>
                  <div>
                    <div style={styles.statNum}>
                      {questions.filter(q => q.type === 'Tự luận' || q.question_type === 'ESSAY').length}
                    </div>
                    <div style={styles.statLbl}>Tự luận</div>
                  </div>
                </div>
                <div style={styles.statItem}>
                  <div style={{ ...styles.statIcon, backgroundColor: '#fff7ed', color: '#ea580c' }}>⚠️</div>
                  <div>
                    <div style={styles.statNum}>0</div>
                    <div style={styles.statLbl}>Báo lỗi</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bộ Lọc Tinh Gọn */}
            <div style={styles.cardBox}>
              <div style={styles.filterHeader}>
                <span style={styles.filterTitle}>🌪️ Bộ lọc tìm kiếm</span>
                <button style={styles.btnReset} onClick={resetFilters}>
                  🔄 Đặt lại bộ lọc
                </button>
              </div>
              <div style={styles.filterGrid}>
                <div style={styles.filterGroup}>
                  <label style={styles.label}>Môn học</label>
                  <select 
                    style={styles.inputControl}
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                  >
                    <option value="ALL">Tất cả môn học</option>
                    <option value="1">Toán học</option>
                    <option value="2">Vật lý</option>
                    <option value="3">Hóa học</option>
                  </select>
                </div>
                <div style={styles.filterGroup}>
                  <label style={styles.label}>Độ khó</label>
                  <select 
                    style={styles.inputControl}
                    value={filterDifficulty}
                    onChange={(e) => setFilterDifficulty(e.target.value)}
                  >
                    <option value="ALL">Tất cả độ khó</option>
                    <option value="EASY">Dễ</option>
                    <option value="MEDIUM">Trung bình</option>
                    <option value="HARD">Khó</option>
                  </select>
                </div>
                <div style={styles.filterGroup}>
                  <label style={styles.label}>Loại câu hỏi</label>
                  <select 
                    style={styles.inputControl}
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                  >
                    <option value="ALL">Tất cả loại</option>
                    <option value="SINGLE_CHOICE">Trắc nghiệm 1 đáp án</option>
                    <option value="MULTIPLE_CHOICE">Trắc nghiệm nhiều đáp án</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Bảng Danh Sách Câu Hỏi */}
            <div style={styles.cardBox}>
              <div style={styles.tableWrapper}>
                <table style={styles.table}>
                  <thead>
                    <tr style={styles.thRow}>
                      <th style={{ ...styles.th, width: '35px' }}>#</th>
                      <th style={styles.th}>Nội dung câu hỏi</th>
                      <th style={styles.th}>Môn học</th>
                      <th style={styles.th}>Độ khó</th>
                      <th style={styles.th}>Loại</th>
                      <th style={{ ...styles.th, textAlign: 'center' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="6" style={styles.tdEmpty}>Đang tải dữ liệu câu hỏi...</td>
                      </tr>
                    ) : filteredQuestions.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={styles.tdEmpty}>Chưa có câu hỏi nào trong đề thi này.</td>
                      </tr>
                    ) : (
                      filteredQuestions.map((q, idx) => {
                        const diffCfg = getDifficultyConfig(q.difficulty || q.difficultyType);
                        return (
                          <tr
                            key={q.id}
                            onClick={() => setSelectedQuestionId(q.id)}
                            style={{
                              ...styles.trRow,
                              backgroundColor: selectedQuestionId === q.id ? '#f0f7ff' : '#ffffff',
                            }}
                          >
                            <td style={styles.td}>{idx + 1}</td>
                            <td style={styles.tdContent}>
                              <div style={styles.truncateText}>{q.content}</div>
                            </td>
                            <td style={styles.td}>{q.subject || 'Toán học'}</td>
                            <td style={styles.td}>
                              <span style={{ ...styles.badge, backgroundColor: diffCfg.bg, color: diffCfg.color }}>
                                {diffCfg.label}
                              </span>
                            </td>
                            <td style={styles.td}>
                              {q.question_type === 'MULTIPLE_CHOICE' ? 'Nhiều đáp án' : '1 đáp án'}
                            </td>
                            <td style={{ ...styles.td, textAlign: 'center' }} onClick={(e) => e.stopPropagation()}>
                              <div style={styles.actionIcons}>
                                <button style={styles.btnEdit} onClick={() => handleOpenEditModal(q)}>✏️</button>
                                <button style={styles.btnDel} onClick={(e) => handleDeleteQuestion(e, q.id)}>🗑️</button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* CỘT PHẢI: Panel Chi Tiết */}
          <QuestionDetail 
            selectedQuestion={selectedQuestion} 
            currentQuizId={currentQuizId} 
          />
        </div>

        {/* Modal Thêm / Sửa Câu Hỏi */}
        <QuestionModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          editingQuestion={editingQuestion}
          formData={formData}
          setFormData={setFormData}
          quizzes={quizzes}
          handleSaveQuestion={handleSaveQuestion}
          handleQuestionTypeChange={handleQuestionTypeChange}
          handleAnswerChange={handleAnswerChange}
        />
      </div>
    </TeacherLayout>
  );
}