import React from 'react';
import { practiceStyles as styles } from '../../../assets/styles/student/practiceStyles';

export default function PracticeBanner() {
  return (
    <div style={styles.bannerContainer}>
      <div style={styles.bannerLeft}>
        <div style={styles.bannerIcon}>📘</div>
        <div>
          <h2 style={styles.bannerTitle}>Luyện đề</h2>
          <p style={styles.bannerDesc}>
            Luyện tập theo từng môn học, chủ đề để nắm vững kiến thức và nâng cao kỹ năng làm bài.
          </p>
        </div>
      </div>

      <div style={styles.quoteCard}>
        "Kiến thức là nền tảng, luyện đề là chìa khóa thành công!"
      </div>
    </div>
  );
}