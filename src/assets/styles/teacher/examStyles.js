export const getBadgeStyle = (type) => {
  const base = { padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '500', display: 'inline-block' };
  if (type === 'success') return { ...base, backgroundColor: '#f0fdf4', color: '#16a34a' };
  if (type === 'warning') return { ...base, backgroundColor: '#fff7ed', color: '#ea580c' };
  return { ...base, backgroundColor: '#f1f5f9', color: '#64748b' };
};

export const examStyles = {
  scrollArea: { width: '100%', height: '100%', padding: '20px 24px', overflowY: 'auto', backgroundColor: '#f4f6f9', fontFamily: "'Inter', sans-serif", boxSizing: 'border-box' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  pageTitle: { margin: '0 0 4px 0', fontSize: '20px', fontWeight: 'bold', color: '#0f172a' },
  pageSub: { margin: 0, fontSize: '12px', color: '#64748b' },
  btnPrimaryLarge: { backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' },

  filterBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '16px' },
  filterGroup: { display: 'flex', gap: '16px' },
  filterItem: { display: 'flex', flexDirection: 'column', gap: '4px' },
  filterLabel: { fontSize: '11px', color: '#64748b' },
  selectInput: { padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none' },
  searchBox: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#f8fafc', padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', width: '260px' },
  searchInputTable: { border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '12px' },

  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '16px' },
  statCard: { backgroundColor: '#ffffff', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '14px' },
  statIconBox: { width: '38px', height: '38px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' },
  statNumber: { fontSize: '18px', fontWeight: 'bold', color: '#0f172a' },
  statLabel: { fontSize: '11px', color: '#64748b' },

  tableCard: { backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px' },
  cardSectionTitle: { margin: '0 0 12px 0', fontSize: '14px', fontWeight: 'bold', color: '#0f172a' },
  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' },
  thRow: { borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' },
  th: { padding: '10px 12px', color: '#64748b', fontWeight: '600' },
  trRow: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '12px', color: '#334155' },
  btnActionRed: { backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' },

  formWrapperContainer: { maxWidth: '800px', margin: '0 auto' },
  createHeader: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' },
  backBtn: { border: '1px solid #cbd5e1', backgroundColor: '#fff', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', color: '#334155', fontWeight: '600' },
  singleColumnForm: { display: 'flex', flexDirection: 'column', gap: '16px' },
  formCard: { backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' },
  formSectionTitle: { margin: '0 0 14px 0', fontSize: '14px', fontWeight: 'bold', color: '#0f172a' },
  
  selectInputFull: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none', backgroundColor: '#fff', color: '#334155', boxSizing: 'border-box' },
  textInput: { width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none', boxSizing: 'border-box', color: '#334155' },
  inputLabelSub: { fontSize: '12px', fontWeight: '600', color: '#334155', display: 'block', marginBottom: '6px' },

  radioOption: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#334155', cursor: 'pointer' },

  toggleContainer: { position: 'relative', display: 'inline-block', width: '38px', height: '20px', flexShrink: 0, cursor: 'pointer' },
  toggleSlider: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: '20px', transition: '0.2s ease-in-out' },
  toggleKnob: { position: 'absolute', height: '14px', width: '14px', left: '3px', bottom: '3px', backgroundColor: 'white', borderRadius: '50%', transition: '0.2s ease-in-out' },

  toggleRow: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' },
  toggleTitle: { fontSize: '12px', fontWeight: '600', color: '#0f172a' },

  actionRowBtns: { display: 'flex', justifyContent: 'flex-end', gap: '10px', alignItems: 'center', marginTop: '10px', paddingBottom: '30px' },
  btnCancelLight: { backgroundColor: '#edf2f7', color: '#475569', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' },
  btnDraftOutline: { backgroundColor: '#ffffff', color: '#334155', border: '1px solid #cbd5e1', padding: '10px 18px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' },
  btnPublishBlue: { backgroundColor: '#2563eb', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' },
};