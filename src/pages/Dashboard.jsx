import { useStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const STATUS_CONFIG = {
  not_started: { label: 'Not Started', badge: 'badge-gray' },
  poles_in_progress: { label: 'Poles: In Progress', badge: 'badge-amber' },
  poles_complete: { label: 'Poles: Complete', badge: 'badge-blue' },
  cabling: { label: 'Cabling', badge: 'badge-purple' },
  cabled: { label: 'Cabled', badge: 'badge-teal' },
  activating: { label: 'Activating', badge: 'badge-amber' },
  activated: { label: 'Activated', badge: 'badge-green' },
};

export default function Dashboard() {
  const { state, computed } = useStore();

  const {
    totalPolesIssued, totalPolesInstalled, totalPolesCabled,
    totalHouseholds, totalTargetPoles, warehouseBalance, zoneStatus
  } = computed;

  const installPct = Math.round((totalPolesInstalled / totalTargetPoles) * 100);
  const cablePct = Math.round((totalPolesCabled / totalTargetPoles) * 100);

  // Zone progress chart data
  const zoneChartData = state.zones.map(z => ({
    name: z.id,
    target: z.targetPoles,
    installed: computed.polesInstalledByZone[z.id] || 0,
    cabled: computed.polesCabledByZone[z.id] || 0,
  }));

  // Subcontractor performance
  const scPerf = state.subcontractors
    .filter(sc => (computed.polesIssuedBySC[sc.id] || 0) > 0)
    .map(sc => ({
      name: sc.name.split(' ')[0],
      issued: computed.polesIssuedBySC[sc.id] || 0,
      installed: computed.polesInstalledBySC[sc.id] || 0,
    }))
    .sort((a, b) => b.installed - a.installed);

  // Status counts
  const statusCounts = Object.values(zoneStatus).reduce((acc, s) => {
    acc[s.status] = (acc[s.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">Rollout Dashboard</div>
        <div className="page-subtitle">Soweto Fibre Phase 1 — Live overview as of today</div>
      </div>

      <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}>
        <div className="metric-card">
          <div className="metric-label">Warehouse Balance</div>
          <div className="metric-value">{warehouseBalance.toLocaleString()}</div>
          <div className="metric-sub">of 1,500 total stock</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Poles Issued</div>
          <div className="metric-value amber">{totalPolesIssued.toLocaleString()}</div>
          <div className="metric-sub">to field teams</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Poles Installed</div>
          <div className="metric-value blue">{totalPolesInstalled.toLocaleString()}</div>
          <div className="metric-sub">{installPct}% of {totalTargetPoles} target</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Poles Cabled</div>
          <div className="metric-value" style={{color:'#534ab7'}}>{totalPolesCabled.toLocaleString()}</div>
          <div className="metric-sub">{cablePct}% cabled</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">HH Activated</div>
          <div className="metric-value green">{totalHouseholds.toLocaleString()}</div>
          <div className="metric-sub">households live</div>
        </div>
      </div>

      {/* Progress bars */}
      <div className="card section-gap">
        <div className="card-header"><span className="card-title">Overall Rollout Progress</span></div>
        <div className="card-body">
          {[
            { label: 'Pole Installation', value: installPct, color: 'blue' },
            { label: 'Cable Installation', value: cablePct, color: 'amber' },
            { label: 'Household Activation', value: Math.round((totalHouseholds / 1200) * 100), color: 'green' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: '#555' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a18' }}>{value}%</span>
              </div>
              <div className="progress-bar-wrap" style={{ height: 8 }}>
                <div className={`progress-bar-fill ${color}`} style={{ width: `${value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="two-col section-gap">
        {/* Zone status overview */}
        <div className="card">
          <div className="card-header"><span className="card-title">Zone Status Overview</span></div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            {state.zones.map(zone => {
              const s = zoneStatus[zone.id];
              const cfg = STATUS_CONFIG[s.status];
              const pct = Math.min(100, Math.round((s.installed / zone.targetPoles) * 100));
              return (
                <div key={zone.id} style={{ display: 'flex', alignItems: 'center', gap: 12, paddingBottom: 10, marginBottom: 10, borderBottom: '0.5px solid #f5f3ef' }}>
                  <div style={{ width: 32, fontSize: 11, fontWeight: 700, color: '#aaa', flexShrink: 0 }}>{zone.id}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: '#1a1a18', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{zone.name}</div>
                    <div className="progress-bar-wrap">
                      <div className="progress-bar-fill" style={{ width: `${pct}%`, background: s.status === 'activated' ? '#4caf50' : s.status.includes('cable') ? '#534ab7' : '#e8a020' }} />
                    </div>
                  </div>
                  <div style={{ flexShrink: 0 }}>
                    <span className={`badge ${cfg.badge}`}>{cfg.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Subcontractor performance */}
        <div className="card">
          <div className="card-header"><span className="card-title">Subcontractor Performance (Poles)</span></div>
          <div className="card-body" style={{ padding: '12px 0' }}>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={scPerf} margin={{ left: -10, right: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#888' }} />
                <YAxis tick={{ fontSize: 11, fill: '#888' }} />
                <Tooltip
                  contentStyle={{ fontSize: 12, borderRadius: 7, border: '0.5px solid #e4e2db' }}
                />
                <Bar dataKey="issued" name="Issued" fill="#f0d090" radius={[3,3,0,0]} />
                <Bar dataKey="installed" name="Installed" fill="#1a5fa0" radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Zone chart */}
      <div className="card section-gap">
        <div className="card-header"><span className="card-title">Per-Zone Progress: Target vs Installed vs Cabled</span></div>
        <div className="card-body" style={{ padding: '12px 0' }}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={zoneChartData} margin={{ left: -10, right: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ede6" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#888' }} />
              <YAxis tick={{ fontSize: 11, fill: '#888' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 7, border: '0.5px solid #e4e2db' }} />
              <Bar dataKey="target" name="Target" fill="#e8e6e0" radius={[3,3,0,0]} />
              <Bar dataKey="installed" name="Installed" fill="#e8a020" radius={[3,3,0,0]} />
              <Bar dataKey="cabled" name="Cabled" fill="#534ab7" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent activity */}
      <div className="card">
        <div className="card-header"><span className="card-title">Recent Activity</span></div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Event</th>
              <th>Zone</th>
              <th>Subcontractor</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {[
              ...state.poleInstallations.map(p => ({ date: p.date, type: 'Poles Installed', zoneId: p.zoneId, scId: p.subcontractorId, qty: p.quantity, badge: 'badge-amber' })),
              ...state.cableInstallations.map(c => ({ date: c.date, type: 'Cabling Done', zoneId: c.zoneId, scId: c.subcontractorId, qty: c.polesConnected, badge: 'badge-purple' })),
              ...state.activations.map(a => ({ date: a.date, type: 'HH Activated', zoneId: a.zoneId, scId: a.subcontractorId, qty: a.householdsActivated, badge: 'badge-green' })),
            ]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 10)
              .map((ev, i) => {
                const zone = state.zones.find(z => z.id === ev.zoneId);
                const sc = state.subcontractors.find(s => s.id === ev.scId);
                return (
                  <tr key={i}>
                    <td style={{ color: '#888', fontSize: 12 }}>{ev.date}</td>
                    <td><span className={`badge ${ev.badge}`}>{ev.type}</span></td>
                    <td>{zone?.name || ev.zoneId}</td>
                    <td>{sc?.name || ev.scId}</td>
                    <td style={{ fontWeight: 600 }}>{ev.qty.toLocaleString()}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
