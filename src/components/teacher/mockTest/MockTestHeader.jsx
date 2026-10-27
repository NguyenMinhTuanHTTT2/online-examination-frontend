import React from 'react';
import { mockTestStyles as styles } from '../../../assets/styles/teacher/mockTestStyles';


export default function MockTestHeader({ onOpenCreate }) {
  return (
    <div style={styles.headerRow}>
      <div style={styles.titleBox}>
        <div style={styles.headerIcon}>📝</div>
        <div>
          <h2 style={styles.pageTitle}>Danh sách đề thi</h2>
          <p style={styles.pageSubTitle}>
            Quản lý các đề thi do bạn tạo. Bạn có thể tạo mới, chỉnh sửa, xóa hoặc xuất bản đề thi.
          </p>
        </div>
      </div>
      <button style={styles.createBtn} onClick={onOpenCreate}>
        + Tạo đề thi mới
      </button>
    </div>
  );
}