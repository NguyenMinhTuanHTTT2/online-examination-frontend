import React from 'react';

export default function TipBanner() {
  const bannerStyle = {
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '10px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '4px',
  };

  return (
    <div style={bannerStyle}>
      <span style={{ fontSize: '20px' }}>💡</span>
      <div>
        <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#166534' }}>
          Mẹo làm bài hiệu quả
        </div>
        <div style={{ fontSize: '11px', color: '#15803d', marginTop: '2px' }}>
          Hãy bắt đầu với những câu hỏi dễ trước để tích lũy điểm số và tạo tâm lý tự tin. Đừng quên rà soát lại toàn bộ đáp án trước khi nhấn Nộp bài nhé!
        </div>
      </div>
    </div>
  );
}