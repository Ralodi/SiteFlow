import { useState } from 'react';
import { useStore } from '../../store';
import { Plus, Pencil, Trash2, X, Check } from 'lucide-react';

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16}/></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ConfirmDelete({ name, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={e => e.target===e.currentTarget && onCancel()}>
      <div className="modal" style={{ maxWidth:380 }}>
        <div className="modal-header"><span className="modal-title">Confirm Delete</span></div>
        <div className="modal-body">
          <div className="alert alert-danger">⚠️ &nbsp;This will permanently remove <strong>{name}</strong> from the system.</div>
          <p style={{ fontSize:14, color:'var(--app-text-2)' }}>This action cannot be undone. All associated data will be unlinked.</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm}><Trash2 size={13}/> Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function Admin() {
  const { state, dispatch } = useStore();
  const [tab, setTab] = useState('subcontractors');
  const [modal, setModal] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [inviteModal, setInviteModal] = useState(false);
  const blankUser = { name:'', email:'', role:'Field Contractor', company:'', phone:'' };
  const [userForm, setUserForm] = useState(blankUser);

  // SC form state
  const blankSC = { name:'', contact:'', phone:'', email:'', teamSize:'', specialisation:[] };
  const [scForm, setScForm] = useState(blankSC);

  // Zone form state
  const blankZone = { id:'', name:'', area:'', targetPoles:'', description:'' };
  const [zoneForm, setZoneForm] = useState(blankZone);

  const openAddSC = () => { setScForm(blankSC); setEditItem(null); setModal('sc'); };
  const openEditSC = (sc) => { setScForm({ ...sc, teamSize: String(sc.teamSize) }); setEditItem(sc); setModal('sc'); };
  const openAddZone = () => { setZoneForm(blankZone); setEditItem(null); setModal('zone'); };
  const openEditZone = (z) => { setZoneForm({ ...z, targetPoles: String(z.targetPoles) }); setEditItem(z); setModal('zone'); };

  const saveSC = () => {
    if (!scForm.name || !scForm.contact) return;
    const payload = { ...scForm, teamSize: parseInt(scForm.teamSize) || 0 };
    if (editItem) dispatch({ type: 'EDIT_SUBCONTRACTOR', payload: { id: editItem.id, ...payload } });
    else dispatch({ type: 'ADD_SUBCONTRACTOR', payload: { id: `SC${Date.now()}`, ...payload } });
    setModal(null);
  };

  const saveZone = () => {
    if (!zoneForm.name || !zoneForm.area) return;
    const payload = { ...zoneForm, targetPoles: parseInt(zoneForm.targetPoles) || 0 };
    if (editItem) dispatch({ type: 'EDIT_ZONE', payload: { id: editItem.id, ...payload } });
    else dispatch({ type: 'ADD_ZONE', payload: { id: zoneForm.id || `Z${Date.now()}`, ...payload } });
    setModal(null);
  };

  const toggleSpec = (spec) => {
    setScForm(f => ({
      ...f,
      specialisation: f.specialisation.includes(spec)
        ? f.specialisation.filter(s => s !== spec)
        : [...f.specialisation, spec]
    }));
  };

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div>
          <div className="page-title">Admin & Settings</div>
          <div className="page-subtitle">Manage subcontractors, zones, users, and system configuration</div>
        </div>
      </div>

      <div className="tab-row">
        {[['subcontractors','Subcontractors'],['zones','Zones'],['rates','Payment Rates'],['users','Users']].map(([k,l]) => (
          <button key={k} className={`tab-btn ${tab===k?'active':''}`} onClick={() => setTab(k)}>{l}</button>
        ))}
      </div>

      {/* ── SUBCONTRACTORS ── */}
      {tab === 'subcontractors' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Subcontractors ({state.subcontractors.length})</span>
            <button className="btn btn-amber btn-sm" onClick={openAddSC}><Plus size={13}/> Add Subcontractor</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th><th>Contact</th><th>Phone</th><th>Email</th><th>Team</th><th>Specialisation</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.subcontractors.map(sc => (
                <tr key={sc.id}>
                  <td>
                    <div style={{ fontWeight:600 }}>{sc.name}</div>
                    <div style={{ fontSize:11, color:'var(--app-text-3)' }}>{sc.id}</div>
                  </td>
                  <td>{sc.contact}</td>
                  <td style={{ color:'var(--app-text-2)', fontSize:12 }}>{sc.phone}</td>
                  <td style={{ color:'var(--app-text-2)', fontSize:12 }}>{sc.email}</td>
                  <td>{sc.teamSize}</td>
                  <td>
                    <div style={{ display:'flex', gap:4, flexWrap:'wrap' }}>
                      {sc.specialisation.map(s => (
                        <span key={s} className={`badge ${s==='pole_installation'?'badge-amber':s==='cable'?'badge-purple':'badge-green'}`}>
                          {s==='pole_installation'?'Poles':s==='cable'?'Cable':'Activation'}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div style={{ display:'flex', gap:6 }}>
                      <button className="btn btn-outline btn-sm" onClick={() => openEditSC(sc)}><Pencil size={12}/> Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget({ type:'sc', item:sc })}><Trash2 size={12}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── ZONES ── */}
      {tab === 'zones' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">Zones ({state.zones.length})</span>
            <button className="btn btn-amber btn-sm" onClick={openAddZone}><Plus size={13}/> Add Zone</button>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Zone ID</th><th>Name</th><th>Area</th><th>Target Poles</th><th>Description</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {state.zones.map(zone => (
                <tr key={zone.id}>
                  <td style={{ fontWeight:700, color:'var(--amber-dark)' }}>{zone.id}</td>
                  <td style={{ fontWeight:500 }}>{zone.name}</td>
                  <td><span className="badge badge-gray">{zone.area}</span></td>
                  <td style={{ fontWeight:600 }}>{zone.targetPoles}</td>
                  <td style={{ color:'var(--app-text-2)', fontSize:12 }}>{zone.description}</td>
                  <td>
                    <div style={{ display:'flex', gap:6 }}>
                      <button className="btn btn-outline btn-sm" onClick={() => openEditZone(zone)}><Pencil size={12}/> Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => setDeleteTarget({ type:'zone', item:zone })}><Trash2 size={12}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── PAYMENT RATES ── */}
      {tab === 'rates' && (
        <div className="two-col">
          <div className="card">
            <div className="card-header"><span className="card-title">Agreed Payment Rates</span></div>
            <div className="card-body">
              <div className="alert alert-warning">⚠️ &nbsp;Rate changes apply to new payment calculations only. Past payments remain unchanged.</div>
              {[
                { label:'Pole Installation', key:'poles', value:'R 85.00 per pole', unit:'per pole' },
                { label:'Cable Installation', key:'cable', value:'R 12.00 per metre', unit:'per metre' },
                { label:'Household Activation', key:'activation', value:'R 200.00 per household', unit:'per household' },
              ].map(rate => (
                <div key={rate.key} style={{ padding:'14px 0', borderBottom:'0.5px solid var(--app-border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <div>
                    <div style={{ fontSize:14, fontWeight:500 }}>{rate.label}</div>
                    <div style={{ fontSize:12, color:'var(--app-text-3)' }}>{rate.unit}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                    <input defaultValue={rate.value.split(' ')[1]} style={{ width:80, padding:'6px 10px', border:'0.5px solid var(--app-border)', borderRadius:6, fontSize:13, textAlign:'right', fontFamily:'var(--font-body)' }}/>
                    <button className="btn btn-outline btn-sm"><Check size={12}/> Save</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <div className="card-header"><span className="card-title">Payment Schedule Settings</span></div>
            <div className="card-body">
              {[
                ['Payment frequency','Monthly'],
                ['Payment trigger','Verification of submitted work'],
                ['Retention amount','10% held until project completion'],
                ['Currency','ZAR (South African Rand)'],
              ].map(([label, val]) => (
                <div key={label} style={{ padding:'12px 0', borderBottom:'0.5px solid var(--app-border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <span style={{ fontSize:13, color:'var(--app-text-2)' }}>{label}</span>
                  <span style={{ fontSize:13, fontWeight:500 }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── USERS ── */}
      {tab === 'users' && (
        <div className="card">
          <div className="card-header">
            <span className="card-title">System Users</span>
            <button className="btn btn-amber btn-sm" onClick={() => { setUserForm(blankUser); setInviteModal(true); }}><Plus size={13}/> Invite User</button>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>Name</th><th>Role</th><th>Company</th><th>Email</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {[
                { name:'Project Manager', role:'Main Contractor', company:'Main Contractor Co.', email:'pm@maincontractor.co.za', status:'Active' },
                { name:'Thabo Khumalo', role:'Field Contractor', company:'Khumalo Civil Works', email:'thabo@khumalocivil.co.za', status:'Active' },
                { name:'Sipho Dlamini', role:'Field Contractor', company:'Dlamini Infrastructure', email:'sipho@dlamini-infra.co.za', status:'Active' },
                { name:'Lesego Mokoena', role:'Field Contractor', company:'Mokoena Telecoms', email:'lesego@mokoena-tel.co.za', status:'Active' },
                { name:'Warehouse Supervisor', role:'Warehouse', company:'Main Contractor Co.', email:'warehouse@maincontractor.co.za', status:'Active' },
              ].map((u, i) => (
                <tr key={i}>
                  <td style={{ fontWeight:500 }}>{u.name}</td>
                  <td><span className={`badge ${u.role==='Main Contractor'?'badge-blue':u.role==='Warehouse'?'badge-amber':'badge-gray'}`}>{u.role}</span></td>
                  <td style={{ color:'var(--app-text-2)', fontSize:12 }}>{u.company}</td>
                  <td style={{ color:'var(--app-text-2)', fontSize:12 }}>{u.email}</td>
                  <td><span className="badge badge-green">{u.status}</span></td>
                  <td>
                    <div style={{ display:'flex', gap:6 }}>
                      <button className="btn btn-outline btn-sm"><Pencil size={12}/> Edit</button>
                      {i > 0 && <button className="btn btn-danger btn-sm"><Trash2 size={12}/></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── MODALS ── */}
      {modal === 'sc' && (
        <Modal title={editItem ? 'Edit Subcontractor' : 'Add Subcontractor'} onClose={() => setModal(null)}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group full">
                <label className="form-label">Company Name *</label>
                <input className="form-input" value={scForm.name} onChange={e => setScForm({...scForm, name:e.target.value})} placeholder="e.g. Khumalo Civil Works"/>
              </div>
              <div className="form-group">
                <label className="form-label">Contact Person *</label>
                <input className="form-input" value={scForm.contact} onChange={e => setScForm({...scForm, contact:e.target.value})} placeholder="Full name"/>
              </div>
              <div className="form-group">
                <label className="form-label">Team Size</label>
                <input type="number" className="form-input" value={scForm.teamSize} onChange={e => setScForm({...scForm, teamSize:e.target.value})} placeholder="e.g. 8"/>
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" value={scForm.phone} onChange={e => setScForm({...scForm, phone:e.target.value})} placeholder="071 234 5678"/>
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input type="email" className="form-input" value={scForm.email} onChange={e => setScForm({...scForm, email:e.target.value})} placeholder="email@company.co.za"/>
              </div>
              <div className="form-group full">
                <label className="form-label">Specialisation</label>
                <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:4 }}>
                  {[['pole_installation','Pole Installation','badge-amber'],['cable','Cable Installation','badge-purple'],['activation','HH Activation','badge-green']].map(([key,label,badge]) => (
                    <label key={key} style={{ display:'flex', alignItems:'center', gap:7, cursor:'pointer', padding:'6px 12px', borderRadius:20, border:'0.5px solid var(--app-border)', background: scForm.specialisation.includes(key) ? 'var(--amber-light)' : 'transparent', fontSize:13 }}>
                      <input type="checkbox" checked={scForm.specialisation.includes(key)} onChange={() => toggleSpec(key)} style={{ accentColor:'var(--amber)' }}/> {label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-amber" onClick={saveSC}><Check size={13}/> {editItem ? 'Save Changes' : 'Add Subcontractor'}</button>
          </div>
        </Modal>
      )}

      {modal === 'zone' && (
        <Modal title={editItem ? 'Edit Zone' : 'Add Zone'} onClose={() => setModal(null)}>
          <div className="modal-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Zone ID *</label>
                <input className="form-input" value={zoneForm.id} onChange={e => setZoneForm({...zoneForm, id:e.target.value})} placeholder="e.g. Z13" disabled={!!editItem}/>
              </div>
              <div className="form-group">
                <label className="form-label">Target Poles</label>
                <input type="number" className="form-input" value={zoneForm.targetPoles} onChange={e => setZoneForm({...zoneForm, targetPoles:e.target.value})} placeholder="e.g. 100"/>
              </div>
              <div className="form-group">
                <label className="form-label">Zone Name *</label>
                <input className="form-input" value={zoneForm.name} onChange={e => setZoneForm({...zoneForm, name:e.target.value})} placeholder="e.g. Naledi Section C"/>
              </div>
              <div className="form-group">
                <label className="form-label">Area *</label>
                <input className="form-input" value={zoneForm.area} onChange={e => setZoneForm({...zoneForm, area:e.target.value})} placeholder="e.g. Naledi"/>
              </div>
              <div className="form-group full">
                <label className="form-label">Description</label>
                <input className="form-input" value={zoneForm.description} onChange={e => setZoneForm({...zoneForm, description:e.target.value})} placeholder="Brief description of the zone"/>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-amber" onClick={saveZone}><Check size={13}/> {editItem ? 'Save Changes' : 'Add Zone'}</button>
          </div>
        </Modal>
      )}

      {/* ── INVITE USER MODAL ── */}
      {inviteModal && (
        <Modal title="Invite New User" onClose={() => setInviteModal(false)}>
          <div className="modal-body">
            <div className="alert alert-warning">⚠️ &nbsp;An email invitation will be sent once the backend is connected. For now, the user record will be added to the system.</div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input className="form-input" value={userForm.name} onChange={e => setUserForm({...userForm, name:e.target.value})} placeholder="e.g. Sipho Dlamini"/>
              </div>
              <div className="form-group">
                <label className="form-label">Email address *</label>
                <input type="email" className="form-input" value={userForm.email} onChange={e => setUserForm({...userForm, email:e.target.value})} placeholder="sipho@company.co.za"/>
              </div>
              <div className="form-group">
                <label className="form-label">Role *</label>
                <select className="form-select" value={userForm.role} onChange={e => setUserForm({...userForm, role:e.target.value})}>
                  <option>Field Contractor</option>
                  <option>Main Contractor</option>
                  <option>Warehouse</option>
                  <option>Viewer (Read-only)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input className="form-input" value={userForm.phone} onChange={e => setUserForm({...userForm, phone:e.target.value})} placeholder="071 234 5678"/>
              </div>
              <div className="form-group full">
                <label className="form-label">Company / Organisation</label>
                <input className="form-input" value={userForm.company} onChange={e => setUserForm({...userForm, company:e.target.value})} placeholder="e.g. Dlamini Infrastructure"/>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-outline" onClick={() => setInviteModal(false)}>Cancel</button>
            <button className="btn btn-amber" disabled={!userForm.name || !userForm.email} onClick={() => { setInviteModal(false); }}>
              <Check size={13}/> Send Invitation
            </button>
          </div>
        </Modal>
      )}

      {deleteTarget && (
        <ConfirmDelete
          name={deleteTarget.item.name}
          onConfirm={() => {
            dispatch({ type: deleteTarget.type==='sc' ? 'DELETE_SUBCONTRACTOR' : 'DELETE_ZONE', payload: deleteTarget.item.id });
            setDeleteTarget(null);
          }}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}