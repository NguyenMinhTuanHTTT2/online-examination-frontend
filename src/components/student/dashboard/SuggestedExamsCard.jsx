import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SuggestedExamsCard({ suggestedExams = [] }) {
  const navigate = useNavigate();

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    padding: '16px',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  };

  const titleStyle = {
    margin: 0,
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#0f172a',
  };

  const defaultSuggestions = [
    { id: '101', title: 'Đề thi thử Toán THPT QG 2026 - Đề 01', subject: 'Toán', difficulty: 'Dễ' },
    { id: '102', title: 'Chuyên đề Vật Lý: Sóng cơ & Giao thoa', subject: 'Vật Lý', difficulty: 'Trung bình' },
    { id: '103', title: 'Tổng ôn Tiếng Anh: Ngữ pháp trọng tâm', subject: 'Tiếng Anh', difficulty: 'Nâng cao' },
  ];

  const list = suggestedExams.length > 0 ? suggestedExams : defaultSuggestions;

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        <h4 style={titleStyle}>💡 Gợi ý cho bạn</h4>
        <span style={{ fontSize: '11px', color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}>
          Xem tất cả
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {list.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/quiz-take/${item.id}`)}
            style={{
              padding: '8px 10px',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b' }}>
                {item.title}
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>
                {item.subject} • Độ khó: {item.difficulty}
              </div>
            </div>
            <span style={{ fontSize: '14px', color: '#94a3b8' }}>➔</span>
          </div>
        ))}
      </div>
    </div>
  );
} 