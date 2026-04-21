import { useState } from 'react';
import { useStore } from '../store';

export default function Subcontractors() {
  const { state, computed } = useStore();
  const [selected, setSelected] = useState(null);

  const sc = selected ? state.subcontractors.find(s => s.id === selected) : null;

  const getZonesForSC = (scId) => {
    const zoneIds = [...new Set(state.zoneAssignments.filter(a => a.subcontractorId === scId).map(a => a.zoneId))];
    return zoneIds.map(id => state.zones.find(z => z.id === id)).filter(Boolean);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Subcontractors</div>
        <div className="page-subtitle">Monitor all 15 subcontracting companies</div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 380px' : '1fr', gap: 20 }}>
        <div className="card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Team Size</th>
                <th>Specialisation</th>
                <th>Poles Issued</th>
                <th>Poles Installed</th>
                <th>Reconciliation</th>
                <th>Zones</th>
              </tr>
            </thead>
            <tbody>
              {state.subcontractors.map(sc => {
                const issued = computed.polesIssuedBySC[sc.id] || 0;
                const installed = computed.polesInstalledBySC[sc.id] || 0;
                const gap = issued - installed;
                const zones = getZonesForSC(sc.id);
                return (
                  <tr key={sc.id} onClick={() => setSelected(selected === sc.id ? null : sc.id)} style={{ cursor: 'pointer', background: selected === sc.id ? '#faf7f0' : undefined }}>
                    <td>
                      <div style={{ fontWeight: 600, fontSize: 13 }}>{sc.name}</div>
                      <div style={{ fontSize: 11, color: '#aaa' }}>{sc.id}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: 13 }}>{sc.contact}</div>
                      <div style={{ fontSize: 11, color: '#aaa' }}>{sc.phone}</div>
                    </td>
                    <td>{sc.teamSize}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                        {sc.specialisation.map(s => (
                          <span key={s} className={`badge ${s === 'pole_installation' ? 'badge-amber' : s === 'cable' ? 'badge-purple' : 'badge-green'}`}>
                            {s === 'pole_installation' ? 'Poles' : s === 'cable' ? 'Cable' : 'Activation'}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{issued || '—'}</td>
                    <td style={{ fontWeight: 600, color: installed > 0 ? '#1a5fa0' : '#aaa' }}>{installed || '—'}</td>
                    <td>
                      {issued === 0 ? <span style={{ color: '#ccc' }}>—</span> :
                        gap > 0 ? (
                          <span className="badge badge-red">{gap} outstanding</span>
                        ) : (
                          <span className="badge badge-green">Reconciled</span>
                        )
                      }
                    </td>
                    <td style={{ color: '#888', fontSize: 12 }}>{zones.map(z => z.id).join(', ') || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {selected && sc && (
          <div>
            <div className="card">
              <div className="card-header">
                <span className="card-title">{sc.name}</span>
                <button className="btn btn-outline" style={{ padding: '4px 10px', fontSize: 12 }} onClick={() => setSelected(null)}>✕</button>
              </div>
              <div className="card-body">
                <div style={{ marginBottom: 16 }}>
                  {[
                    { label: 'Contact', value: sc.contact },
                    { label: 'Phone', value: sc.phone },
                    { label: 'Email', value: sc.email },
                    { label: 'Team Size', value: `${sc.teamSize} people` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid #f5f3ef' }}>
                      <span style={{ fontSize: 12, color: '#888' }}>{label}</span>
                      <span style={{ fontSize: 12, fontWeight: 500 }}>{value}</span>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Pole Reconciliation</div>
                  {(() => {
                    const issued = computed.polesIssuedBySC[selected] || 0;
                    const installed = computed.polesInstalledBySC[selected] || 0;
                    const gap = issued - installed;
                    return (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid #f5f3ef' }}>
                          <span style={{ fontSize: 12, color: '#888' }}>Total Issued</span>
                          <span style={{ fontSize: 12, fontWeight: 600 }}>{issued}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid #f5f3ef' }}>
                          <span style={{ fontSize: 12, color: '#888' }}>Installed & Logged</span>
                          <span style={{ fontSize: 12, fontWeight: 600, color: '#1a5fa0' }}>{installed}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0' }}>
                          <span style={{ fontSize: 12, color: '#888' }}>Outstanding</span>
                          <span style={{ fontSize: 12, fontWeight: 700, color: gap > 0 ? '#a02020' : '#2d7a1f' }}>{gap}</span>
                        </div>
                      </>
                    );
                  })()}
                </div>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Assigned Zones</div>
                  {state.zoneAssignments.filter(a => a.subcontractorId === selected).map(a => {
                    const zone = state.zones.find(z => z.id === a.zoneId);
                    return (
                      <div key={`${a.zoneId}-${a.phase}`} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid #f5f3ef', fontSize: 12 }}>
                        <span style={{ fontWeight: 500 }}>{zone?.name}</span>
                        <span className={`badge ${a.phase === 'pole_installation' ? 'badge-amber' : a.phase === 'cable' ? 'badge-purple' : 'badge-green'}`}>
                          {a.phase === 'pole_installation' ? 'Poles' : a.phase === 'cable' ? 'Cable' : 'Activation'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>Pole Issuances</div>
                  {state.issuances.filter(i => i.subcontractorId === selected).map(i => (
                    <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid #f5f3ef', fontSize: 12 }}>
                      <span style={{ color: '#888' }}>{i.date}</span>
                      <span style={{ fontWeight: 600 }}>{i.quantity} poles</span>
                      <span style={{ color: '#aaa' }}>{i.reference}</span>
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
