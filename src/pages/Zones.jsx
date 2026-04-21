import { useState } from 'react';
import { useStore } from '../store';

const STATUS_CONFIG = {
  not_started: { label: 'Not Started', badge: 'badge-gray' },
  poles_in_progress: { label: 'Poles: In Progress', badge: 'badge-amber' },
  poles_complete: { label: 'Poles Complete', badge: 'badge-blue' },
  cabling: { label: 'Cabling', badge: 'badge-purple' },
  cabled: { label: 'Cabled', badge: 'badge-teal' },
  activating: { label: 'Activating', badge: 'badge-amber' },
  activated: { label: 'Activated', badge: 'badge-green' },
};

export default function Zones() {
  const { state, computed } = useStore();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const areas = [...new Set(state.zones.map(z => z.area))];

  const filtered = state.zones.filter(z =>
    filter === 'all' || z.area === filter
  );

  const zone = selected ? state.zones.find(z => z.id === selected) : null;
  const zs = selected ? computed.zoneStatus[selected] : null;

  const getAssignment = (zoneId, phase) => {
    const a = state.zoneAssignments.find(a => a.zoneId === zoneId && a.phase === phase);
    if (!a) return '—';
    return state.subcontractors.find(s => s.id === a.subcontractorId)?.name || '—';
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Zones</div>
        <div className="page-subtitle">Track installation progress per rollout zone</div>
      </div>

      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        <button className={`btn btn-outline ${filter === 'all' ? 'btn-primary' : ''}`} style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => setFilter('all')}>All</button>
        {areas.map(a => (
          <button key={a} className={`btn btn-outline ${filter === a ? 'btn-primary' : ''}`} style={{ padding: '6px 14px', fontSize: 12 }} onClick={() => setFilter(a)}>{a}</button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 360px' : '1fr', gap: 20 }}>
        <div className="card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Area</th>
                <th>Target</th>
                <th>Installed</th>
                <th>Cabled</th>
                <th>HH Activated</th>
                <th>Progress</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(zone => {
                const s = computed.zoneStatus[zone.id];
                const cfg = STATUS_CONFIG[s.status];
                const pct = Math.min(100, Math.round((s.installed / zone.targetPoles) * 100));
                return (
                  <tr key={zone.id} onClick={() => setSelected(selected === zone.id ? null : zone.id)} style={{ cursor: 'pointer', background: selected === zone.id ? '#faf7f0' : undefined }}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{zone.id}</div>
                      <div style={{ fontSize: 12, color: '#888' }}>{zone.name}</div>
                    </td>
                    <td style={{ color: '#666' }}>{zone.area}</td>
                    <td>{zone.targetPoles}</td>
                    <td style={{ fontWeight: 600, color: s.installed > 0 ? '#1a5fa0' : '#aaa' }}>{s.installed}</td>
                    <td style={{ fontWeight: 600, color: s.cabled > 0 ? '#534ab7' : '#aaa' }}>{s.cabled}</td>
                    <td style={{ fontWeight: 600, color: s.activated > 0 ? '#2d7a1f' : '#aaa' }}>{s.activated}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div className="progress-bar-wrap" style={{ minWidth: 70 }}>
                          <div className="progress-bar-fill" style={{ width: `${pct}%`, background: s.status === 'activated' ? '#4caf50' : s.status.includes('cable') || s.status === 'cabled' ? '#534ab7' : '#e8a020' }} />
                        </div>
                        <span style={{ fontSize: 11, color: '#888', minWidth: 28 }}>{pct}%</span>
                      </div>
                    </td>
                    <td><span className={`badge ${cfg.badge}`}>{cfg.label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {selected && zone && zs && (
          <div>
            <div className="card">
              <div className="card-header">
                <span className="card-title">{zone.name}</span>
                <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="card-body">
                <div style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>{zone.description}</div>

                {[
                  { label: 'Target Poles', value: zone.targetPoles },
                  { label: 'Poles Installed', value: zs.installed, color: '#1a5fa0' },
                  { label: 'Poles Cabled', value: zs.cabled, color: '#534ab7' },
                  { label: 'HH Activated', value: zs.activated, color: '#2d7a1f' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '0.5px solid #f5f3ef' }}>
                    <span style={{ fontSize: 13, color: '#666' }}>{label}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: color || '#1a1a18' }}>{value}</span>
                  </div>
                ))}

                <div style={{ marginTop: 20, marginBottom: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>Assigned Subcontractors</div>
                  {[
                    { phase: 'pole_installation', label: 'Pole Installation' },
                    { phase: 'cable', label: 'Cable Installation' },
                    { phase: 'activation', label: 'HH Activation' },
                  ].map(({ phase, label }) => (
                    <div key={phase} style={{ marginBottom: 10 }}>
                      <div style={{ fontSize: 11, color: '#aaa', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontSize: 13, color: '#1a1a18', fontWeight: 500 }}>{getAssignment(selected, phase)}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Installation History</div>
                  {state.poleInstallations.filter(p => p.zoneId === selected).map(p => (
                    <div key={p.id} style={{ fontSize: 12, display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid #f5f3ef' }}>
                      <span style={{ color: '#888' }}>{p.date}</span>
                      <span>{p.quantity} poles</span>
                      <span style={{ color: '#aaa' }}>{p.supervisor}</span>
                    </div>
                  ))}
                  {state.cableInstallations.filter(c => c.zoneId === selected).map(c => (
                    <div key={c.id} style={{ fontSize: 12, display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid #f5f3ef', color: '#534ab7' }}>
                      <span>{c.date}</span>
                      <span>{c.polesConnected} poles cabled</span>
                      <span style={{ color: '#aaa' }}>{c.supervisor}</span>
                    </div>
                  ))}
                  {state.activations.filter(a => a.zoneId === selected).map(a => (
                    <div key={a.id} style={{ fontSize: 12, display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid #f5f3ef', color: '#2d7a1f' }}>
                      <span>{a.date}</span>
                      <span>{a.householdsActivated} HH activated</span>
                      <span style={{ color: '#aaa' }}>{a.supervisor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
