import { useState } from 'react';
import { TENANTS, TIER_CONFIG, STATUS_CONFIG, BILLING_CONFIG, INDUSTRY_LABELS } from './superadminData';

const SA_STYLES = {
  page: { padding:'32px 36px', maxWidth:1200, color:'#f0ede6' },
  label: { fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.35)', marginBottom:8 },
  card: { background:'#161820', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:14, overflow:'hidden' },
  inp: { width:'100%', padding:'10px 12px', background:'#1e2028', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:9, color:'#f0ede6', fontSize:13.5, fontFamily:'var(--font-body)', outline:'none', marginBottom:14 },
};

function TenantModal({ tenant, onClose, onSave }) {
  const isEdit = !!tenant?.id;
  const blank = { company:'', contactName:'', contactEmail:'', contactPhone:'', industry:'fibre_rollout', tier:'demo', status:'active', billingStatus:'demo', monthlyRate:0, notes:'' };
  const [form, setForm] = useState(isEdit ? { ...tenant } : blank);
  const f = (k, v) => setForm(p => ({ ...p, [k]:v }));

  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(4px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }} onClick={e => e.target===e.currentTarget && onClose()}>
      <div style={{ background:'#161820', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:18, width:'100%', maxWidth:560, maxHeight:'90vh', overflowY:'auto', boxShadow:'0 24px 60px rgba(0,0,0,0.5)' }}>
        <div style={{ padding:'22px 24px 18px', borderBottom:'0.5px solid rgba(255,255,255,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'#f0ede6' }}>{isEdit ? 'Edit Tenant' : 'Add New Tenant'}</div>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(240,237,230,0.4)', fontSize:18, cursor:'pointer' }}>✕</button>
        </div>
        <div style={{ padding:24 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
            <div style={{ gridColumn:'1/-1' }}>
              <label style={SA_STYLES.label}>Company name *</label>
              <input style={SA_STYLES.inp} value={form.company} onChange={e=>f('company',e.target.value)} placeholder="e.g. Khumalo Civil Works"/>
            </div>
            <div>
              <label style={SA_STYLES.label}>Contact person *</label>
              <input style={SA_STYLES.inp} value={form.contactName} onChange={e=>f('contactName',e.target.value)} placeholder="Full name"/>
            </div>
            <div>
              <label style={SA_STYLES.label}>Contact email *</label>
              <input type="email" style={SA_STYLES.inp} value={form.contactEmail} onChange={e=>f('contactEmail',e.target.value)} placeholder="email@company.co.za"/>
            </div>
            <div>
              <label style={SA_STYLES.label}>Phone</label>
              <input style={SA_STYLES.inp} value={form.contactPhone} onChange={e=>f('contactPhone',e.target.value)} placeholder="071 234 5678"/>
            </div>
            <div>
              <label style={SA_STYLES.label}>Industry</label>
              <select style={SA_STYLES.inp} value={form.industry} onChange={e=>f('industry',e.target.value)}>
                {Object.entries(INDUSTRY_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div>
              <label style={SA_STYLES.label}>Subscription tier</label>
              <select style={SA_STYLES.inp} value={form.tier} onChange={e=>{ f('tier',e.target.value); f('billingStatus', e.target.value==='demo' ? 'demo' : 'pending'); f('monthlyRate', e.target.value==='demo' ? 0 : e.target.value==='pro' ? 2500 : 8500); }}>
                <option value="demo">Demo</option>
                <option value="pro">Pro — R2,500/mo</option>
                <option value="tailored">Tailored</option>
              </select>
            </div>
            <div>
              <label style={SA_STYLES.label}>Account status</label>
              <select style={SA_STYLES.inp} value={form.status} onChange={e=>f('status',e.target.value)}>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label style={SA_STYLES.label}>Billing status</label>
              <select style={SA_STYLES.inp} value={form.billingStatus} onChange={e=>f('billingStatus',e.target.value)}>
                <option value="demo">Demo</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            {form.tier !== 'demo' && (
              <div>
                <label style={SA_STYLES.label}>Monthly rate (R)</label>
                <input type="number" style={SA_STYLES.inp} value={form.monthlyRate} onChange={e=>f('monthlyRate',Number(e.target.value))}/>
              </div>
            )}
            <div style={{ gridColumn:'1/-1' }}>
              <label style={SA_STYLES.label}>Internal notes</label>
              <textarea style={{ ...SA_STYLES.inp, resize:'vertical', minHeight:80 }} value={form.notes} onChange={e=>f('notes',e.target.value)} placeholder="Internal notes about this client..."/>
            </div>
          </div>
        </div>
        <div style={{ padding:'16px 24px', borderTop:'0.5px solid rgba(255,255,255,0.07)', display:'flex', justifyContent:'flex-end', gap:10 }}>
          <button onClick={onClose} style={{ padding:'9px 18px', background:'transparent', border:'0.5px solid rgba(255,255,255,0.15)', borderRadius:9, color:'rgba(240,237,230,0.6)', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13 }}>Cancel</button>
          <button onClick={() => onSave(form)} disabled={!form.company||!form.contactEmail} style={{ padding:'9px 20px', background:'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontFamily:'var(--font-body)', fontSize:13, fontWeight:600 }}>
            ✓ {isEdit ? 'Save Changes' : 'Create Tenant'}
          </button>
        </div>
      </div>
    </div>
  );
}

function TenantDetailPanel({ tenant, onClose, onUpdate }) {
  const [editBilling, setEditBilling] = useState(tenant.billingStatus);
  const [editStatus, setEditStatus] = useState(tenant.status);
  const [editTier, setEditTier] = useState(tenant.tier);

  return (
    <div style={{ position:'fixed', top:0, right:0, bottom:0, width:420, background:'#0d0e10', borderLeft:'0.5px solid rgba(255,255,255,0.08)', zIndex:100, overflowY:'auto', padding:28 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:16, fontWeight:700, color:'#f0ede6' }}>{tenant.company}</div>
          <div style={{ fontSize:12, color:'rgba(240,237,230,0.4)', marginTop:3 }}>{INDUSTRY_LABELS[tenant.industry]}</div>
        </div>
        <button onClick={onClose} style={{ background:'none', border:'none', color:'rgba(240,237,230,0.4)', fontSize:18, cursor:'pointer' }}>✕</button>
      </div>

      {/* Quick controls */}
      <div style={{ background:'#161820', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:12, padding:18, marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.3)', marginBottom:14 }}>Quick controls</div>
        <div style={{ marginBottom:12 }}>
          <label style={{ fontSize:11, color:'rgba(240,237,230,0.4)', display:'block', marginBottom:5 }}>ACCOUNT STATUS</label>
          <div style={{ display:'flex', gap:6 }}>
            {['active','suspended','cancelled'].map(s => (
              <button key={s} onClick={() => setEditStatus(s)} style={{ flex:1, padding:'7px 4px', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:7, background: editStatus===s ? (s==='active'?'rgba(45,122,31,0.3)':s==='suspended'?'rgba(160,32,32,0.3)':'rgba(255,255,255,0.08)') : 'transparent', color: editStatus===s ? '#f0ede6' : 'rgba(240,237,230,0.35)', cursor:'pointer', fontSize:11, fontWeight:600, fontFamily:'var(--font-body)', textTransform:'capitalize' }}>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:12 }}>
          <label style={{ fontSize:11, color:'rgba(240,237,230,0.4)', display:'block', marginBottom:5 }}>TIER</label>
          <div style={{ display:'flex', gap:6 }}>
            {['demo','pro','tailored'].map(t => (
              <button key={t} onClick={() => setEditTier(t)} style={{ flex:1, padding:'7px 4px', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:7, background: editTier===t ? 'rgba(124,58,237,0.3)' : 'transparent', color: editTier===t ? '#a78bfa' : 'rgba(240,237,230,0.35)', cursor:'pointer', fontSize:11, fontWeight:600, fontFamily:'var(--font-body)', textTransform:'capitalize' }}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom:16 }}>
          <label style={{ fontSize:11, color:'rgba(240,237,230,0.4)', display:'block', marginBottom:5 }}>BILLING STATUS</label>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {['demo','pending','paid','overdue'].map(b => (
              <button key={b} onClick={() => setEditBilling(b)} style={{ padding:'6px 12px', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:7, background: editBilling===b ? 'rgba(124,58,237,0.2)' : 'transparent', color: editBilling===b ? '#a78bfa' : 'rgba(240,237,230,0.35)', cursor:'pointer', fontSize:11, fontWeight:600, fontFamily:'var(--font-body)', textTransform:'capitalize' }}>
                {b}
              </button>
            ))}
          </div>
        </div>
        <button onClick={() => onUpdate({ ...tenant, status:editStatus, tier:editTier, billingStatus:editBilling })} style={{ width:'100%', padding:'10px', background:'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'var(--font-body)' }}>
          Save changes
        </button>
      </div>

      {/* Details */}
      <div style={{ background:'#161820', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:12, padding:18, marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.3)', marginBottom:14 }}>Contact details</div>
        {[
          ['Name', tenant.contactName],
          ['Email', tenant.contactEmail],
          ['Phone', tenant.contactPhone],
          ['Joined', tenant.joinedDate],
          ['Last active', tenant.lastActive],
        ].map(([k,v]) => (
          <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'0.5px solid rgba(255,255,255,0.05)', fontSize:13 }}>
            <span style={{ color:'rgba(240,237,230,0.4)' }}>{k}</span>
            <span style={{ color:'rgba(240,237,230,0.8)' }}>{v||'—'}</span>
          </div>
        ))}
      </div>

      {/* Usage */}
      <div style={{ background:'#161820', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:12, padding:18, marginBottom:16 }}>
        <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(240,237,230,0.3)', marginBottom:14 }}>Usage</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[
            ['Projects', tenant.projects],
            ['Zones', tenant.zones],
            ['Users', tenant.users],
            ['Subcontractors', tenant.subcontractors],
          ].map(([k,v]) => (
            <div key={k} style={{ background:'rgba(255,255,255,0.03)', borderRadius:9, padding:'12px 14px' }}>
              <div style={{ fontSize:11, color:'rgba(240,237,230,0.35)', marginBottom:4 }}>{k}</div>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.4rem', fontWeight:700, color:'#f0ede6', lineHeight:1 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Notes */}
      {tenant.notes && (
        <div style={{ background:'rgba(124,58,237,0.08)', border:'0.5px solid rgba(124,58,237,0.2)', borderRadius:12, padding:16 }}>
          <div style={{ fontSize:11, fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:'rgba(124,58,237,0.7)', marginBottom:8 }}>Internal notes</div>
          <div style={{ fontSize:13, color:'rgba(240,237,230,0.6)', lineHeight:1.6 }}>{tenant.notes}</div>
        </div>
      )}
    </div>
  );
}

export default function SATenants() {
  const [tenants, setTenants] = useState(TENANTS);
  const [selected, setSelected] = useState(null);
  const [modal, setModal] = useState(null); // null | 'add' | tenant obj for edit
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = tenants
    .filter(t => filter==='all' || t.status===filter || t.tier===filter || t.billingStatus===filter)
    .filter(t => !search || t.company.toLowerCase().includes(search.toLowerCase()) || t.contactEmail.toLowerCase().includes(search.toLowerCase()));

  const saveTenant = (form) => {
    if (form.id) setTenants(prev => prev.map(t => t.id===form.id ? form : t));
    else setTenants(prev => [...prev, { ...form, id:`T${Date.now()}`, joinedDate: new Date().toISOString().split('T')[0], lastActive: new Date().toISOString().split('T')[0], projects:0, zones:0, users:0, subcontractors:0 }]);
    setModal(null);
  };

  const updateTenant = (updated) => {
    setTenants(prev => prev.map(t => t.id===updated.id ? updated : t));
    setSelected(updated);
  };

  return (
    <div style={{ padding:'32px 36px', maxWidth:1200, color:'#f0ede6', paddingRight: selected ? 460 : 36 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:28 }}>
        <div>
          <div style={{ fontFamily:'var(--font-display)', fontSize:22, fontWeight:700, color:'#f0ede6', letterSpacing:'-0.02em' }}>Tenants</div>
          <div style={{ fontSize:13, color:'rgba(240,237,230,0.4)', marginTop:3 }}>{tenants.length} registered accounts</div>
        </div>
        <button onClick={() => setModal('add')} style={{ padding:'9px 20px', background:'#7c3aed', border:'none', borderRadius:9, color:'#fff', cursor:'pointer', fontSize:13, fontWeight:600, fontFamily:'var(--font-body)', display:'flex', alignItems:'center', gap:7 }}>
          + Add Tenant
        </button>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap', alignItems:'center' }}>
        <input
          value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search company or email..."
          style={{ padding:'8px 12px', background:'#161820', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:9, color:'#f0ede6', fontSize:13, fontFamily:'var(--font-body)', outline:'none', width:220 }}
        />
        {[['all','All'],['active','Active'],['suspended','Suspended'],['demo','Demo'],['pro','Pro'],['overdue','Overdue']].map(([k,l]) => (
          <button key={k} onClick={() => setFilter(k)} style={{ padding:'7px 14px', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:20, background: filter===k ? '#7c3aed' : 'transparent', color: filter===k ? '#fff' : 'rgba(240,237,230,0.45)', cursor:'pointer', fontSize:12, fontWeight:500, fontFamily:'var(--font-body)' }}>{l}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background:'#161820', border:'0.5px solid rgba(255,255,255,0.07)', borderRadius:14, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:13 }}>
          <thead>
            <tr>
              {['Company','Industry','Tier','Account','Billing','Monthly','Projects','Last Active','Actions'].map(h => (
                <th key={h} style={{ textAlign:'left', padding:'11px 16px', fontSize:11, fontWeight:600, color:'rgba(240,237,230,0.3)', textTransform:'uppercase', letterSpacing:'0.06em', borderBottom:'0.5px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.02)', whiteSpace:'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => (
              <tr key={t.id} onClick={() => setSelected(selected?.id===t.id ? null : t)} style={{ cursor:'pointer', background: selected?.id===t.id ? 'rgba(124,58,237,0.08)' : undefined, borderLeft: selected?.id===t.id ? '2px solid #7c3aed' : '2px solid transparent' }}>
                <td style={{ padding:'13px 16px', borderBottom:'0.5px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ fontWeight:600, color:'rgba(240,237,230,0.9)' }}>{t.company}</div>
                  <div style={{ fontSize:11, color:'rgba(240,237,230,0.35)', marginTop:2 }}>{t.contactEmail}</div>
                </td>
                <td style={{ padding:'13px 16px', borderBottom:'0.5px solid rgba(255,255,255,0.04)', color:'rgba(240,237,230,0.5)', fontSize:12 }}>{INDUSTRY_LABELS[t.industry]}</td>
                <td style={{ padding:'13px 16px', borderBottom:'0.5px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:600, background: t.tier==='demo'?'rgba(255,255,255,0.06)':t.tier==='pro'?'rgba(26,95,160,0.25)':'rgba(124,58,237,0.25)', color: t.tier==='demo'?'#888':t.tier==='pro'?'#5b9bd5':'#a78bfa' }}>{TIER_CONFIG[t.tier]?.label}</span>
                </td>
                <td style={{ padding:'13px 16px', borderBottom:'0.5px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:600, background: t.status==='active'?'rgba(45,122,31,0.2)':t.status==='suspended'?'rgba(160,32,32,0.2)':'rgba(255,255,255,0.06)', color: t.status==='active'?'#6dbd5a':t.status==='suspended'?'#f87171':'#888' }}>
                    {STATUS_CONFIG[t.status]?.label}
                  </span>
                </td>
                <td style={{ padding:'13px 16px', borderBottom:'0.5px solid rgba(255,255,255,0.04)' }}>
                  <span style={{ padding:'3px 10px', borderRadius:20, fontSize:11, fontWeight:600, background: t.billingStatus==='paid'?'rgba(45,122,31,0.15)':t.billingStatus==='overdue'?'rgba(160,32,32,0.2)':'rgba(255,255,255,0.06)', color: t.billingStatus==='paid'?'#6dbd5a':t.billingStatus==='overdue'?'#f87171':'#888' }}>
                    {BILLING_CONFIG[t.billingStatus]?.label}
                  </span>
                </td>
                <td style={{ padding:'13px 16px', borderBottom:'0.5px solid rgba(255,255,255,0.04)', fontWeight:600, color: t.monthlyRate>0?'#a78bfa':'rgba(240,237,230,0.3)' }}>
                  {t.monthlyRate>0 ? `R ${t.monthlyRate.toLocaleString()}` : '—'}
                </td>
                <td style={{ padding:'13px 16px', borderBottom:'0.5px solid rgba(255,255,255,0.04)', color:'rgba(240,237,230,0.5)' }}>{t.projects}</td>
                <td style={{ padding:'13px 16px', borderBottom:'0.5px solid rgba(255,255,255,0.04)', color:'rgba(240,237,230,0.4)', fontSize:12 }}>{t.lastActive}</td>
                <td style={{ padding:'13px 16px', borderBottom:'0.5px solid rgba(255,255,255,0.04)' }} onClick={e=>e.stopPropagation()}>
                  <button onClick={() => setModal(t)} style={{ padding:'5px 12px', background:'transparent', border:'0.5px solid rgba(255,255,255,0.15)', borderRadius:7, color:'rgba(240,237,230,0.6)', cursor:'pointer', fontSize:11, fontFamily:'var(--font-body)', marginRight:6 }}>Edit</button>
                  <button onClick={() => setTenants(prev => prev.map(x => x.id===t.id ? {...x, status: x.status==='active'?'suspended':'active'} : x))} style={{ padding:'5px 12px', background: t.status==='active'?'rgba(160,32,32,0.15)':'rgba(45,122,31,0.15)', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:7, color: t.status==='active'?'#f87171':'#6dbd5a', cursor:'pointer', fontSize:11, fontFamily:'var(--font-body)' }}>
                    {t.status==='active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && <TenantDetailPanel tenant={selected} onClose={() => setSelected(null)} onUpdate={updateTenant}/>}
      {modal && <TenantModal tenant={modal==='add' ? null : modal} onClose={() => setModal(null)} onSave={saveTenant}/>}
    </div>
  );
}
