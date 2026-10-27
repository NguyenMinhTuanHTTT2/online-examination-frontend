import React from 'react';
import MockTestCard from './MockTestCard';
import { mockTestStyles as styles } from '../../../assets/styles/student/mockTestStyles';

export default function MockTestGrid({ mockTests = [], loading, onStart }) {
  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>Đang tải danh sách đề thi thử...</div>;
  }

  if (mockTests.length === 0) {
    return <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>Không tìm thấy đề thi thử nào phù hợp!</div>;
  }

  return (
    <div style={styles.grid}>
      {mockTests.map((test) => (
        <MockTestCard key={test.id} test={test} onStart={onStart} />
      ))}
    </div>
  );
}