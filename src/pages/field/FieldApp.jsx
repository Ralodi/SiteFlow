import { useState } from 'react';
import { useStore } from '../../store';

const FIELD_USER = { name: 'Thabo Khumalo', company: 'Khumalo Civil Works', scId: 'SC01', initials: 'TK' };

const TABS = ['Home', 'Log Work', 'My History', 'Payments'];
const TAB_ICONS = ['🏠', '📝', '📋', '💰'];

export default function FieldApp() {
  const { state, dispatch, computed } = useStore();
  const [tab, setTab] = useState(0);
  const [logType, setLogType] = useState('poles');
  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ date: new Date().toISOString().split('T')[0], zoneId: '', quantity: '', supervisor: FIELD_USER.name, notes: '' });

  const myZones = [...new Set(state.zoneAssignments.filter(a => a.subcontractorId === FIELD_USER.scId).map(a => a.zoneId))].map(id => state.zones.find(z => z.id === id)).filter(Boolean);
  const myInstalls = state.poleInstallations.filter(p => p.subcontractorId === FIELD_USER.scId);
  const myCables = state.cableInstallations.filter(c => c.subcontractorId === FIELD_USER.scId);
  const totalInstalled = myInstalls.reduce((s, p) => s + p.quantity, 0);
  const totalIssued = computed.polesIssuedBySC[FIELD_USER.scId] || 0;

  // Simulated payment rate: R85 per pole installed
  const RATE = 85;
  const earned = totalInstalled * RATE;
  const paid = Math.floor(earned * 0.7);
  const pending = earned - paid;

  const handlePhotoAdd = () => {
    if (photos.length < 6) setPhotos([...photos, { id: Date.now(), emoji: ['📸', '🖼️', '📷'][photos.length % 3] }]);
  };

  const handleSubmit = () => {
    if (!form.zoneId || !form.quantity) return;
    if (logType === 'poles') {
      dispatch({ type: 'ADD_POLE_INSTALLATION', payload: { ...form, subcontractorId: FIELD_USER.scId, quantity: parseInt(form.quantity) } });
    } else if (logType === 'cable') {
      dispatch({ type: 'ADD_CABLE_INSTALLATION', payload: { ...form, subcontractorId: FIELD_USER.scId, polesConnected: parseInt(form.quantity), cableMeters: parseInt(form.quantity) * 45 } });
    } else {
      dispatch({ type: 'ADD_ACTIVATION', payload: { ...form, subcontractorId: FIELD_USER.scId, householdsActivated: parseInt(form.quantity) } });
    }
    setForm({ date: new Date().toISOString().split('T')[0], zoneId: '', quantity: '', supervisor: FIELD_USER.name, notes: '' });
    setPhotos([]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setTab(2); }, 1800);
  };

  return (
    <div className="field-shell">
      {/* Header */}
      <div className="field-header">
        <div className="field-logo">
          <div className="field-logo-mark">
            <svg viewBox="0 0 18 18" fill="none" width="14" height="14"><rect x="2" y="2" width="6" height="6" rx="1.5" fill="#0e0f0c"/><rect x="10" y="2" width="6" height="6" rx="1.5" fill="#0e0f0c" opacity="0.5"/><rect x="2" y="10" width="6" height="6" rx="1.5" fill="#0e0f0c" opacity="0.5"/><rect x="10" y="10" width="6" height="6" rx="1.5" fill="#0e0f0c"/></svg>
          </div>
          SiteFlow Field
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
          <div style={{ fontSize:11, color:'rgba(240,237,230,0.4)', textAlign:'right' }}>
            <div style={{ color:'rgba(240,237,230,0.7)', fontWeight:500 }}>{FIELD_USER.name}</div>
            <div>{FIELD_USER.company}</div>
          </div>
          <div style={{ width:32, height:32, background:'var(--amber)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#0e0f0c' }}>{FIELD_USER.initials}</div>
        </div>
      </div>

      <div className="field-body">

        {/* ── HOME TAB ── */}
        {tab === 0 && (
          <>
            <div className="field-greeting">
              <h2>Good morning, {FIELD_USER.name.split(' ')[0]} 👋</h2>
              <p>{new Date().toLocaleDateString('en-ZA', { weekday:'long', day:'numeric', month:'long' })}</p>
            </div>

            <div className="field-stat-row">
              <div className="field-stat">
                <div className="field-stat-num">{totalIssued}</div>
                <div className="field-stat-label">Poles issued to you</div>
              </div>
              <div className="field-stat">
                <div className="field-stat-num">{totalInstalled}</div>
                <div className="field-stat-label">Poles installed</div>
              </div>
              <div className="field-stat" style={{ gridColumn:'1/-1' }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div className="field-stat-num" style={{ fontSize:'1.3rem' }}>{totalIssued > 0 ? Math.round((totalInstalled/totalIssued)*100) : 0}%</div>
                    <div className="field-stat-label">Reconciliation rate</div>
                  </div>
                  <div style={{ flex:1, margin:'0 16px' }}>
                    <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:4, height:8, overflow:'hidden' }}>
                      <div style={{ height:'100%', background:'var(--amber)', borderRadius:4, width:`${totalIssued > 0 ? Math.round((totalInstalled/totalIssued)*100) : 0}%` }}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom:20 }}>
              <div className="field-card-title">Quick actions</div>
              <div className="field-action-grid">
                <button className="field-action-btn" onClick={() => { setTab(1); setLogType('poles'); }}>
                  <div className="field-action-icon">🪝</div>
                  <div className="field-action-label">Log Poles</div>
                  <div className="field-action-sub">Record installation</div>
                </button>
                <button className="field-action-btn" onClick={() => { setTab(1); setLogType('cable'); }}>
                  <div className="field-action-icon">🔌</div>
                  <div className="field-action-label">Log Cabling</div>
                  <div className="field-action-sub">Record cable run</div>
                </button>
                <button className="field-action-btn" onClick={() => { setTab(1); setLogType('activation'); }}>
                  <div className="field-action-icon">🏠</div>
                  <div className="field-action-label">Log Activation</div>
                  <div className="field-action-sub">Household connected</div>
                </button>
                <button className="field-action-btn" onClick={() => setTab(2)}>
                  <div className="field-action-icon">📋</div>
                  <div className="field-action-label">My History</div>
                  <div className="field-action-sub">View past work</div>
                </button>
              </div>
            </div>

            <div className="field-card">
              <div className="field-card-title">My assigned zones</div>
              {myZones.map(zone => {
                const s = computed.zoneStatus[zone.id];
                const pct = Math.min(100, Math.round((s.installed / zone.targetPoles) * 100));
                return (
                  <div key={zone.id} style={{ paddingBottom:12, marginBottom:12, borderBottom:'0.5px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                      <span style={{ fontSize:13, fontWeight:600, color:'rgba(240,237,230,0.85)' }}>{zone.name}</span>
                      <span style={{ fontSize:11, color:'var(--amber)' }}>{pct}%</span>
                    </div>
                    <div style={{ background:'rgba(255,255,255,0.08)', borderRadius:3, height:4, overflow:'hidden' }}>
                      <div style={{ height:'100%', background:'var(--amber)', borderRadius:3, width:`${pct}%` }}/>
                    </div>
                    <div style={{ fontSize:11, color:'rgba(240,237,230,0.3)', marginTop:4 }}>{s.installed} / {zone.targetPoles} poles · {zone.area}</div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* ── LOG WORK TAB ── */}
        {tab === 1 && (
          <>
            {submitted ? (
              <div style={{ textAlign:'center', padding:'60px 20px' }}>
                <div style={{ fontSize:56, marginBottom:16 }}>✅</div>
                <div style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', fontWeight:700, color:'#f0ede6', marginBottom:8 }}>Work Logged!</div>
                <div style={{ fontSize:14, color:'rgba(240,237,230,0.5)' }}>Your submission has been recorded. Redirecting to history...</div>
              </div>
            ) : (
              <>
                <div className="field-section-title">Log Work</div>
                <div style={{ display:'flex', gap:8, marginBottom:20 }}>
                  {[['poles','🪝 Poles'],['cable','🔌 Cabling'],['activation','🏠 Activation']].map(([key,lbl]) => (
                    <button key={key} onClick={() => setLogType(key)} style={{ flex:1, padding:'9px 6px', borderRadius:8, fontSize:12, fontWeight:600, cursor:'pointer', fontFamily:'var(--font-body)', background: logType===key ? 'var(--amber)' : 'rgba(255,255,255,0.06)', color: logType===key ? '#0e0f0c' : 'rgba(240,237,230,0.55)', border:'none' }}>
                      {lbl}
                    </button>
                  ))}
                </div>

                <div className="field-form-card">
                  <div className="field-form-header">
                    <span className="field-form-title">
                      {logType === 'poles' ? '🪝 Pole Installation' : logType === 'cable' ? '🔌 Cable Installation' : '🏠 Household Activation'}
                    </span>
                  </div>
                  <div className="field-form-body">
                    <label className="field-label">Date</label>
                    <input type="date" className="field-input" value={form.date} onChange={e => setForm({...form, date:e.target.value})}/>

                    <label className="field-label">Zone *</label>
                    <select className="field-select" value={form.zoneId} onChange={e => setForm({...form, zoneId:e.target.value})}>
                      <option value="">— Select zone —</option>
                      {myZones.map(z => <option key={z.id} value={z.id}>{z.id} – {z.name}</option>)}
                    </select>

                    <label className="field-label">
                      {logType === 'poles' ? 'Number of poles installed *' : logType === 'cable' ? 'Poles connected *' : 'Households activated *'}
                    </label>
                    <input type="number" className="field-input" min="1" placeholder="e.g. 25" value={form.quantity} onChange={e => setForm({...form, quantity:e.target.value})}/>

                    <label className="field-label">Notes / observations</label>
                    <textarea className="field-textarea" placeholder="Any site conditions, issues, or notes..." value={form.notes} onChange={e => setForm({...form, notes:e.target.value})}/>

                    {/* Photo upload */}
                    <label className="field-label">Proof of work photos</label>
                    {photos.length > 0 && (
                      <div className="field-photo-preview">
                        {photos.map(p => (
                          <div key={p.id} className="field-photo-thumb">{p.emoji}</div>
                        ))}
                        {photos.length < 6 && (
                          <div className="field-photo-thumb" style={{ cursor:'pointer', fontSize:18, color:'rgba(240,237,230,0.3)' }} onClick={handlePhotoAdd}>+</div>
                        )}
                      </div>
                    )}
                    {photos.length === 0 && (
                      <div className="field-photo-upload" onClick={handlePhotoAdd}>
                        <div className="field-photo-icon">📷</div>
                        <div className="field-photo-text">
                          <strong>Tap to add photos</strong>
                          Geotagged proof of installation
                        </div>
                      </div>
                    )}

                    <button className="field-submit-btn" onClick={handleSubmit} disabled={!form.zoneId || !form.quantity}>
                      Submit work log →
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {/* ── HISTORY TAB ── */}
        {tab === 2 && (
          <>
            <div className="field-section-title">My Submission History</div>
            {[
              ...myInstalls.map(p => ({ ...p, type:'poles', label:`${p.quantity} poles installed`, badge:'field-badge-amber' })),
              ...myCables.map(c => ({ ...c, type:'cable', label:`${c.polesConnected} poles cabled`, badge:'field-badge-purple' })),
              ...state.activations.filter(a => a.subcontractorId===FIELD_USER.scId).map(a => ({ ...a, type:'activation', label:`${a.householdsActivated} households activated`, badge:'field-badge-green' })),
            ].sort((a,b) => new Date(b.date)-new Date(a.date)).map((item, i) => {
              const zone = state.zones.find(z => z.id === item.zoneId);
              return (
                <div key={i} className="field-history-item">
                  <div className="field-history-top">
                    <div className="field-history-zone">{zone?.name || item.zoneId}</div>
                    <div className="field-history-date">{item.date}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                    <div className="field-history-detail">{item.label}</div>
                    <span className={`field-badge ${item.badge}`}>
                      {item.type === 'poles' ? 'Poles' : item.type === 'cable' ? 'Cabling' : 'Activation'}
                    </span>
                  </div>
                  {item.notes && <div style={{ fontSize:11, color:'rgba(240,237,230,0.3)', marginTop:6 }}>{item.notes}</div>}
                </div>
              );
            })}
            {myInstalls.length === 0 && myCables.length === 0 && (
              <div style={{ textAlign:'center', padding:'40px 20px', color:'rgba(240,237,230,0.3)', fontSize:14 }}>No submissions yet. Log your first work entry.</div>
            )}
          </>
        )}

        {/* ── PAYMENTS TAB ── */}
        {tab === 3 && (
          <>
            <div className="field-section-title">My Payments</div>
            <div className="field-card" style={{ marginBottom:14 }}>
              <div className="field-card-title">Earnings summary</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:8 }}>
                <div className="field-stat">
                  <div className="field-stat-num" style={{ color:'#6dbd5a', fontSize:'1.3rem' }}>R {paid.toLocaleString()}</div>
                  <div className="field-stat-label">Paid to date</div>
                </div>
                <div className="field-stat">
                  <div className="field-stat-num" style={{ color:'var(--amber)', fontSize:'1.3rem' }}>R {pending.toLocaleString()}</div>
                  <div className="field-stat-label">Pending payment</div>
                </div>
              </div>
              <div style={{ fontSize:12, color:'rgba(240,237,230,0.35)', textAlign:'center', marginTop:8 }}>Agreed rate: R{RATE}/pole installed</div>
            </div>

            <div className="field-card" style={{ marginBottom:14 }}>
              <div className="field-card-title">Payment breakdown</div>
              <div className="payment-row">
                <span className="payment-label">Poles installed ({totalInstalled})</span>
                <span className="payment-amount">R {(totalInstalled * RATE).toLocaleString()}</span>
              </div>
              <div className="payment-row">
                <span className="payment-label">Payment 1 — Jan 2025</span>
                <span className="payment-amount earned">R {Math.floor(paid * 0.55).toLocaleString()} ✓</span>
              </div>
              <div className="payment-row">
                <span className="payment-label">Payment 2 — Feb 2025</span>
                <span className="payment-amount earned">R {Math.floor(paid * 0.45).toLocaleString()} ✓</span>
              </div>
              <div className="payment-row">
                <span className="payment-label">Payment 3 — Due Mar 2025</span>
                <span className="payment-amount pending">R {pending.toLocaleString()} ⏳</span>
              </div>
            </div>

            <div className="field-card">
              <div className="field-card-title">Agreed rates</div>
              {[['Pole installation','R 85.00 per pole'],['Cable installation','R 12.00 per metre'],['HH Activation','R 200.00 per household']].map(([label, rate]) => (
                <div key={label} className="payment-row">
                  <span className="payment-label">{label}</span>
                  <span style={{ fontSize:13, fontWeight:600, color:'rgba(240,237,230,0.75)' }}>{rate}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="field-nav">
        {TABS.map((t, i) => (
          <button key={t} className={`field-nav-item ${tab===i?'active':''}`} onClick={() => setTab(i)}>
            <div className="field-nav-icon">{TAB_ICONS[i]}</div>
            <div className="field-nav-label">{t}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
