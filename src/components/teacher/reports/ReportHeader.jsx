import React, { useState, useRef, useEffect } from 'react';
import { reportStyles as styles } from '../../../assets/styles/teacher/reportStyles';

export default function ReportHeader({ user, customDateRange, onApplyDateRange }) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(customDateRange.startDate);
  const [tempEndDate, setTempEndDate] = useState(customDateRange.endDate);
  const [activePreset, setActivePreset] = useState('7_DAYS');
  const popoverRef = useRef(null);

  // Đóng Popover lịch khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPickerOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Chuyển đổi định dạng YYYY-MM-DD sang DD/MM/YYYY để hiển thị
  const formatDisplay = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  // Chọn nhanh các mốc khoảng thời gian
  const handleSelectPreset = (presetKey) => {
    setActivePreset(presetKey);
    const end = new Date();
    const start = new Date();

    if (presetKey === '7_DAYS') {
      start.setDate(end.getDate() - 7);
    } else if (presetKey === '30_DAYS') {
      start.setDate(end.getDate() - 30);
    } else if (presetKey === 'THIS_MONTH') {
      start.setDate(1);
    }

    setTempStartDate(start.toISOString().split('T')[0]);
    setTempEndDate(end.toISOString().split('T')[0]);
  };

  // Áp dụng khoảng thời gian đã chọn
  const handleApply = () => {
    onApplyDateRange(tempStartDate, tempEndDate);
    setIsPickerOpen(false);
  };

  return (
    <div style={styles.headerRow}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={styles.headerIcon}>📊</div>
        <div>
          <h1 style={styles.pageTitle}>
            Thống kê & Báo cáo {user?.fullName ? `• ${user.fullName}` : ''}
          </h1>
          <p style={styles.pageSub}>
            Tổng quan và phân tích chi tiết về hoạt động học tập, kết quả thi và chất lượng câu hỏi.
          </p>
        </div>
      </div>

      {/* Interactive Date Range Picker */}
      <div style={styles.datePickerWrapper} ref={popoverRef}>
        <button
          style={styles.datePickerBtn}
          onClick={() => setIsPickerOpen(!isPickerOpen)}
        >
          <span>📅 {formatDisplay(customDateRange.startDate)} - {formatDisplay(customDateRange.endDate)}</span>
          <span style={{ fontSize: '10px', color: '#64748b' }}>▼</span>
        </button>

        {isPickerOpen && (
          <div style={styles.datePopover}>
            <div style={styles.popoverTitle}>Chọn khoảng thời gian</div>

            {/* Các tùy chọn chọn nhanh */}
            <div style={styles.presetList}>
              <button
                style={activePreset === '7_DAYS' ? styles.presetBtnActive : styles.presetBtn}
                onClick={() => handleSelectPreset('7_DAYS')}
              >
                7 ngày qua
              </button>
              <button
                style={activePreset === '30_DAYS' ? styles.presetBtnActive : styles.presetBtn}
                onClick={() => handleSelectPreset('30_DAYS')}
              >
                30 ngày qua
              </button>
              <button
                style={activePreset === 'THIS_MONTH' ? styles.presetBtnActive : styles.presetBtn}
                onClick={() => handleSelectPreset('THIS_MONTH')}
              >
                Tháng này
              </button>
            </div>

            {/* Khung nhập khoảng ngày */}
            <div style={styles.dateInputGroup}>
              <div>
                <span style={styles.inputLabel}>Từ ngày</span>
                <input
                  type="date"
                  value={tempStartDate}
                  onChange={(e) => {
                    setTempStartDate(e.target.value);
                    setActivePreset('CUSTOM');
                  }}
                  style={styles.dateInput}
                />
              </div>
              <div>
                <span style={styles.inputLabel}>Đến ngày</span>
                <input
                  type="date"
                  value={tempEndDate}
                  onChange={(e) => {
                    setTempEndDate(e.target.value);
                    setActivePreset('CUSTOM');
                  }}
                  style={styles.dateInput}
                />
              </div>
            </div>

            {/* Nút thao tác */}
            <div style={styles.popoverActions}>
              <button
                style={styles.cancelBtn}
                onClick={() => setIsPickerOpen(false)}
              >
                Hủy
              </button>
              <button
                style={styles.applyBtn}
                onClick={handleApply}
              >
                Áp dụng
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}