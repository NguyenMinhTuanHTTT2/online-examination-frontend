import React from 'react';
import { useParams } from 'react-router-dom';
import { quizResultStyles as styles } from '../../assets/styles/student/quizResultStyles';
import { useQuizResult } from '../../hooks/student/useQuizResult';

import ResultOverviewBanner from '../../components/student/result/ResultOverviewBanner';
import ResultFilterTabs from '../../components/student/result/ResultFilterTabs';
import ResultQuestionCard from '../../components/student/result/ResultQuestionCard';
import ResultSidebar from '../../components/student/result/ResultSidebar';

export default function QuizResultPage() {
  const { attemptId } = useParams();
  const {
    result,
    loading,
    error,
    currentIndex,
    setCurrentIndex,
    filterTab,
    setFilterTab,
    filteredDetails,
    details,
    getImageUrl,
    navigate,
  } = useQuizResult(attemptId);

  if (loading) {
    return <div style={styles.centerScreen}>Đang tổng hợp kết quả bài thi...</div>;
  }

  if (error || !result) {
    return (
      <div style={styles.centerScreen}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#dc2626', marginBottom: '15px' }}>{error || 'Không tìm thấy kết quả!'}</p>
          <button onClick={() => navigate('/student/practice')} style={styles.primaryBtn}>
            Quay lại Luyện đề
          </button>
        </div>
      </div>
    );
  }

  // Chuẩn hóa dữ liệu hiển thị từ Backend trả về
  // Đảm bảo lấy đúng số lượng câu đúng/sai/bỏ trống từ mảng details hoặc từ object result nếu có sẵn
  const counts = {
    total: details.length,
    correct: result.correctCount !== undefined ? result.correctCount : details.filter((q) => Boolean(q.isCorrect)).length,
    incorrect: result.incorrectCount !== undefined ? result.incorrectCount : details.filter((q) => {
      const isCorrect = Boolean(q.isCorrect);
      const rawStudent = q.studentAnswerIds ?? q.studentAnswerId ?? [];
      const studentAnswers = Array.isArray(rawStudent) ? rawStudent : [rawStudent];
      const isUnanswered = studentAnswers.length === 0 || studentAnswers[0] === null || studentAnswers[0] === undefined;
      return !isCorrect && !isUnanswered;
    }).length,
    unanswered: result.unansweredCount !== undefined ? result.unansweredCount : details.filter((q) => {
      const rawStudent = q.studentAnswerIds ?? q.studentAnswerId ?? [];
      const studentAnswers = Array.isArray(rawStudent) ? rawStudent : [rawStudent];
      return studentAnswers.length === 0 || studentAnswers[0] === null || studentAnswers[0] === undefined;
    }).length,
  };

  const currentQuestionDetail = filteredDetails[currentIndex] || filteredDetails[0];

  // Chuẩn hóa lại object result để component banner hiển thị đúng thang điểm 10 (ví dụ: scoreObtained / 10)
  const normalizedResult = {
    ...result,
    // Nếu backend trả về scoreObtained dạng số nguyên hoặc thập phân, ta hiển thị trực tiếp dạng thập phân / 10
    scoreObtained: result.scoreObtained !== undefined ? result.scoreObtained : 0,
    totalMarks: 10, // Cố định thang điểm 10 theo yêu cầu
    correctCount: counts.correct,
    incorrectCount: counts.incorrect,
    unansweredCount: counts.unanswered,
    totalQuestions: counts.total,
  };

  return (
    <div style={styles.container}>
      <ResultOverviewBanner 
        result={normalizedResult} 
        onBackToPractice={() => navigate('/student/practice')} 
      />

      <div style={styles.mainLayout}>
        <div style={styles.leftContentPane}>
          <ResultFilterTabs
            filterTab={filterTab}
            setFilterTab={(tab) => {
              setFilterTab(tab);
              setCurrentIndex(0);
            }}
            counts={counts}
          />

          <ResultQuestionCard
            questionDetail={currentQuestionDetail}
            globalIndex={details.findIndex(
              (q) => (q.questionId || q.id) === (currentQuestionDetail?.questionId || currentQuestionDetail?.id)
            )}
            totalQuestions={details.length}
            getImageUrl={getImageUrl}
            onPrev={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            onNext={() => setCurrentIndex((prev) => Math.min(filteredDetails.length - 1, prev + 1))}
          />
        </div>

        <ResultSidebar
          details={details}
          currentIndex={details.findIndex(
            (q) => (q.questionId || q.id) === (currentQuestionDetail?.questionId || currentQuestionDetail?.id)
          )}
          onSelectIndex={(idx) => {
            const targetQ = details[idx];
            const filteredIdx = filteredDetails.findIndex(
              (q) => (q.questionId || q.id) === (targetQ?.questionId || targetQ?.id)
            );
            if (filteredIdx !== -1) {
              setCurrentIndex(filteredIdx);
            } else {
              setFilterTab('ALL');
              const newFilteredIdx = details.findIndex(
                (q) => (q.questionId || q.id) === (targetQ?.questionId || targetQ?.id)
              );
              setCurrentIndex(newFilteredIdx);
            }
          }}
          onRetry={() => navigate(`/student/practice`)}
          onBackToDashboard={() => navigate('/student/dashboard')}
        />
      </div>
    </div>
  );
}