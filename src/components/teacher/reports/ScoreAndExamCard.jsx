import React from 'react';
import { reportStyles as styles } from '../../../assets/styles/teacher/reportStyles';

export default function ScoreAndExamCard({ scoreDistribution, recentExams }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardHeaderRow}>
        <div>
          <div style={styles.cardTitle}>🎯 Phân tích phổ điểm & kết quả kỳ thi</div>
          <div style={styles.cardSub}>Tổng quan kết quả các kỳ thi thử gần đây</div>
        </div>
        <a href="#details" style={styles.linkText}>Xem chi tiết →</a>
      </div>

      {/* Filter Sub-bar */}
      <div style={styles.subFilterBar}>
        <div style={styles.filterInlineGroup}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Kỳ thi thử</span>
          <select style={styles.selectSmall}><option>Tất cả</option></select>
        </div>
        <div style={styles.filterInlineGroup}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Môn học</span>
          <select style={styles.selectSmall}><option>Tất cả</option></select>
        </div>
        <div style={styles.filterInlineGroup}>
          <span style={{ fontSize: '11px', color: '#64748b' }}>Khối lớp</span>
          <select style={styles.selectSmall}><option>Tất cả</option></select>
        </div>
      </div>

      <div style={styles.scoreAndTableGrid}>
        {/* Phổ điểm (toàn hệ thống) */}
        <div style={{ flex: '0 0 200px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '12px' }}>
            Phổ điểm <span style={{ fontWeight: 'normal', color: '#64748b', fontSize: '11px' }}>(toàn hệ thống)</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '140px', gap: '12px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0', justifyContent: 'center' }}>
            {scoreDistribution.length === 0 ? (
              <div style={{ color: '#94a3b8', fontSize: '11px', fontStyle: 'italic', height: '100%', display: 'flex', alignItems: 'center' }}>
                Chưa có dữ liệu phổ điểm
              </div>
            ) : (
              scoreDistribution.map((scoreItem, idx) => (
                <div key={idx} style={styles.barCol}>
                  <span style={styles.barVal}>{scoreItem.value}</span>
                  <div style={{ ...styles.barFill, height: `${scoreItem.height || 40}px` }}></div>
                  <span style={styles.barLabel}>{scoreItem.range}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kết quả kỳ thi gần đây Table */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#0f172a', marginBottom: '12px' }}>
            Kết quả kỳ thi gần đây
          </div>
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={styles.th}>Tên kỳ thi</th>
                <th style={styles.th}>Môn học</th>
                <th style={styles.th}>Số thí sinh</th>
                <th style={styles.th}>Điểm TB</th>
                <th style={styles.th}>Tỷ lệ hoàn thành</th>
              </tr>
            </thead>
            <tbody>
              {recentExams.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: '#94a3b8', fontStyle: 'italic' }}>
                    Chưa có dữ liệu kỳ thi gần đây.
                  </td>
                </tr>
              ) : (
                recentExams.map((exam) => (
                  <tr key={exam.id} style={styles.trRow}>
                    <td style={{ ...styles.td, fontWeight: '500', color: '#0f172a' }}>
                      <span style={{ ...styles.miniBadgeIcon, backgroundColor: exam.iconBg || '#eff6ff', color: exam.iconColor || '#2563eb' }}>📝</span>
                      {exam.title}
                    </td>
                    <td style={styles.td}>{exam.subject}</td>
                    <td style={styles.td}>{exam.count}</td>
                    <td style={{ ...styles.td, fontWeight: 'bold' }}>{exam.avg}</td>
                    <td style={{ ...styles.td, color: '#16a34a', fontWeight: '500' }}>{exam.completion}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div style={{ textAlign: 'right', marginTop: '8px' }}>
            <a href="#all" style={styles.linkText}>Xem tất cả →</a>
          </div>
        </div>
      </div>
    </div>
  );
}