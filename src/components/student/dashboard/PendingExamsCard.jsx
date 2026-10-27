import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PendingExamsCard({ pendingExams = [] }) {
  const navigate = useNavigate();

  const cardStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  };

  const badgeCount = {
    backgroundColor: '#f1f5f9',
    color: '#475569',
    fontSize: '11px',
    fontWeight: '600',
    padding: '2px 8px',
    borderRadius: '12px',
  };

  const listStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxHeight: '180px',
    overflowY: 'auto',
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 12px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #f1f5f9',
  };

  return (
    <div style={cardStyle}>
      <div>
        <div style={headerStyle}>
          <h4 style={titleStyle}>
            <span>📋</span> Bài thi cần làm
          </h4>
          <span style={badgeCount}>{pendingExams.length} bài</span>
        </div>

        <div style={listStyle}>
          {pendingExams.length === 0 ? (
            <div style={{ fontSize: '12px', color: '#94a3b8', textAlign: 'center', padding: '20px 0' }}>
              Không có bài thi nào sắp tới 🎉
            </div>
          ) : (
            pendingExams.map((exam) => (
              <div key={exam.id} style={itemStyle}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>
                    {exam.title}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    {exam.subject} • {exam.durationMinutes || 45} phút • Hạn: {exam.dueDate || 'Hôm nay'}
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/quiz-take/${exam.id}`)}
                  style={{
                    backgroundColor: '#2563eb',
                    color: '#ffffff',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Làm ngay
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}