import React from 'react';
import { reportStyles as styles } from '../../../assets/styles/teacher/reportStyles';

export default function QuestionQualityCard({ topErrorQuestions, topicDifficulty }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeaderRow}>
        <div>
          <div style={styles.cardTitle}>💡 Phân tích chất lượng câu hỏi</div>
        </div>
      </div>

      {/* Top câu hỏi có tỷ lệ sai cao nhất */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a' }}>Top câu hỏi có tỷ lệ sai cao nhất</span>
          <a href="#all" style={styles.linkText}>Xem tất cả →</a>
        </div>
        <div style={styles.errorQuestionList}>
          {topErrorQuestions.length === 0 ? (
            <div style={{ color: '#94a3b8', fontSize: '12px', fontStyle: 'italic', padding: '8px 0' }}>
              Chưa có dữ liệu câu hỏi tỷ lệ sai cao.
            </div>
          ) : (
            topErrorQuestions.map((item, idx) => (
              <div key={idx} style={styles.errorQuestionItem}>
                <div style={{ display: 'flex', gap: '12px', fontSize: '12px' }}>
                  <span style={{ color: '#64748b', width: '40px' }}>{item.id}</span>
                  <span style={{ color: '#0f172a', fontWeight: '500' }}>{item.topic}</span>
                </div>
                <span style={styles.errorRateBadge}>{item.rate}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Phân tích theo chuyên đề / độ khó */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a' }}>Phân tích theo chuyên đề / độ khó</span>
          <a href="#all" style={styles.linkText}>Xem chi tiết →</a>
        </div>

        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Chuyên đề</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Dễ</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>TB</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Khó</th>
            </tr>
          </thead>
          <tbody>
            {topicDifficulty.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8', fontStyle: 'italic' }}>
                  Chưa có dữ liệu phân tích chuyên đề.
                </td>
              </tr>
            ) : (
              topicDifficulty.map((row, idx) => (
                <tr key={idx} style={styles.trRow}>
                  <td style={{ ...styles.td, fontSize: '11px', color: '#334155' }}>{row.topic}</td>
                  <td style={styles.td}>
                    <div style={styles.progressCell}>
                      <div style={styles.barTrack}>
                        <div style={{ ...styles.barFillGreen, width: `${row.easy}%` }}></div>
                      </div>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{row.easy}%</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.progressCell}>
                      <div style={styles.barTrack}>
                        <div style={{ ...styles.barFillYellow, width: `${row.medium}%` }}></div>
                      </div>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{row.medium}%</span>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.progressCell}>
                      <div style={styles.barTrack}>
                        <div style={{ ...styles.barFillRed, width: `${row.hard}%` }}></div>
                      </div>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{row.hard}%</span>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}