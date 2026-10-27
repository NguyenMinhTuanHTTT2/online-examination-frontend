import { useEffect, useState, useRef } from 'react';

export default function useAntiCheat({ maxViolations = 3, onMaxViolationsExceeded }) {
  const [violationCount, setViolationCount] = useState(0);
  const [warningMessage, setWarningMessage] = useState('');
  const countRef = useRef(0);

  const addViolation = (reason) => {
    countRef.current += 1;
    const currentCount = countRef.current;
    setViolationCount(currentCount);

    if (currentCount >= maxViolations) {
      setWarningMessage(`Bạn đã vi phạm quy chế thi ${currentCount}/${maxViolations} lần. Hệ thống tiến hành thu bài tự động!`);
      if (onMaxViolationsExceeded) {
        onMaxViolationsExceeded();
      }
    } else {
      setWarningMessage(`CẢNH BÁO: Phát hiện hành vi [${reason}]! Vi phạm: ${currentCount}/${maxViolations} lần.`);
    }
  };

  useEffect(() => {
    // 1. Phát hiện chuyển Tab / Rời khỏi cửa sổ trình duyệt
    const handleVisibilityChange = () => {
      if (document.hidden) {
        addViolation('Chuyển tab / Rời khỏi màn hình thi');
      }
    };

    const handleWindowBlur = () => {
      // Blur xảy ra khi bấm ra ứng dụng khác (Slack, Zalo, VSCode...)
      addViolation('Rời khỏi ứng dụng thi');
    };

    // 2. Chặn Chuột phải (Context Menu)
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // 3. Chặn Copy, Cut, Paste
    const handleCopyPaste = (e) => {
      e.preventDefault();
    };

    // 4. Chặn phím tắt F12, DevTools, Inspect Element, Ctrl+C, Ctrl+V, Ctrl+U
    const handleKeyDown = (e) => {
      const isF12 = e.key === 'F12';
      const isDevTools = e.ctrlKey && e.shiftKey && ['I', 'i', 'J', 'j', 'C', 'c'].includes(e.key);
      const isViewSource = e.ctrlKey && ['U', 'u'].includes(e.key);
      const isCopyPaste = e.ctrlKey && ['C', 'c', 'V', 'v', 'X', 'x', 'A', 'a'].includes(e.key);

      if (isF12 || isDevTools || isViewSource || isCopyPaste) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Đăng ký Event Listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('cut', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    document.addEventListener('keydown', handleKeyDown);

    // Dọn dẹp Event Listeners khi unmount
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const clearWarning = () => setWarningMessage('');

  return { violationCount, warningMessage, clearWarning };
}