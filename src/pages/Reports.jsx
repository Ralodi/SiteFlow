import { useStore } from '../store';

const STATUS_LABEL = {
  not_started: 'Not Started',
  poles_in_progress: 'Poles In Progress',
  poles_complete: 'Poles Complete',
  cabling: 'Cabling',
  cabled: 'Cabled',
  activating: 'Activating',
  activated: 'Activated',
};

export default function Reports() {
  const { state, computed } = useStore();
  const today = new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });

  const installPct = Math.round((computed.totalPolesInstalled / computed.totalTargetPoles) * 100);
  const cablePct = Math.round((computed.totalPolesCabled / computed.totalTargetPoles) * 100);
  const activationPct = Math.round((computed.totalHouseholds / 1200) * 100);

  const areas = [...new Set(state.zones.map(z => z.area))];

  const handlePrint = () => window.print();

  return (
    <div className="page">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="page-title">Progress Reports</div>
          <div className="page-subtitle">Structured reports for supervisors and the fiber company</div>
        </div>
        <button className="btn btn-primary" onClick={handlePrint}>Print / Export PDF</button>
      </div>

      <div id="report-content">
        {/* Report header */}
        <div className="card section-gap" style={{ borderLeft: '4px solid #e8a020' }}>
          <div className="card-body">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a18', marginBottom: 4 }}>Soweto Fibre Rollout — Progress Report</div>
                <div style={{ fontSize: 13, color: '#888' }}>Tender Reference: FIB-2025-SW-001</div>
                <div style={{ fontSize: 13, color: '#888' }}>Report Generated: {today}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, color: '#aaa' }}>Prepared by</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a18' }}>Main Contractor</div>
                <div style={{ fontSize: 12, color: '#888' }}>FiberTrack System</div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="card section-gap">
          <div className="card-header"><span className="card-title">Executive Summary</span></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }}>
              {[
                { label: 'Pole Installation', pct: installPct, detail: `${computed.totalPolesInstalled} of ${computed.totalTargetPoles} poles`, color: '#e8a020' },
                { label: 'Cable Installation', pct: cablePct, detail: `${computed.totalPolesCabled} poles cabled`, color: '#534ab7' },
                { label: 'Household Activation', pct: activationPct, detail: `${computed.totalHouseholds} households live`, color: '#2d7a1f' },
              ].map(({ label, pct, detail, color }) => (
                <div key={label} style={{ textAlign: 'center', padding: 20, background: '#faf9f7', borderRadius: 10 }}>
                  <div style={{ fontSize: 40, fontWeight: 700, color, lineHeight: 1, marginBottom: 6 }}>{pct}%</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: '#1a1a18', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#888' }}>{detail}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 13, color: '#444', lineHeight: 1.7, padding: '12px 16px', background: '#faf9f7', borderRadius: 8 }}>
              As of {today}, the Soweto Fibre Phase 1 rollout is progressing across {state.zones.length} zones covering {areas.length} areas. 
              A total of <strong>{computed.totalPolesIssued}</strong> poles have been issued from the warehouse, 
              of which <strong>{computed.totalPolesInstalled}</strong> ({installPct}%) have been installed in the field. 
              Cable installation is underway in multiple zones with <strong>{computed.totalPolesCabled}</strong> poles connected. 
              Household activations have begun in completed zones, with <strong>{computed.totalHouseholds}</strong> households now live on the network. 
              The warehouse holds a current balance of <strong>{computed.warehouseBalance}</strong> poles available for dispatch.
            </div>
          </div>
        </div>

        {/* Zone breakdown */}
        <div className="card section-gap">
          <div className="card-header"><span className="card-title">Zone-by-Zone Breakdown</span></div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Area</th>
                <th>Target Poles</th>
                <th>Installed</th>
                <th>% Installed</th>
                <th>Cabled</th>
                <th>HH Activated</th>
                <th>Status</th>
                <th>Pole Team</th>
                <th>Cable Team</th>
              </tr>
            </thead>
            <tbody>
              {state.zones.map(zone => {
                const s = computed.zoneStatus[zone.id];
                const installPct = zone.targetPoles > 0 ? Math.round((s.installed / zone.targetPoles) * 100) : 0;
                const poleAssign = state.zoneAssignments.find(a => a.zoneId === zone.id && a.phase === 'pole_installation');
                const cableAssign = state.zoneAssignments.find(a => a.zoneId === zone.id && a.phase === 'cable');
                const poleSC = poleAssign ? state.subcontractors.find(sc => sc.id === poleAssign.subcontractorId)?.name : '—';
                const cableSC = cableAssign ? state.subcontractors.find(sc => sc.id === cableAssign.subcontractorId)?.name : '—';
                return (
                  <tr key={zone.id}>
                    <td><span style={{ fontWeight: 600 }}>{zone.id}</span><br /><span style={{ fontSize: 11, color: '#aaa' }}>{zone.name}</span></td>
                    <td>{zone.area}</td>
                    <td>{zone.targetPoles}</td>
                    <td style={{ fontWeight: 600, color: '#1a5fa0' }}>{s.installed}</td>
                    <td>{installPct}%</td>
                    <td style={{ color: '#534ab7', fontWeight: s.cabled > 0 ? 600 : 400 }}>{s.cabled || '—'}</td>
                    <td style={{ color: '#2d7a1f', fontWeight: s.activated > 0 ? 600 : 400 }}>{s.activated || '—'}</td>
                    <td><span style={{ fontSize: 11, fontWeight: 600, color: s.status === 'activated' ? '#2d7a1f' : s.status.includes('cable') || s.status === 'cabled' ? '#534ab7' : s.status === 'not_started' ? '#aaa' : '#b07010' }}>{STATUS_LABEL[s.status]}</span></td>
                    <td style={{ fontSize: 11, color: '#666' }}>{poleSC}</td>
                    <td style={{ fontSize: 11, color: '#666' }}>{cableSC}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Subcontractor performance */}
        <div className="card section-gap">
          <div className="card-header"><span className="card-title">Subcontractor Performance Summary</span></div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Subcontractor</th>
                <th>Poles Issued</th>
                <th>Poles Installed</th>
                <th>Outstanding</th>
                <th>Reconciliation</th>
                <th>Zones Covered</th>
              </tr>
            </thead>
            <tbody>
              {state.subcontractors.map(sc => {
                const issued = computed.polesIssuedBySC[sc.id] || 0;
                const installed = computed.polesInstalledBySC[sc.id] || 0;
                const gap = issued - installed;
                const zones = [...new Set(state.zoneAssignments.filter(a => a.subcontractorId === sc.id).map(a => a.zoneId))];
                return (
                  <tr key={sc.id}>
                    <td style={{ fontWeight: 500 }}>{sc.name}</td>
                    <td>{issued || '—'}</td>
                    <td style={{ color: issued > 0 ? '#1a5fa0' : '#aaa', fontWeight: installed > 0 ? 600 : 400 }}>{installed || '—'}</td>
                    <td style={{ color: gap > 0 ? '#a02020' : '#aaa', fontWeight: gap > 0 ? 700 : 400 }}>{issued > 0 ? gap : '—'}</td>
                    <td>
                      {issued === 0 ? <span style={{ color: '#ccc' }}>No poles issued</span>
                        : gap === 0 ? <span style={{ color: '#2d7a1f', fontWeight: 600 }}>Reconciled</span>
                        : <span style={{ color: '#a02020', fontWeight: 600 }}>{gap} unaccounted</span>
                      }
                    </td>
                    <td style={{ color: '#888', fontSize: 12 }}>{zones.join(', ') || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Warehouse summary */}
        <div className="card">
          <div className="card-header"><span className="card-title">Warehouse & Logistics Summary</span></div>
          <div className="card-body">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
              {[
                { label: 'Total Warehouse Stock', value: '1,500 poles' },
                { label: 'Total Issued to Field', value: `${computed.totalPolesIssued} poles` },
                { label: 'Current Balance', value: `${computed.warehouseBalance} poles` },
                { label: 'Number of Issuances', value: `${state.issuances.length} transactions` },
              ].map(({ label, value }) => (
                <div key={label} style={{ padding: '12px 14px', background: '#faf9f7', borderRadius: 8 }}>
                  <div style={{ fontSize: 11, color: '#aaa', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a18' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .sidebar, .page-header button { display: none !important; }
          .page { padding: 0; }
          .main-content { overflow: visible; }
          body { background: white; }
          .card { break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}
