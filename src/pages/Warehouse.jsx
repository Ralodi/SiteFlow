import { useState } from 'react';
import { useStore } from '../store';

export default function Warehouse() {
  const { state, dispatch, computed } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ date: '', subcontractorId: '', quantity: '', reference: '', issuedBy: '' });

  const handleSubmit = () => {
    if (!form.date || !form.subcontractorId || !form.quantity) return;
    dispatch({ type: 'ADD_ISSUANCE', payload: { ...form, quantity: parseInt(form.quantity) } });
    setForm({ date: '', subcontractorId: '', quantity: '', reference: '', issuedBy: '' });
    setShowForm(false);
  };

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="page-title">Warehouse</div>
          <div className="page-subtitle">Pole inventory and issuance tracking</div>
        </div>
        <button className="btn btn-amber" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Issue Poles'}
        </button>
      </div>

      <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: 24 }}>
        <div className="metric-card">
          <div className="metric-label">Total Stock</div>
          <div className="metric-value">1,500</div>
          <div className="metric-sub">initial inventory</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total Issued</div>
          <div className="metric-value amber">{computed.totalPolesIssued.toLocaleString()}</div>
          <div className="metric-sub">to all teams</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Warehouse Balance</div>
          <div className={`metric-value ${computed.warehouseBalance < 100 ? 'red' : 'green'}`}>{computed.warehouseBalance.toLocaleString()}</div>
          <div className="metric-sub">remaining in stock</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Unaccounted</div>
          <div className="metric-value" style={{ color: (computed.totalPolesIssued - computed.totalPolesInstalled) > 0 ? '#a02020' : '#2d7a1f' }}>
            {(computed.totalPolesIssued - computed.totalPolesInstalled).toLocaleString()}
          </div>
          <div className="metric-sub">issued but not logged</div>
        </div>
      </div>

      {showForm && (
        <div className="card section-gap">
          <div className="card-header"><span className="card-title">New Pole Issuance</span></div>
          <div className="card-body">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" className="form-input" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Subcontractor</label>
                <select className="form-select" value={form.subcontractorId} onChange={e => setForm({ ...form, subcontractorId: e.target.value })}>
                  <option value="">— Select subcontractor —</option>
                  {state.subcontractors.map(sc => <option key={sc.id} value={sc.id}>{sc.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity (poles)</label>
                <input type="number" className="form-input" min="1" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Reference Number</label>
                <input type="text" className="form-input" placeholder="WH-2025-XXX" value={form.reference} onChange={e => setForm({ ...form, reference: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Issued By</label>
                <input type="text" className="form-input" value={form.issuedBy} onChange={e => setForm({ ...form, issuedBy: e.target.value })} />
              </div>
            </div>
            <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
              <button className="btn btn-primary" onClick={handleSubmit}>Record Issuance</button>
              <button className="btn btn-outline" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="card section-gap">
        <div className="card-header"><span className="card-title">Reconciliation by Subcontractor</span></div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Subcontractor</th>
              <th>Total Issued</th>
              <th>Total Installed</th>
              <th>Outstanding</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {state.subcontractors
              .filter(sc => (computed.polesIssuedBySC[sc.id] || 0) > 0)
              .map(sc => {
                const issued = computed.polesIssuedBySC[sc.id] || 0;
                const installed = computed.polesInstalledBySC[sc.id] || 0;
                const gap = issued - installed;
                const pct = issued > 0 ? Math.round((installed / issued) * 100) : 0;
                return (
                  <tr key={sc.id}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{sc.name}</div>
                      <div style={{ fontSize: 11, color: '#aaa' }}>{sc.contact}</div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{issued}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 600, color: '#1a5fa0' }}>{installed}</span>
                        <div className="progress-bar-wrap" style={{ minWidth: 60 }}>
                          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                        </div>
                        <span style={{ fontSize: 11, color: '#888' }}>{pct}%</span>
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: gap > 0 ? '#a02020' : '#2d7a1f' }}>{gap}</td>
                    <td>
                      {gap === 0
                        ? <span className="badge badge-green">Fully Reconciled</span>
                        : gap <= 10
                          ? <span className="badge badge-amber">Minor Gap</span>
                          : <span className="badge badge-red">Review Required</span>
                      }
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-header"><span className="card-title">All Issuances</span></div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Date</th>
              <th>Subcontractor</th>
              <th>Quantity</th>
              <th>Issued By</th>
            </tr>
          </thead>
          <tbody>
            {[...state.issuances].sort((a, b) => new Date(b.date) - new Date(a.date)).map(iss => {
              const sc = state.subcontractors.find(s => s.id === iss.subcontractorId);
              return (
                <tr key={iss.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: 12, color: '#888' }}>{iss.reference}</td>
                  <td>{iss.date}</td>
                  <td>{sc?.name || iss.subcontractorId}</td>
                  <td style={{ fontWeight: 700 }}>{iss.quantity}</td>
                  <td style={{ color: '#888' }}>{iss.issuedBy}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
