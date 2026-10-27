import React from 'react';
import { studentStyles as styles } from '../../assets/styles/student/studentStyles';

export default function StudentHeader({ userInfo }) {
  return (
    <header style={styles.topNav}>
      <div style={styles.searchWrapper}>
        <span style={{ color: '#94a3b8', marginRight: '8px' }}>🔍</span>
        <input
          type="text"
          placeholder="Tìm kiếm đề thi, câu hỏi, chuyên đề..."
          style={styles.searchInput}
        />
      </div>
      <div style={styles.navRight}>
        <div style={styles.bellBtn}>
          🔔<span style={styles.badgeDot}></span>
        </div>
        <div style={styles.userProfile}>
          <div style={styles.userAvatar}>{userInfo?.avatarInitials || 'HS'}</div>
          <div style={styles.userInfoText}>
            <span style={styles.userName}>{userInfo?.fullName || 'Học sinh'}</span>
            <span style={styles.userRole}>{userInfo?.roleName || 'Học sinh'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}