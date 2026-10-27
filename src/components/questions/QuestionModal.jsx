import React from 'react';
import { questionBankStyles as styles } from '../../assets/styles/teacher/questionBankStyles';

export default function QuestionModal({
  isOpen,
  onClose,
  editingQuestion,
  formData,
  setFormData,
  quizzes,
  handleSaveQuestion,
  handleQuestionTypeChange,
  handleAnswerChange
}) {
  if (!isOpen) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContainer}>
        <div style={styles.modalHeader}>
          <h3 style={{ margin: 0, fontSize: '16px' }}>
            {editingQuestion ? 'Cập nhật câu hỏi' : 'Thêm câu hỏi mới'}
          </h3>
          <button onClick={onClose} style={styles.btnCloseModal}>✕</button>
        </div>
        
        <form onSubmit={handleSaveQuestion} style={styles.modalForm}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Thuộc đề thi</label>
            <select 
              style={styles.inputControl}
              value={formData.quizId}
              onChange={(e) => setFormData({...formData, quizId: Number(e.target.value)})}
            >
              {quizzes.map(quiz => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.title || `Đề thi #${quiz.id}`}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Loại đáp án câu hỏi</label>
            <div style={{ display: 'flex', gap: '16px', marginTop: '10px', justifyContent: 'space-around' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="modalQType"
                  checked={formData.question_type === 'SINGLE_CHOICE'}
                  onChange={() => handleQuestionTypeChange('SINGLE_CHOICE')}
                />
                <span>Chỉ 1 đáp án đúng duy nhất (Radio)</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="modalQType"
                  checked={formData.question_type === 'MULTIPLE_CHOICE'}
                  onChange={() => handleQuestionTypeChange('MULTIPLE_CHOICE')}
                />
                <span>Nhiều đáp án đúng (Checkbox)</span>
              </label>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Nội dung câu hỏi</label>
            <textarea 
              rows={3} 
              style={styles.textareaControl}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            />
          </div>

          <div style={styles.formRow3}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Môn học</label>
              <select 
                style={styles.inputControl}
                value={formData.subjectId}
                onChange={(e) => setFormData({...formData, subjectId: Number(e.target.value)})}
              >
                <option value={1}>Toán học</option>
                <option value={2}>Vật lý</option>
                <option value={3}>Hóa học</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Độ khó</label>
              <select 
                style={styles.inputControl}
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
              >
                <option value="EASY">Dễ</option>
                <option value="MEDIUM">Trung bình</option>
                <option value="HARD">Khó</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Điểm số</label>
              <input 
                type="number" 
                step="0.01"
                style={styles.inputControl}
                value={formData.scoreWeight}
                onChange={(e) => setFormData({...formData, scoreWeight: Number(e.target.value)})}
              />
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Lời giải chi tiết</label>
            <textarea 
              rows={2} 
              style={styles.textareaControl}
              value={formData.explanation}
              onChange={(e) => setFormData({...formData, explanation: e.target.value})}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Các đáp án</label>
            {formData.answers.map((ans, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                <input 
                  type={formData.question_type === 'SINGLE_CHOICE' ? 'radio' : 'checkbox'}
                  name="correctAnswer"
                  checked={ans.isCorrect}
                  onChange={(e) => handleAnswerChange(idx, 'isCorrect', e.target.checked)}
                />
                <input 
                  type="text"
                  style={styles.inputControl}
                  placeholder={`Đáp án ${String.fromCharCode(65 + idx)}`}
                  value={ans.content}
                  onChange={(e) => handleAnswerChange(idx, 'content', e.target.value)}
                  required
                />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '15px' }}>
            <button type="button" style={styles.btnSecondary} onClick={onClose}>Hủy</button>
            <button type="submit" style={styles.btnPrimary}>Lưu câu hỏi</button>
          </div>
        </form>q
      </div>
    </div>
  );
}