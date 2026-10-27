import React from 'react';
import { examStyles as styles } from '../../../assets/styles/teacher/examStyles';

export default function ToggleSwitch({ checked, onChange }) {
  return (
    <label style={styles.toggleContainer}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
      />
      <span style={{
        ...styles.toggleSlider,
        backgroundColor: checked ? '#2563eb' : '#cbd5e1'
      }}>
        <span style={{
          ...styles.toggleKnob,
          transform: checked ? 'translateX(18px)' : 'translateX(0px)'
        }} />
      </span>
    </label>
  );
}