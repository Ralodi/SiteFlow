import { useState } from 'react';
import { useStore } from '../store';
import { AlertCircle, ChevronDown, ChevronUp, X, Check, Plus } from 'lucide-react';

const RATES = { pole_installation: 85, cable: 12, activation: 200 };

const SEED_PAYMENTS = {
  SC01: [
    { id:'p1', ref:'PAY-2025-001', date:'2025-02-01', amount:9945,  note:'January installment — poles Z01/Z02', status:'paid' },
    { id:'p2', ref:'PAY-2025-002', date:'2025-03-01', amount:3230,  note:'February installment', status:'paid' },
  ],
  SC02: [{ id:'p3', ref:'PAY-2025-003', date:'2025-02-01', amount:11050, note:'January — poles + cable Z03', status:'paid' }],
  SC03: [{ id:'p4', ref:'PAY-2025-004', date:'2025-02-28', amount:25560, note:'Cable Z01 + Z07 partial', status:'paid' }],
  SC04: [{ id:'p5', ref:'PAY-2025-005', date:'2025-03-01', amount:9775,  note:'Poles Z05 complete', status:'paid' }],
  SC05: [{ id:'p6', ref:'PAY-2025-006', date:'2025-03-05', amount:15640, note:'Cable Z02 + Z09', status:'paid' }],
  SC07: [{ id:'p7', ref:'PAY-2025-007', date:'2025-03-10', amount:23460, note:'Cable + activation Z04', status:'paid' }],
  SC09: [{ id:'p8', ref:'PAY-2025-008', date:'2025-03-15', amount:32600, note:'Activations Z01 + Z07', status:'paid' }],
  SC12: [{ id:'p9', ref:'PAY-2025-009', date:'2025-03-01', amount:11475, note:'Poles Z07 + Z12', status:'paid' }],
};

const STATUS_CYCLE = { pending:'approved', approved:'paid', paid:'pending' };

const STATUS_CONFIG = {
  paid:     { label:'✓ Paid',      cls:'badge-green' },
  approved: { label:'✓ Approved',  cls:'badge-blue'  },
  pending:  { label:'⏳ Pending',   cls:'badge-amber' },
  overdue:  { label:'! Overdue',   cls:'badge-red'   },
};

function StatusPill({ status, onClick }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <span
      className={`badge ${cfg.cls}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default', userSelect:'none' }}
      title={onClick ? 'Click to update status' : undefined}
    >
      {cfg.label}
    </span>
  );
}

function NewPaymentModal({ sc, outstanding, onClose, onSave }) {
  const today = new Date().toISOString().split('T')[0];
  const [form, setForm] = useState({
    amount: Math.round(outstanding), date: today,
    ref: `PAY-${Date.now().toString().slice(-6)}`,
    note: '', method: 'eft', status: 'approved',
  });
  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Record Payment — {sc.name}</span>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16}/></button>
        </div>
        <div className="modal-body">
          <div style={{ background:'var(--app-surface-2)', border:'0.5px solid var(--app-border)', borderRadius:'var(--r-md)', padding:16, marginBottom:20, display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, textAlign:'center' }}>
            <div>
              <div style={{ fontSize:11, color:'var(--app-text-3)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:4 }}>Outstanding</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', fontWeight:700, color:'#b07010' }}>R {Math.round(outstanding).toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize:11, color:'var(--app-text-3)', textTransform:'uppercase', letterSpacing:'0.05em', marginBottom:4 }}>This payment</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.3rem', fontWeight:700, color:'var(--green)' }}>R {Number(form.amount).toLocaleString()}</div>
            </div>
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Amount (R) *</label>
              <input type="number" className="form-input" value={form.amount} onChange={e => setForm({...form, amount:e.target.value})}/>
            </div>
            <div className="form-group">
              <label className="form-label">Payment date *</label>
              <input type="date" className="form-input" value={form.date} onChange={e => setForm({...form, date:e.target.value})}/>
            </div>
            <div className="form-group">
              <label className="form-label">Reference</label>
              <input className="form-input" value={form.ref} onChange={e => setForm({...form, ref:e.target.value})}/>
            </div>
            <div className="form-group">
              <label className="form-label">Payment method</label>
              <select className="form-select" value={form.method} onChange={e => setForm({...form, method:e.target.value})}>
                <option value="eft">EFT</option>
                <option value="cash">Cash</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Initial status</label>
              <select className="form-select" value={form.status} onChange={e => setForm({...form, status:e.target.value})}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            <div className="form-group full">
              <label className="form-label">Note</label>
              <textarea className="form-input" style={{ resize:'none', height:68 }} placeholder="e.g. March installment — poles Z06..." value={form.note} onChange={e => setForm({...form, note:e.target.value})}/>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-amber" onClick={() => onSave(form)} disabled={!form.amount || !form.date}>
            <Check size={14}/> Record Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Payments() {
  const { state, computed } = useStore();
  const [expanded, setExpanded] = useState(null);
  const [newPaymentTarget, setNewPaymentTarget] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [ledger, setLedger] = useState(SEED_PAYMENTS);

  const updatePaymentStatus = (scId, paymentId) => {
    setLedger(prev => ({
      ...prev,
      [scId]: (prev[scId]||[]).map(p => p.id===paymentId ? {...p, status: STATUS_CYCLE[p.status]||'pending'} : p)
    }));
  };

  const addPayment = (scId, form) => {
    setLedger(prev => ({
      ...prev,
      [scId]: [...(prev[scId]||[]), { id:`p${Date.now()}`, ref:form.ref, date:form.date, amount:Number(form.amount), note:form.note, method:form.method, status:form.status }]
    }));
    setNewPaymentTarget(null);
  };

  const scEarnings = state.subcontractors.map(sc => {
    const poles = computed.polesInstalledBySC[sc.id]||0;
    const meters = computed.cableMetersBySC[sc.id]||0;
    const households = computed.householdsActivatedBySC[sc.id]||0;
    const poleEarnings = poles * RATES.pole_installation;
    const cableEarnings = meters * RATES.cable;
    const activationEarnings = households * RATES.activation;
    const total = poleEarnings + cableEarnings + activationEarnings;
    if (total === 0) return null;
    const payments = ledger[sc.id]||[];
    const paid = payments.filter(p=>p.status==='paid').reduce((s,p)=>s+p.amount,0);
    const approved = payments.filter(p=>p.status==='approved').reduce((s,p)=>s+p.amount,0);
    const outstanding = Math.max(0, total - paid - approved);
    const paidPct = total>0 ? Math.round((paid/total)*100) : 0;
    const status = outstanding===0 ? 'paid' : paidPct===0 && approved===0 ? 'overdue' : 'pending';
    return { sc, poles, meters, households, poleEarnings, cableEarnings, activationEarnings, total, paid, approved, outstanding, paidPct, status, payments };
  }).filter(Boolean);

  const totalEarned = scEarnings.reduce((s,e)=>s+e.total,0);
  const totalPaid = scEarnings.reduce((s,e)=>s+e.paid,0);
  const totalApproved = scEarnings.reduce((s,e)=>s+e.approved,0);
  const totalOutstanding = scEarnings.reduce((s,e)=>s+e.outstanding,0);
  const filtered = filterStatus==='all' ? scEarnings : scEarnings.filter(e=>e.status===filterStatus);

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div>
          <div className="page-title">Contractor Payments</div>
          <div className="page-subtitle">Track earnings, record payments, and manage status — click any status badge to update it</div>
        </div>
        <div style={{ fontSize:12, color:'var(--app-text-3)', textAlign:'right', lineHeight:1.8 }}>
          <div>R{RATES.pole_installation}/pole · R{RATES.cable}/m cable · R{RATES.activation}/HH</div>
        </div>
      </div>

      <div className="metric-grid" style={{ gridTemplateColumns:'repeat(4,1fr)' }}>
        <div className="metric-card">
          <div className="metric-label">Total Earned</div>
          <div className="metric-value">R {Math.round(totalEarned/1000)}k</div>
          <div className="metric-sub">across all contractors</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total Paid</div>
          <div className="metric-value green">R {Math.round(totalPaid/1000)}k</div>
          <div className="metric-sub">{totalEarned>0 ? Math.round((totalPaid/totalEarned)*100) : 0}% of total</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Approved</div>
          <div className="metric-value blue">R {Math.round(totalApproved/1000)}k</div>
          <div className="metric-sub">awaiting transfer</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Outstanding</div>
          <div className="metric-value amber">R {Math.round(totalOutstanding/1000)}k</div>
          <div className="metric-sub">not yet approved</div>
        </div>
      </div>

      {scEarnings.some(e=>e.status==='overdue') && (
        <div className="alert alert-danger gap">
          <AlertCircle size={16} style={{ flexShrink:0, marginTop:1 }}/>
          <span><strong>{scEarnings.filter(e=>e.status==='overdue').length} contractors</strong> have no payments recorded yet.</span>
        </div>
      )}

      <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
        {[['all','All'],['pending','Pending'],['overdue','Overdue'],['paid','Fully Paid']].map(([key,label]) => (
          <button key={key} onClick={() => setFilterStatus(key)} className={`btn btn-sm ${filterStatus===key?'btn-primary':'btn-outline'}`}>
            {label} <span style={{ marginLeft:4, fontSize:11, opacity:0.7 }}>({key==='all' ? scEarnings.length : scEarnings.filter(e=>e.status===key).length})</span>
          </button>
        ))}
      </div>

      <div className="card gap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subcontractor</th><th>Poles</th><th>Cable</th><th>Activations</th>
              <th>Total Earned</th><th>Paid</th><th>Outstanding</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ sc, poles, meters, households, poleEarnings, cableEarnings, activationEarnings, total, paid, outstanding, paidPct, status, payments }) => (
              <>
                <tr key={sc.id} className="clickable" onClick={() => setExpanded(expanded===sc.id ? null : sc.id)} style={{ background: expanded===sc.id ? '#faf8f4' : undefined }}>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:30, height:30, borderRadius:'50%', background:'var(--amber-light)', border:'0.5px solid var(--amber-border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'var(--amber-dark)', flexShrink:0 }}>
                        {sc.name.split(' ').map(w=>w[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <div style={{ fontWeight:600 }}>{sc.name}</div>
                        <div style={{ fontSize:11, color:'var(--app-text-3)' }}>{sc.contact}</div>
                      </div>
                      {expanded===sc.id ? <ChevronUp size={14} style={{ color:'var(--app-text-3)', marginLeft:4 }}/> : <ChevronDown size={14} style={{ color:'var(--app-text-3)', marginLeft:4 }}/>}
                    </div>
                  </td>
                  <td><div style={{ fontWeight:500 }}>{poles} poles</div><div style={{ fontSize:11, color:'var(--app-text-3)' }}>R {poleEarnings.toLocaleString()}</div></td>
                  <td>{meters>0 ? <><div style={{ fontWeight:500 }}>{meters.toLocaleString()}m</div><div style={{ fontSize:11, color:'var(--app-text-3)' }}>R {cableEarnings.toLocaleString()}</div></> : <span style={{ color:'var(--app-text-3)' }}>—</span>}</td>
                  <td>{households>0 ? <><div style={{ fontWeight:500 }}>{households} HH</div><div style={{ fontSize:11, color:'var(--app-text-3)' }}>R {activationEarnings.toLocaleString()}</div></> : <span style={{ color:'var(--app-text-3)' }}>—</span>}</td>
                  <td><span style={{ fontFamily:'var(--font-display)', fontSize:15, fontWeight:700 }}>R {total.toLocaleString()}</span></td>
                  <td>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ color:'var(--green)', fontWeight:600 }}>R {paid.toLocaleString()}</span>
                      <div className="progress-wrap" style={{ minWidth:48 }}><div className="progress-fill green" style={{ width:`${paidPct}%` }}/></div>
                      <span style={{ fontSize:11, color:'var(--app-text-3)' }}>{paidPct}%</span>
                    </div>
                  </td>
                  <td><span style={{ fontWeight:700, color: outstanding>0 ? '#b07010' : 'var(--green)' }}>R {outstanding.toLocaleString()}</span></td>
                  <td onClick={e=>e.stopPropagation()}><StatusPill status={status}/></td>
                  <td onClick={e=>e.stopPropagation()}>
                    <button className="btn btn-amber btn-sm" onClick={() => setNewPaymentTarget({sc, outstanding})}>
                      <Plus size={12}/> Record
                    </button>
                  </td>
                </tr>

                {expanded===sc.id && (
                  <tr key={`${sc.id}-detail`}>
                    <td colSpan={9} style={{ background:'#faf8f4', padding:0 }}>
                      <div style={{ padding:'20px 24px', borderTop:'0.5px solid var(--app-border)' }}>
                        <div style={{ display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:28 }}>

                          {/* Payment ledger */}
                          <div>
                            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
                              <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--app-text-3)' }}>Payment ledger</div>
                              <button className="btn btn-amber btn-sm" onClick={() => setNewPaymentTarget({sc, outstanding})}><Plus size={12}/> Add payment</button>
                            </div>
                            {payments.length===0 ? (
                              <div style={{ fontSize:13, color:'var(--app-text-3)', padding:'16px 0' }}>No payments recorded yet. Click "Add payment" to record one.</div>
                            ) : (
                              <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
                                <thead>
                                  <tr>{['Reference','Date','Amount','Note','Status'].map(h=>(
                                    <th key={h} style={{ textAlign:'left', padding:'6px 10px', fontSize:11, fontWeight:600, color:'var(--app-text-3)', textTransform:'uppercase', letterSpacing:'0.05em', borderBottom:'0.5px solid var(--app-border)', background:'var(--app-surface-2)' }}>{h}</th>
                                  ))}</tr>
                                </thead>
                                <tbody>
                                  {payments.map(p => (
                                    <tr key={p.id}>
                                      <td style={{ padding:'9px 10px', fontFamily:'monospace', fontSize:11, color:'var(--app-text-3)', borderBottom:'0.5px solid #f5f3ef' }}>{p.ref}</td>
                                      <td style={{ padding:'9px 10px', borderBottom:'0.5px solid #f5f3ef' }}>{p.date}</td>
                                      <td style={{ padding:'9px 10px', fontWeight:700, borderBottom:'0.5px solid #f5f3ef' }}>R {p.amount.toLocaleString()}</td>
                                      <td style={{ padding:'9px 10px', color:'var(--app-text-2)', fontSize:12, borderBottom:'0.5px solid #f5f3ef', maxWidth:160, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{p.note||'—'}</td>
                                      <td style={{ padding:'9px 10px', borderBottom:'0.5px solid #f5f3ef' }}>
                                        <StatusPill status={p.status} onClick={() => updatePaymentStatus(sc.id, p.id)}/>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                                <tfoot>
                                  <tr>
                                    <td colSpan={2} style={{ padding:'10px', fontWeight:700, fontSize:13 }}>Total paid</td>
                                    <td style={{ padding:'10px', fontWeight:700, color:'var(--green)' }}>R {payments.filter(p=>p.status==='paid').reduce((s,p)=>s+p.amount,0).toLocaleString()}</td>
                                    <td colSpan={2}/>
                                  </tr>
                                </tfoot>
                              </table>
                            )}
                          </div>

                          {/* Earnings breakdown */}
                          <div>
                            <div style={{ fontSize:11, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--app-text-3)', marginBottom:12 }}>Earnings breakdown</div>
                            {[
                              { label:'Pole installation', qty:`${poles} poles`, rate:`R${RATES.pole_installation}/pole`, amount:poleEarnings },
                              { label:'Cable installation', qty:`${meters.toLocaleString()}m`, rate:`R${RATES.cable}/m`, amount:cableEarnings },
                              { label:'HH activations', qty:`${households} HH`, rate:`R${RATES.activation}/HH`, amount:activationEarnings },
                            ].map(row=>(
                              <div key={row.label} style={{ display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'0.5px solid var(--app-border)', fontSize:13 }}>
                                <div>
                                  <div style={{ color:'var(--app-text-2)' }}>{row.label}</div>
                                  <div style={{ fontSize:11, color:'var(--app-text-3)' }}>{row.qty} × {row.rate}</div>
                                </div>
                                <span style={{ fontWeight:600 }}>R {row.amount.toLocaleString()}</span>
                              </div>
                            ))}
                            <div style={{ display:'flex', justifyContent:'space-between', padding:'10px 0', fontSize:14, fontWeight:700, borderBottom:'0.5px solid var(--app-border)' }}>
                              <span>Total earned</span><span>R {total.toLocaleString()}</span>
                            </div>
                            <div style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', fontSize:13 }}>
                              <span style={{ color:'var(--app-text-2)' }}>Paid</span>
                              <span style={{ color:'var(--green)', fontWeight:600 }}>R {paid.toLocaleString()}</span>
                            </div>
                            <div style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', fontSize:13 }}>
                              <span style={{ color:'var(--app-text-2)' }}>Outstanding</span>
                              <span style={{ fontWeight:700, color: outstanding>0 ? '#b07010' : 'var(--green)' }}>R {outstanding.toLocaleString()}</span>
                            </div>
                            <div style={{ marginTop:12 }}>
                              <div className="progress-wrap" style={{ height:8 }}><div className="progress-fill green" style={{ width:`${paidPct}%` }}/></div>
                              <div style={{ fontSize:11, color:'var(--app-text-3)', marginTop:4 }}>{paidPct}% of total earnings paid</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">Agreed Rates Reference</span><span style={{ fontSize:12, color:'var(--app-text-3)' }}>Manage in Admin → Payment Rates</span></div>
        <div className="card-body" style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16 }}>
          {[
            { icon:'🪝', label:'Pole Installation',    rate:`R ${RATES.pole_installation}.00`, unit:'per pole installed & logged' },
            { icon:'🔌', label:'Cable Installation',   rate:`R ${RATES.cable}.00`,             unit:'per metre of cable run' },
            { icon:'🏠', label:'Household Activation', rate:`R ${RATES.activation}.00`,        unit:'per household connected' },
          ].map(r=>(
            <div key={r.label} style={{ background:'var(--app-surface-2)', border:'0.5px solid var(--app-border)', borderRadius:'var(--r-md)', padding:'16px 18px', display:'flex', gap:14, alignItems:'center' }}>
              <div style={{ fontSize:24 }}>{r.icon}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:600, marginBottom:2 }}>{r.label}</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.2rem', fontWeight:700, color:'var(--amber-dark)' }}>{r.rate}</div>
                <div style={{ fontSize:11, color:'var(--app-text-3)', marginTop:2 }}>{r.unit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {newPaymentTarget && (
        <NewPaymentModal
          sc={newPaymentTarget.sc}
          outstanding={newPaymentTarget.outstanding}
          onClose={() => setNewPaymentTarget(null)}
          onSave={(form) => addPayment(newPaymentTarget.sc.id, form)}
        />
      )}
    </div>
  );
}