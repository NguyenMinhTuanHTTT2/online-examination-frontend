import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { quizTakeStyles as styles } from '../../assets/styles/student/quizTakeStyles';
import { useMockQuizTake } from '../../hooks/student/useMockQuizTake';

import QuizTakeHeader from '../../components/student/quiz/QuizTakeHeader';
import QuizTakeContent from '../../components/student/quiz/QuizTakeContent';
import QuizTakeSidebar from '../../components/student/quiz/QuizTakeSidebar';
import SubmitMockConfirmModal from '../../components/student/mocktest/SubmitMockConfirmModal';

export default function MockQuizTakePage() {
  const { attemptId } = useParams();
  const navigate = useNavigate();

  const {
    quizTitle,
    questions,
    selectedAnswers,
    bookmarkedQuestions,
    currentIndex,
    setCurrentIndex,
    timeLeft,
    loading,
    savingStatus,
    isSubmitting,
    errorMsg,
    showSubmitModal,
    setShowSubmitModal,
    systemNotice,
    getQId,
    fetchAttemptDetails,
    handleSelectOption,
    handleBookmarkToggle,
    executeSubmission,
  } = useMockQuizTake(attemptId);

  if (loading) {
    return <div style={styles.centerScreen}>Đang chuẩn bị đề thi thử...</div>;
  }

  if (errorMsg) {
    return (
      <div style={styles.centerScreen}>
        <div style={styles.errorCard}>
          <h2 style={{ color: '#dc2626', marginTop: 0 }}>⚠️ Lỗi tải đề thi thử</h2>
          <p style={{ fontSize: '14px', color: '#475569', margin: '15px 0 25px 0' }}>{errorMsg}</p>
          <button onClick={() => navigate('/student/mock-test')} style={styles.primaryBtn}>
            Quay lại danh sách Thi thử
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const currentQId = currentQuestion ? getQId(currentQuestion) : null;
  const answeredCount = Object.keys(selectedAnswers).filter(
    (k) => selectedAnswers[k] !== undefined && selectedAnswers[k] !== null
  ).length;

  return (
    <div style={styles.container}>
      {systemNotice && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3 style={{ color: '#dc2626', marginTop: 0 }}>Thông báo hệ thống</h3>
            <p style={{ color: '#334155', fontSize: '14px' }}>{systemNotice}</p>
            <button
              onClick={() => navigate(`/quiz-result/${attemptId}`)}
              style={{ ...styles.primaryBtn, width: '100%', marginTop: '10px' }}
            >
              Xem kết quả
            </button>
          </div>
        </div>
      )}

      {showSubmitModal && (
        <SubmitMockConfirmModal
          onClose={() => setShowSubmitModal(false)}
          onConfirm={executeSubmission}
          answeredCount={answeredCount}
          totalCount={questions.length}
        />
      )}

      <QuizTakeHeader
        quizTitle={`[THI THỬ] ${quizTitle}`}
        savingStatus={savingStatus}
        timeLeft={timeLeft}
        currentIndex={currentIndex}
        totalQuestions={questions.length}
      />

      <div style={styles.mainLayout}>
        <QuizTakeContent
          currentQuestion={currentQuestion}
          currentQId={currentQId}
          currentIndex={currentIndex}
          totalQuestions={questions.length}
          selectedAnswers={selectedAnswers}
          isBookmarked={!!bookmarkedQuestions[currentQId]}
          onSelectOption={handleSelectOption}
          onBookmarkToggle={handleBookmarkToggle}
          onPrev={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          onNext={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
          onSubmitClick={() => setShowSubmitModal(true)}
          isSubmitting={isSubmitting}
        />

        <QuizTakeSidebar
          questions={questions}
          selectedAnswers={selectedAnswers}
          bookmarkedQuestions={bookmarkedQuestions}
          currentIndex={currentIndex}
          onSelectIndex={(idx) => setCurrentIndex(idx)}
          getQId={getQId}
          onSubmitClick={() => setShowSubmitModal(true)}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}