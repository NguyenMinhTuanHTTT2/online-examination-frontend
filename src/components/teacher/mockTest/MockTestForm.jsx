import React from 'react';

export default function MockTestForm({
  viewMode,
  quizForm,
  setQuizForm,
  quizTypeSelection,
  handleTypeChange,
  onSave,
  onCancel
}) {
  return (
    <div style={{ maxWidth: '750px', margin: '0 auto', background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0, color: '#0f172a', fontSize: '20px' }}>
          {viewMode === 'EDIT' ? '✏️ Chỉnh sửa đề thi' : '➕ Tạo đề thi mới'}
        </h2>
        <button
          onClick={onCancel}
          style={{ background: '#e2e8f0', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}
        >
          ← Quay lại danh sách
        </button>
      </div>

      <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', marginBottom: '6px' }}>Tiêu đề đề thi *</label>
          <input
            type="text"
            value={quizForm.title}
            onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', marginBottom: '6px' }}>Loại đề thi</label>
            <select
              value={quizTypeSelection}
              onChange={(e) => handleTypeChange(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontWeight: 'bold', color: '#2563eb', boxSizing: 'border-box' }}
            >
              <option value="Đề thi thử">🎯 Thi thử (Có giới hạn thời gian)</option>
              <option value="Luyện tập">📘 Luyện tập (Tự do, không giới hạn)</option>
            </select>
          </div>

          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', marginBottom: '6px' }}>Mã vào thi (Code)</label>
            <input
              type="text"
              placeholder="Để trống hệ thống tự sinh"
              value={quizForm.code}
              onChange={(e) => setQuizForm({ ...quizForm, code: e.target.value })}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: '600', fontSize: '13px', marginBottom: '6px' }}>Mô tả</label>
          <textarea
            value={quizForm.description}
            onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', height: '70px', resize: 'vertical', boxSizing: 'border-box' }}
          />
        </div>

        {quizTypeSelection === 'Đề thi thử' ? (
          <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '12px', color: '#334155' }}>⚡ Cấu hình thời gian & điểm số:</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Thời gian (Phút)</label>
                <input
                  type="number"
                  value={quizForm.settings.durationMinutes}
                  onChange={(e) =>
                    setQuizForm({
                      ...quizForm,
                      settings: { ...quizForm.settings, durationMinutes: Number(e.target.value) }
                    })
                  }
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Điểm đạt chuẩn (%)</label>
                <input
                  type="number"
                  value={quizForm.settings.passScorePercentage}
                  onChange={(e) =>
                    setQuizForm({
                      ...quizForm,
                      settings: { ...quizForm.settings, passScorePercentage: Number(e.target.value) }
                    })
                  }
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Số lần làm tối đa</label>
                <input
                  type="number"
                  value={quizForm.settings.maxAttempts}
                  onChange={(e) =>
                    setQuizForm({
                      ...quizForm,
                      settings: { ...quizForm.settings, maxAttempts: Number(e.target.value) }
                    })
                  }
                  style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', boxSizing: 'border-box' }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: '8px', border: '1px solid #bbf7d0', fontSize: '12px', color: '#166534', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ fontWeight: 'bold' }}>💡 Chế độ Luyện tập:</div>
            <div>⏱️ Thời gian: Không giới hạn</div>
            <div>🔄 Số lần làm: Không giới hạn</div>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: '10px 16px', background: '#f1f5f9', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', color: '#475569' }}
          >
            Hủy bỏ
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              onClick={(e) => onSave(e, 'DRAFT')}
              style={{ padding: '10px 16px', background: '#e2e8f0', color: '#334155', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
              title="Lưu lại dưới dạng bản nháp"
            >
              💾 Lưu bản nháp
            </button>
            <button
              type="button"
              onClick={(e) => onSave(e, 'PUBLISHED')}
              style={{ padding: '10px 16px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
              title="Lưu và phát hành ngay"
            >
              🚀 {viewMode === 'EDIT' ? 'Cập nhật & Xuất bản' : 'Xuất bản ngay'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}