import React from 'react';
import { mockTestStyles as styles } from '../../../assets/styles/student/mockTestStyles';

export default function MockTestBanner() {
  return (
    <div style={styles.bannerContainer}>
      <div style={styles.bannerLeft}>
        <div style={styles.bannerIcon}>⏰</div>
        <div>
          <h2 style={styles.bannerTitle}>Thi thử</h2>
          <p style={styles.bannerDesc}>
            Chọn đề thi, hoàn thành bài thi trong thời gian quy định và đánh giá kết quả của bạn.
          </p>
        </div>
      </div>

      <div style={styles.quoteCard}>
        "Thi thử hôm nay để vững vàng ngày mai!"
      </div>
    </div>
  );
}