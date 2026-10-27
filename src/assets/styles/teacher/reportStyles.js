export const reportStyles = {
  container: { 
    backgroundColor: '#f8fafc', 
    fontFamily: "'Inter', sans-serif", 
    minHeight: '100%', 
    color: '#334155',
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  headerIcon: { width: '42px', height: '42px', backgroundColor: '#2563eb', color: '#fff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' },
  pageTitle: { margin: '0 0 2px 0', fontSize: '20px', fontWeight: 'bold', color: '#0f172a' },
  pageSub: { margin: 0, fontSize: '12px', color: '#64748b' },

  /* Styles cho Bộ chọn Ngày (Date Range Picker Popover) */
  datePickerWrapper: { position: 'relative' },
  datePickerBtn: { 
    backgroundColor: '#ffffff', 
    border: '1px solid #cbd5e1', 
    borderRadius: '8px', 
    padding: '8px 14px', 
    fontSize: '12px', 
    fontWeight: '600', 
    color: '#1e293b', 
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
    transition: 'all 0.2s ease'
  },
  datePopover: { 
    position: 'absolute', 
    top: 'calc(100% + 8px)', 
    right: 0, 
    width: '320px', 
    backgroundColor: '#ffffff', 
    border: '1px solid #e2e8f0', 
    borderRadius: '12px', 
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)', 
    padding: '16px', 
    zIndex: 100 
  },
  popoverTitle: { fontSize: '13px', fontWeight: 'bold', color: '#0f172a', marginBottom: '10px' },
  presetList: { display: 'flex', gap: '6px', marginBottom: '14px', flexWrap: 'wrap' },
  presetBtn: { border: '1px solid #cbd5e1', backgroundColor: '#f8fafc', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', color: '#475569', cursor: 'pointer' },
  presetBtnActive: { border: '1px solid #2563eb', backgroundColor: '#eff6ff', color: '#2563eb', fontWeight: 'bold', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' },
  dateInputGroup: { display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' },
  inputLabel: { fontSize: '11px', fontWeight: '600', color: '#64748b' },
  dateInputRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  dateInput: { flex: 1, padding: '6px 10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '12px', outline: 'none', color: '#0f172a' },
  popoverActions: { display: 'flex', justifyContent: 'flex-end', gap: '8px', paddingTop: '8px', borderTop: '1px solid #f1f5f9' },
  cancelBtn: { padding: '6px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#fff', fontSize: '11px', color: '#475569', cursor: 'pointer' },
  applyBtn: { padding: '6px 12px', borderRadius: '6px', border: 'none', backgroundColor: '#2563eb', color: '#fff', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' },

  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' },
  statCard: { backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
  statTopRow: { display: 'flex', flexDirection: 'column', gap: '8px' },
  statIconBox: { width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' },
  statTitle: { fontSize: '11px', color: '#64748b', fontWeight: '500' },
  statValue: { fontSize: '22px', fontWeight: 'bold', color: '#0f172a' },
  statTrend: { fontSize: '11px', fontWeight: 'bold' },
  sparklineBox: { marginBottom: '-4px' },

  chartGridTwo: { display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '16px' },
  card: { backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e2e8f0', padding: '16px' },
  cardHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' },
  cardTitle: { fontSize: '14px', fontWeight: 'bold', color: '#0f172a' },
  cardSub: { fontSize: '11px', color: '#64748b', marginTop: '2px' },

  pillGroup: { display: 'flex', backgroundColor: '#f1f5f9', padding: '3px', borderRadius: '8px', gap: '2px' },
  pillActive: { backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' },
  pillInactive: { backgroundColor: 'transparent', color: '#64748b', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', cursor: 'pointer' },

  donutContainer: { display: 'flex', alignItems: 'center', gap: '20px', marginTop: '12px' },
  donutCenterText: { position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' },
  legendList: { flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' },
  legendItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },

  bottomGrid: { display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '16px' },
  linkText: { fontSize: '11px', color: '#2563eb', textDecoration: 'none', fontWeight: '500' },

  subFilterBar: { display: 'flex', gap: '16px', backgroundColor: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '16px' },
  filterInlineGroup: { display: 'flex', alignItems: 'center', gap: '6px' },
  selectSmall: { padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '11px', outline: 'none' },

  scoreAndTableGrid: { display: 'flex', gap: '20px' },
  barCol: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1 },
  barVal: { fontSize: '10px', fontWeight: 'bold', color: '#2563eb' },
  barFill: { width: '28px', backgroundColor: '#2563eb', borderRadius: '4px 4px 0 0' },
  barLabel: { fontSize: '10px', color: '#64748b' },

  table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '11px' },
  thRow: { borderBottom: '1px solid #e2e8f0', backgroundColor: '#f8fafc' },
  th: { padding: '8px', color: '#64748b', fontWeight: '600' },
  trRow: { borderBottom: '1px solid #f1f5f9' },
  td: { padding: '8px', color: '#334155' },

  progressCell: { display: 'flex', alignItems: 'center', gap: '6px' },
  barTrack: { flex: 1, height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' },
  barFillGreen: { height: '100%', backgroundColor: '#22c55e', borderRadius: '3px' },
  barFillYellow: { height: '100%', backgroundColor: '#eab308', borderRadius: '3px' },
  barFillRed: { height: '100%', backgroundColor: '#ef4444', borderRadius: '3px' },

  errorQuestionList: { display: 'flex', flexDirection: 'column', gap: '8px' },
  errorQuestionItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid #f1f5f9' },
  errorRateBadge: { backgroundColor: '#fee2e2', color: '#ef4444', fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' },
  miniBadgeIcon: { display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', borderRadius: '4px', marginRight: '6px', fontSize: '11px' }
};