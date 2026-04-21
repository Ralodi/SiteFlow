import { useState } from 'react';
import { useStore } from '../store';

export default function FieldLog() {
  const { state, dispatch } = useStore();
  const [tab, setTab] = useState('poles');

  const [poleForm, setPoleForm] = useState({ date: '', zoneId: '', subcontractorId: '', quantity: '', supervisor: '', notes: '' });
  const [cableForm, setCableForm] = useState({ date: '', zoneId: '', subcontractorId: '', polesConnected: '', cableMeters: '', supervisor: '', notes: '' });
  const [activationForm, setActivationForm] = useState({ date: '', zoneId: '', subcontractorId: '', householdsActivated: '', supervisor: '', notes: '' });

  const submitPole = () => {
    if (!poleForm.date || !poleForm.zoneId || !poleForm.subcontractorId || !poleForm.quantity) return;
    dispatch({ type: 'ADD_POLE_INSTALLATION', payload: { ...poleForm, quantity: parseInt(poleForm.quantity) } });
    setPoleForm({ date: '', zoneId: '', subcontractorId: '', quantity: '', supervisor: '', notes: '' });
  };

  const submitCable = () => {
    if (!cableForm.date || !cableForm.zoneId || !cableForm.subcontractorId || !cableForm.polesConnected) return;
    dispatch({ type: 'ADD_CABLE_INSTALLATION', payload: { ...cableForm, polesConnected: parseInt(cableForm.polesConnected), cableMeters: parseInt(cableForm.cableMeters) || 0 } });
    setCableForm({ date: '', zoneId: '', subcontractorId: '', polesConnected: '', cableMeters: '', supervisor: '', notes: '' });
  };

  const submitActivation = () => {
    if (!activationForm.date || !activationForm.zoneId || !activationForm.subcontractorId || !activationForm.householdsActivated) return;
    dispatch({ type: 'ADD_ACTIVATION', payload: { ...activationForm, householdsActivated: parseInt(activationForm.householdsActivated) } });
    setActivationForm({ date: '', zoneId: '', subcontractorId: '', householdsActivated: '', supervisor: '', notes: '' });
  };

  const scForZonePhase = (zoneId, phase) => {
    if (!zoneId) return state.subcontractors;
    const assigned = state.zoneAssignments.filter(a => a.zoneId === zoneId && a.phase === phase).map(a => a.subcontractorId);
    if (assigned.length === 0) return state.subcontractors;
    return state.subcontractors.filter(sc => assigned.includes(sc.id));
  };

  const FormField = ({ label, children }) => (
    <div className="form-group">
      <label className="form-label">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Field Log</div>
        <div className="page-subtitle">Record installation work from the field</div>
      </div>

      <div className="tab-row">
        {[
          { key: 'poles', label: 'Pole Installation' },
          { key: 'cable', label: 'Cable Installation' },
          { key: 'activation', label: 'HH Activation' },
        ].map(t => (
          <button key={t.key} className={`tab-btn ${tab === t.key ? 'active' : ''}`} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      <div className="two-col">
        {/* Forms */}
        <div>
          {tab === 'poles' && (
            <div className="card">
              <div className="card-header"><span className="card-title">Log Pole Installation</span></div>
              <div className="card-body">
                <div className="form-grid">
                  <FormField label="Date">
                    <input type="date" className="form-input" value={poleForm.date} onChange={e => setPoleForm({ ...poleForm, date: e.target.value })} />
                  </FormField>
                  <FormField label="Zone">
                    <select className="form-select" value={poleForm.zoneId} onChange={e => setPoleForm({ ...poleForm, zoneId: e.target.value, subcontractorId: '' })}>
                      <option value="">— Select zone —</option>
                      {state.zones.map(z => <option key={z.id} value={z.id}>{z.id} – {z.name}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Subcontractor">
                    <select className="form-select" value={poleForm.subcontractorId} onChange={e => setPoleForm({ ...poleForm, subcontractorId: e.target.value })}>
                      <option value="">— Select subcontractor —</option>
                      {scForZonePhase(poleForm.zoneId, 'pole_installation').map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Poles Installed">
                    <input type="number" className="form-input" min="1" value={poleForm.quantity} onChange={e => setPoleForm({ ...poleForm, quantity: e.target.value })} />
                  </FormField>
                  <FormField label="Supervisor">
                    <input type="text" className="form-input" value={poleForm.supervisor} onChange={e => setPoleForm({ ...poleForm, supervisor: e.target.value })} />
                  </FormField>
                  <div className="form-group full">
                    <label className="form-label">Notes</label>
                    <textarea className="form-textarea" value={poleForm.notes} onChange={e => setPoleForm({ ...poleForm, notes: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <button className="btn btn-amber" onClick={submitPole}>Log Installation</button>
                </div>
              </div>
            </div>
          )}

          {tab === 'cable' && (
            <div className="card">
              <div className="card-header"><span className="card-title">Log Cable Installation</span></div>
              <div className="card-body">
                <div className="form-grid">
                  <FormField label="Date">
                    <input type="date" className="form-input" value={cableForm.date} onChange={e => setCableForm({ ...cableForm, date: e.target.value })} />
                  </FormField>
                  <FormField label="Zone">
                    <select className="form-select" value={cableForm.zoneId} onChange={e => setCableForm({ ...cableForm, zoneId: e.target.value, subcontractorId: '' })}>
                      <option value="">— Select zone —</option>
                      {state.zones.map(z => <option key={z.id} value={z.id}>{z.id} – {z.name}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Subcontractor">
                    <select className="form-select" value={cableForm.subcontractorId} onChange={e => setCableForm({ ...cableForm, subcontractorId: e.target.value })}>
                      <option value="">— Select subcontractor —</option>
                      {scForZonePhase(cableForm.zoneId, 'cable').map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Poles Connected">
                    <input type="number" className="form-input" min="1" value={cableForm.polesConnected} onChange={e => setCableForm({ ...cableForm, polesConnected: e.target.value })} />
                  </FormField>
                  <FormField label="Cable (meters)">
                    <input type="number" className="form-input" min="1" value={cableForm.cableMeters} onChange={e => setCableForm({ ...cableForm, cableMeters: e.target.value })} />
                  </FormField>
                  <FormField label="Supervisor">
                    <input type="text" className="form-input" value={cableForm.supervisor} onChange={e => setCableForm({ ...cableForm, supervisor: e.target.value })} />
                  </FormField>
                  <div className="form-group full">
                    <label className="form-label">Notes</label>
                    <textarea className="form-textarea" value={cableForm.notes} onChange={e => setCableForm({ ...cableForm, notes: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <button className="btn btn-amber" onClick={submitCable}>Log Cabling</button>
                </div>
              </div>
            </div>
          )}

          {tab === 'activation' && (
            <div className="card">
              <div className="card-header"><span className="card-title">Log Household Activation</span></div>
              <div className="card-body">
                <div className="form-grid">
                  <FormField label="Date">
                    <input type="date" className="form-input" value={activationForm.date} onChange={e => setActivationForm({ ...activationForm, date: e.target.value })} />
                  </FormField>
                  <FormField label="Zone">
                    <select className="form-select" value={activationForm.zoneId} onChange={e => setActivationForm({ ...activationForm, zoneId: e.target.value, subcontractorId: '' })}>
                      <option value="">— Select zone —</option>
                      {state.zones.map(z => <option key={z.id} value={z.id}>{z.id} – {z.name}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Subcontractor">
                    <select className="form-select" value={activationForm.subcontractorId} onChange={e => setActivationForm({ ...activationForm, subcontractorId: e.target.value })}>
                      <option value="">— Select subcontractor —</option>
                      {scForZonePhase(activationForm.zoneId, 'activation').map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Households Activated">
                    <input type="number" className="form-input" min="1" value={activationForm.householdsActivated} onChange={e => setActivationForm({ ...activationForm, householdsActivated: e.target.value })} />
                  </FormField>
                  <FormField label="Supervisor">
                    <input type="text" className="form-input" value={activationForm.supervisor} onChange={e => setActivationForm({ ...activationForm, supervisor: e.target.value })} />
                  </FormField>
                  <div className="form-group full">
                    <label className="form-label">Notes</label>
                    <textarea className="form-textarea" value={activationForm.notes} onChange={e => setActivationForm({ ...activationForm, notes: e.target.value })} />
                  </div>
                </div>
                <div style={{ marginTop: 16 }}>
                  <button className="btn btn-amber" onClick={submitActivation}>Log Activation</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Log history */}
        <div>
          {tab === 'poles' && (
            <div className="card">
              <div className="card-header"><span className="card-title">Installation Log</span></div>
              <table className="data-table">
                <thead>
                  <tr><th>Date</th><th>Zone</th><th>Subcontractor</th><th>Qty</th><th>Supervisor</th></tr>
                </thead>
                <tbody>
                  {[...state.poleInstallations].sort((a, b) => new Date(b.date) - new Date(a.date)).map(p => {
                    const zone = state.zones.find(z => z.id === p.zoneId);
                    const sc = state.subcontractors.find(s => s.id === p.subcontractorId);
                    return (
                      <tr key={p.id}>
                        <td style={{ fontSize: 12, color: '#888' }}>{p.date}</td>
                        <td style={{ fontSize: 12 }}>{zone?.name || p.zoneId}</td>
                        <td style={{ fontSize: 12 }}>{sc?.name || p.subcontractorId}</td>
                        <td style={{ fontWeight: 700 }}>{p.quantity}</td>
                        <td style={{ fontSize: 12, color: '#888' }}>{p.supervisor}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {tab === 'cable' && (
            <div className="card">
              <div className="card-header"><span className="card-title">Cabling Log</span></div>
              <table className="data-table">
                <thead>
                  <tr><th>Date</th><th>Zone</th><th>Subcontractor</th><th>Poles</th><th>Meters</th></tr>
                </thead>
                <tbody>
                  {[...state.cableInstallations].sort((a, b) => new Date(b.date) - new Date(a.date)).map(c => {
                    const zone = state.zones.find(z => z.id === c.zoneId);
                    const sc = state.subcontractors.find(s => s.id === c.subcontractorId);
                    return (
                      <tr key={c.id}>
                        <td style={{ fontSize: 12, color: '#888' }}>{c.date}</td>
                        <td style={{ fontSize: 12 }}>{zone?.name || c.zoneId}</td>
                        <td style={{ fontSize: 12 }}>{sc?.name || c.subcontractorId}</td>
                        <td style={{ fontWeight: 700 }}>{c.polesConnected}</td>
                        <td style={{ color: '#888' }}>{c.cableMeters?.toLocaleString()}m</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {tab === 'activation' && (
            <div className="card">
              <div className="card-header"><span className="card-title">Activation Log</span></div>
              <table className="data-table">
                <thead>
                  <tr><th>Date</th><th>Zone</th><th>Subcontractor</th><th>HH</th><th>Supervisor</th></tr>
                </thead>
                <tbody>
                  {[...state.activations].sort((a, b) => new Date(b.date) - new Date(a.date)).map(a => {
                    const zone = state.zones.find(z => z.id === a.zoneId);
                    const sc = state.subcontractors.find(s => s.id === a.subcontractorId);
                    return (
                      <tr key={a.id}>
                        <td style={{ fontSize: 12, color: '#888' }}>{a.date}</td>
                        <td style={{ fontSize: 12 }}>{zone?.name || a.zoneId}</td>
                        <td style={{ fontSize: 12 }}>{sc?.name || a.subcontractorId}</td>
                        <td style={{ fontWeight: 700, color: '#2d7a1f' }}>{a.householdsActivated}</td>
                        <td style={{ fontSize: 12, color: '#888' }}>{a.supervisor}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
