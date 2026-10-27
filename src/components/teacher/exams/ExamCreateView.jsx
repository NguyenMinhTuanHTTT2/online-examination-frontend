import React from 'react';
import ToggleSwitch from './ToggleSwitch';
import { examStyles as styles } from '../../../assets/styles/teacher/examStyles';

export default function ExamCreateView({
  formState,
  setFormState,
  quizList,
  onBackToList,
  onCreateExam
}) {
  return (
    <div style={styles.formWrapperContainer}>
      <div style={styles.createHeader}>
        <button style={styles.backBtn} onClick={onBackToList}>← Quay lại</button>
        <h2 style={{ ...styles.pageTitle, margin: 0, fontSize: '18px' }}>Tạo kỳ thi thử mới</h2>
      </div>

      <div style={styles.singleColumnForm}>
        
        {/* PHẦN 1: THÔNG TIN CƠ BẢN */}
        <div style={styles.formCard}>
          <h3 style={styles.formSectionTitle}>📌 1. Thông tin tổng quan kỳ thi</h3>
          
          <div style={{ marginBottom: '14px' }}>
            <label style={styles.inputLabelSub}>Tên kỳ thi *</label>
            <input
              type="text"
              value={formState.title}
              onChange={(e) => setFormState({ ...formState, title: e.target.value })}
              style={styles.textInput}
              placeholder="VD: Kiểm tra giữa kỳ môn Toán 12..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={styles.inputLabelSub}>Thời gian làm bài (phút) *</label>
              <select
                value={formState.durationMinutes}
                onChange={(e) => setFormState({ ...formState, durationMinutes: Number(e.target.value) })}
                style={styles.selectInputFull}
              >
                <option value={90}>90 phút</option>
                <option value={60}>60 phút</option>
                <option value={45}>45 phút</option>
                <option value={15}>15 phút</option>
              </select>
            </div>
            <div>
              <label style={styles.inputLabelSub}>Loại kỳ thi *</label>
              <select 
                value={formState.examType}
                onChange={(e) => setFormState({ ...formState, examType: e.target.value })}
                style={styles.selectInputFull}
              >
                <option value="Đề thi thử">Đề thi thử</option>
                <option value="Đề luyện tập">Đề luyện tập</option>
              </select>
            </div>
          </div>
        </div>

        {/* PHẦN 2: CHỌN NGUỒN ĐỀ THI */}
        <div style={styles.formCard}>
          <h3 style={styles.formSectionTitle}>📂 2. Nguồn nội dung đề thi</h3>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '14px' }}>
            <label style={styles.radioOption}>
              <input
                type="radio"
                name="sourceType"
                checked={formState.sourceType === 'EXISTING'}
                onChange={() => setFormState({ ...formState, sourceType: 'EXISTING' })}
                style={{ accentColor: '#2563eb' }}
              />
              <span style={{ fontWeight: '500' }}>Chọn đề có sẵn từ kho</span>
            </label>

            <label style={styles.radioOption}>
              <input
                type="radio"
                name="sourceType"
                checked={formState.sourceType === 'BANK'}
                onChange={() => setFormState({ ...formState, sourceType: 'BANK' })}
                style={{ accentColor: '#2563eb' }}
              />
              <span style={{ fontWeight: '500' }}>Ngân hàng câu hỏi</span>
            </label>

            <label style={styles.radioOption}>
              <input
                type="radio"
                name="sourceType"
                checked={formState.sourceType === 'UPLOAD'}
                onChange={() => setFormState({ ...formState, sourceType: 'UPLOAD' })}
                style={{ accentColor: '#2563eb' }}
              />
              <span style={{ fontWeight: '500' }}>Tải lên tệp (Word/Excel)</span>
            </label>
          </div>

          {formState.sourceType === 'EXISTING' && (
            <div>
              <label style={styles.inputLabelSub}>Chọn bộ đề gốc đã xuất bản *</label>
              <select
                style={styles.selectInputFull}
                value={formState.quizId}
                onChange={(e) => setFormState({ ...formState, quizId: e.target.value })}
              >
                <option value="">-- Chọn 1 bộ đề gốc --</option>
                {Array.isArray(quizList) && quizList.map((quiz) => (
                  <option key={quiz.id} value={quiz.id}>
                    {quiz.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {formState.sourceType === 'BANK' && (
            <div style={{ padding: '12px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1' }}>
              <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px' }}>Hệ thống tự động bốc ngẫu nhiên câu hỏi theo cấu hình chủ đề.</div>
              <select style={styles.selectInputFull}>
                <option>Chọn Chủ đề / Danh mục câu hỏi...</option>
              </select>
            </div>
          )}

          {formState.sourceType === 'UPLOAD' && (
            <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #2563eb', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', marginBottom: '4px' }}>📁</div>
              <div style={{ fontSize: '12px', color: '#0f172a', fontWeight: '500' }}>Kéo thả file đề thi vào đây hoặc bấm để tải lên (.xlsx, .docx)</div>
            </div>
          )}
        </div>

        {/* PHẦN 3: CẤU HÌNH NÂNG CAO */}
        <div style={styles.formCard}>
          <h3 style={styles.formSectionTitle}>⚙️ 3. Quy chế & Cấu hình nâng cao kỳ thi</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
            <div>
              <label style={styles.inputLabelSub}>Thời gian bắt đầu mở thi</label>
              <input 
                type="datetime-local" 
                style={styles.textInput} 
                value={formState.startTime}
                onChange={(e) => setFormState({...formState, startTime: e.target.value})}
              />
            </div>
            <div>
              <label style={styles.inputLabelSub}>Thời gian kết thúc đóng thi</label>
              <input 
                type="datetime-local" 
                style={styles.textInput} 
                value={formState.endTime}
                onChange={(e) => setFormState({...formState, endTime: e.target.value})}
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={styles.inputLabelSub}>Mật khẩu phòng thi (Tùy chọn - để trống nếu cho phép tất cả vào thi tự do)</label>
            <input 
              type="text" 
              placeholder="VD: EXAM2026..." 
              style={styles.textInput}
              value={formState.accessPassword}
              onChange={(e) => setFormState({...formState, accessPassword: e.target.value})}
            />
          </div>

          <div style={styles.toggleRow}>
            <ToggleSwitch
              checked={formState.showAnswers}
              onChange={(val) => setFormState({ ...formState, showAnswers: val })}
            />
            <div>
              <div style={styles.toggleTitle}>Cho phép xem đáp án ngay sau khi nộp bài</div>
            </div>
          </div>

          <div style={styles.toggleRow}>
            <ToggleSwitch
              checked={formState.allowReview}
              onChange={(val) => setFormState({ ...formState, allowReview: val })}
            />
            <div>
              <div style={styles.toggleTitle}>Cho phép thí sinh xem lại lịch sử chi tiết bài làm</div>
            </div>
          </div>

          <div style={styles.toggleRow}>
            <ToggleSwitch
              checked={formState.shuffleQuestions}
              onChange={(val) => setFormState({ ...formState, shuffleQuestions: val })}
            />
            <div>
              <div style={styles.toggleTitle}>Xáo trộn trật tự câu hỏi cho mỗi thí sinh</div>
            </div>
          </div>
        </div>

        {/* NÚT HÀNH ĐỘNG */}
        <div style={styles.actionRowBtns}>
          <button type="button" style={styles.btnCancelLight} onClick={onBackToList}>
            Hủy bỏ
          </button>
          <button type="button" style={styles.btnDraftOutline} onClick={() => onCreateExam('DRAFT')}>
            Lưu bản nháp
          </button>
          <button type="button" style={styles.btnPublishBlue} onClick={() => onCreateExam('OPEN')}>
            Phát hành kỳ thi ngay
          </button>
        </div>

      </div>
    </div>
  );
}