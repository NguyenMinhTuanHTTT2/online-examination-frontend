// Từ điển ánh xạ độ khó chuẩn xác giữa Tiếng Việt và Tiếng Anh (Java Enum)
export const DIFFICULTY_MAP = {
  EASY: { label: 'Dễ', value: 'EASY', color: '#16a34a', bg: '#f0fdf4' },
  MEDIUM: { label: 'Trung bình', value: 'MEDIUM', color: '#ea580c', bg: '#fff7ed' },
  HARD: { label: 'Khó', value: 'HARD', color: '#ef4444', bg: '#fef2f2' }
};

export const getDifficultyConfig = (diff) => {
  const normalized = (diff || 'MEDIUM').toUpperCase();
  return DIFFICULTY_MAP[normalized] || DIFFICULTY_MAP.MEDIUM;
};

export const questionBankStyles = {
  container: { backgroundColor: '#f8fafc', fontFamily: "'Inter', sans-serif", minHeight: '100vh', color: '#334155', padding: '16px 20px' },
  mainLayout: { display: 'flex', gap: '20px', maxWidth: '1400px', margin: '0 auto' },
  leftColumn: { flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' },
  rightColumn: { width: '380px', flexShrink: 0 },
  cardBox: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' },
  
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  headerTitleGroup: { display: 'flex', alignItems: 'center', gap: '12px' },
  headerIcon: { width: '40px', height: '40px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' },
  pageTitle: { margin: '0 0 2px 0', fontSize: '18px', fontWeight: 'bold', color: '#0f172a' },
  quizSelectorWrapper: { display: 'flex', alignItems: 'center', gap: '6px' },
  textSubLabel: { fontSize: '11px', color: '#64748b' },
  selectQuizHeader: { padding: '3px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 'bold', color: '#2563eb', backgroundColor: '#fff' },
  
  actionButtonGroup: { display: 'flex', gap: '8px' },
  btnPrimary: { backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '7px 14px', borderRadius: '8px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' },
  btnSecondary: { backgroundColor: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '7px 12px', borderRadius: '8px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' },
  
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' },
  statItem: { backgroundColor: '#f8fafc', padding: '10px 12px', borderRadius: '8px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '10px' },
  statIcon: { width: '32px', height: '32px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' },
  statNum: { fontSize: '16px', fontWeight: 'bold', color: '#0f172a' },
  statLbl: { fontSize: '10px', color: '#64748b' },

  filterHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' },
  filterTitle: { fontWeight: 'bold', fontSize: '12px', color: '#0f172a' },
  btnReset: { background: 'none', border: 'none', fontSize: '11px', color: '#64748b', cursor: 'pointer' },
  filterGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' },
  filterGroup: { display: 'flex', flexDirection: 'column', gap: '3px' },
  label: { fontSize: '11px', fontWeight: '600', color: '#475569' },
  inputControl: { padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box' },
  textareaControl: { padding: '6px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', backgroundColor: '#fff', outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'vertical' },

  tableWrapper: { overflowX: 'auto' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' },
  thRow: { borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' },
  th: { padding: '8px 10px', color: '#64748b', fontWeight: '600' },
  trRow: { borderBottom: '1px solid #f1f5f9', cursor: 'pointer' },
  td: { padding: '9px 10px', color: '#334155' },
  tdContent: { padding: '9px 10px', color: '#0f172a', fontWeight: '500' },
  tdEmpty: { textAlign: 'center', padding: '20px', color: '#64748b' },
  truncateText: { maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  badge: { padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '500', display: 'inline-block' },

  actionIcons: { display: 'flex', gap: '4px', justifyContent: 'center' },
  btnEdit: { border: 'none', background: '#eff6ff', color: '#2563eb', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', fontSize: '11px' },
  btnDel: { border: 'none', background: '#fef2f2', color: '#ef4444', borderRadius: '4px', padding: '4px 6px', cursor: 'pointer', fontSize: '11px' },

  detailCard: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' },
  detailHeader: { borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' },
  detailTitle: { margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#0f172a' },
  metaBox: { display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '11px', color: '#64748b', backgroundColor: '#f8fafc', padding: '8px 10px', borderRadius: '8px', border: '1px solid #f1f5f9' },
  metaRow: { display: 'flex', justifyContent: 'space-between' },
  contentSection: { display: 'flex', flexDirection: 'column', gap: '6px' },
  sectionLabel: { fontSize: '11px', fontWeight: '600', color: '#64748b' },
  mainQuestionText: { fontSize: '13px', fontWeight: '600', color: '#0f172a', lineHeight: '1.4' },
  optionsContainer: { display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' },
  optionCard: { display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', borderRadius: '6px', border: '1px solid #e2e8f0' },
  optionKey: { fontWeight: 'bold', fontSize: '12px', color: '#475569' },
  solutionContent: { backgroundColor: '#f8fafc', padding: '8px 10px', borderRadius: '6px', fontSize: '12px', color: '#334155', border: '1px dashed #cbd5e1' },

  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContainer: { backgroundColor: '#fff', borderRadius: '12px', width: '560px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto', padding: '20px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px', marginBottom: '16px' },
  btnCloseModal: { background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer', color: '#64748b' },
  modalForm: { display: 'flex', flexDirection: 'column', gap: '12px' },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  formRow3: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }
};