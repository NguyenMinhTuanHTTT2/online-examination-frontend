import React from 'react';
import { mockTestStyles as styles } from '../../../assets/styles/teacher/mockTestStyles';

export default function MockTestTable({
  filteredExams,
  loading,
  getExamStatusLabel,
  onToggleStatus,
  onEdit,
  onDelete
}) {
  return (
    <div style={styles.tableCard}>
      {loading ? (
        <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
          Đang tải dữ liệu từ cơ sở dữ liệu...
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={{ ...styles.th, width: '40px', textAlign: 'center' }}>#</th>
              <th style={styles.th}>Tên đề thi</th>
              <th style={styles.th}>Loại đề</th>
              <th style={styles.th}>Thời gian</th>
              <th style={styles.th}>Mã Code</th>
              <th style={styles.th}>Trạng thái (Bật/Tắt)</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.map((exam, index) => {
              const statusLabel = getExamStatusLabel(exam);
              const isMock = (exam.settings?.durationMinutes || 0) > 0;
              const isPublished = exam.status === 'PUBLISHED';

              return (
                <tr key={exam.id} style={styles.tr}>
                  <td style={{ ...styles.td, textAlign: 'center', color: '#64748b', fontWeight: '500' }}>
                    {index + 1}
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ ...styles.subjectIconBox, backgroundColor: '#eff6ff', color: '#2563eb' }}>
                        📐
                      </div>
                      <div>
                        <div style={styles.examTitleText}>{exam.title}</div>
                        <div style={styles.examDescText}>{exam.description || 'Không có mô tả'}</div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <span style={isMock ? styles.typeMockTag : styles.typePracticeTag}>
                      {isMock ? 'Đề thi thử' : 'Luyện tập'}
                    </span>
                  </td>
                  <td style={{ ...styles.td, color: '#475569', fontSize: '13px' }}>
                    {isMock ? `${exam.settings?.durationMinutes} phút` : 'Không giới hạn'}
                  </td>
                  <td style={{ ...styles.td, fontFamily: 'monospace', fontWeight: 'bold', color: '#2563eb', fontSize: '13px' }}>
                    {exam.code || 'N/A'}
                  </td>
                  <td style={styles.td} onClick={(e) => e.stopPropagation()}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <label style={styles.switchContainer} title="Bật để Công khai, Tắt để Ẩn đề thi">
                        <input
                          type="checkbox"
                          checked={isPublished}
                          onChange={(e) => onToggleStatus(e, exam)}
                          style={styles.switchInput}
                        />
                        <span style={isPublished ? styles.switchSliderActive : styles.switchSliderInactive}>
                          <span style={isPublished ? styles.switchHandleActive : styles.switchHandle}></span>
                        </span>
                      </label>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: '600',
                          padding: '2px 8px',
                          borderRadius: '12px',
                          backgroundColor: statusLabel === 'Công khai' ? '#dcfce7' : statusLabel === 'Nháp' ? '#fef3c7' : '#f1f5f9',
                          color: statusLabel === 'Công khai' ? '#16a34a' : statusLabel === 'Nháp' ? '#d97706' : '#64748b'
                        }}
                      >
                        {statusLabel}
                      </span>
                    </div>
                  </td>
                  <td style={{ ...styles.td, textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '6px' }}>
                      <button style={styles.btnEdit} onClick={() => onEdit(exam)} title="Chỉnh sửa">
                        ✏️
                      </button>
                      <button style={styles.btnDelete} onClick={() => onDelete(exam.id)} title="Xóa">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
            {filteredExams.length === 0 && !loading && (
              <tr>
                <td colSpan="7" style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
                  Không tìm thấy đề thi nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div style={styles.paginationRow}>
        <div style={{ fontSize: '12px', color: '#64748b' }}>
          Hiển thị tổng số {filteredExams.length} đề thi
        </div>
      </div>
    </div>
  );
}