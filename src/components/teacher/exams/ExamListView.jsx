import React from 'react';
import { examStyles as styles, getBadgeStyle } from '../../../assets/styles/teacher/examStyles';

export default function ExamListView({
  filteredExams,
  loading,
  totalExams,
  openExams,
  upcomingExams,
  closedExams,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus,
  searchTerm,
  setSearchTerm,
  onNavigateToCreate,
  onDeleteExam
}) {
  return (
    <>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.pageTitle}>🗓️ Quản lý Kỳ thi</h2>
          <p style={styles.pageSub}>Quản lý các kỳ thi thử và hệ thống đề thi trực tuyến.</p>
        </div>
        <button style={styles.btnPrimaryLarge} onClick={onNavigateToCreate}>
          + Tạo kỳ thi mới
        </button>
      </div>

      {/* Thanh Bộ Lọc & Tìm Kiếm */}
      <div style={styles.filterBar}>
        <div style={styles.filterGroup}>
          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Loại kỳ thi</label>
            <select style={styles.selectInput} value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="Tất cả">Tất cả</option>
              <option value="Đề thi thử">Đề thi thử</option>
              <option value="Đề luyện tập">Đề luyện tập</option>
            </select>
          </div>
          <div style={styles.filterItem}>
            <label style={styles.filterLabel}>Trạng thái</label>
            <select style={styles.selectInput} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="Tất cả">Tất cả</option>
              <option value="Đang mở">Đang mở</option>
              <option value="Sắp mở">Sắp mở</option>
              <option value="Đã đóng">Đã đóng</option>
            </select>
          </div>
        </div>
        <div style={styles.searchBox}>
          <span>🔍</span>
          <input 
            type="text" 
            placeholder="Tìm kiếm tên kỳ thi..." 
            style={styles.searchInputTable}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid Thống Kê */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIconBox, backgroundColor: '#eff6ff', color: '#2563eb' }}>📄</div>
          <div>
            <div style={styles.statNumber}>{totalExams}</div>
            <div style={styles.statLabel}>Tổng số kỳ thi</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIconBox, backgroundColor: '#f0fdf4', color: '#16a34a' }}>🟢</div>
          <div>
            <div style={styles.statNumber}>{openExams}</div>
            <div style={styles.statLabel}>Đang mở</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIconBox, backgroundColor: '#fff7ed', color: '#ea580c' }}>⏳</div>
          <div>
            <div style={styles.statNumber}>{upcomingExams}</div>
            <div style={styles.statLabel}>Sắp mở</div>
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={{ ...styles.statIconBox, backgroundColor: '#f1f5f9', color: '#64748b' }}>🔒</div>
          <div>
            <div style={styles.statNumber}>{closedExams}</div>
            <div style={styles.statLabel}>Đã đóng</div>
          </div>
        </div>
      </div>

      {/* Bảng Danh Sách Kỳ Thi */}
      <div style={styles.tableCard}>
        <h3 style={styles.cardSectionTitle}>Danh sách kỳ thi</h3>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>Đang tải dữ liệu...</div>
        ) : filteredExams.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>Không tìm thấy kỳ thi nào phù hợp.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.thRow}>
                <th style={{ ...styles.th, width: '40px' }}>#</th>
                <th style={styles.th}>Tên kỳ thi</th>
                <th style={styles.th}>Nguồn đề gốc</th>
                <th style={styles.th}>Thời lượng</th>
                <th style={styles.th}>Trạng thái</th>
                <th style={{ ...styles.th, textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.map((item, index) => {
                const statusMap = {
                  OPEN: { label: 'Đang mở', type: 'success' },
                  UPCOMING: { label: 'Sắp mở', type: 'warning' },
                  CLOSED: { label: 'Đã đóng', type: 'closed' },
                  DRAFT: { label: 'Bản nháp', type: 'closed' },
                };
                const currentStatus = statusMap[item.status] || { label: item.status, type: 'closed' };

                return (
                  <tr key={item.id} style={styles.trRow}>
                    <td style={styles.td}>{index + 1}</td>
                    <td style={{ ...styles.td, fontWeight: '600', color: '#0f172a' }}>
                      <div>{item.title}</div>
                      <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 'normal' }}>Loại: {item.examType}</div>
                    </td>
                    <td style={styles.td}>{item.quizTitle || 'Chưa gắn đề'}</td>
                    <td style={styles.td}>{item.durationMinutes} phút</td>
                    <td style={styles.td}>
                      <span style={getBadgeStyle(currentStatus.type)}>{currentStatus.label}</span>
                    </td>
                    <td style={{ ...styles.td, textAlign: 'center' }}>
                      <button style={styles.btnActionRed} onClick={() => onDeleteExam(item.id)}>🗑️</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}