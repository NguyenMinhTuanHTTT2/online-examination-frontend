import React from 'react';
import { practiceStyles as styles } from '../../assets/styles/student/practiceStyles';
import { usePracticeQuizzes } from '../../hooks/student/usePracticeQuizzes';

import PracticeBanner from '../../components/student/practice/PracticeBanner';
import PracticeFilterBar from '../../components/student/practice/PracticeFilterBar';
import PracticeQuizGrid from '../../components/student/practice/PracticeQuizGrid';

export default function PracticePage() {
  const {
    subjects,
    topics,
    difficulties,
    selectedSubject,
    setSelectedSubject,
    selectedTopic,
    setSelectedTopic,
    selectedDifficulty,
    setSelectedDifficulty,
    sortBy,
    setSortBy,
    quizzes,
    loading,
    handleSearch,
    handleStartPractice,
  } = usePracticeQuizzes();
console.log("Dữ liệu quizzes nhận được:", quizzes);
  return (
    <div style={styles.container}>
      <PracticeBanner />

      <PracticeFilterBar
        subjects={subjects}
        topics={topics}
        difficulties={difficulties}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
        onSearch={handleSearch}
      />

      <PracticeQuizGrid
        quizzes={quizzes}
        loading={loading}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onStart={handleStartPractice}
      />
    </div>
  );
}