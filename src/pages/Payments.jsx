import { useState } from 'react';
import { useStore } from '../store';
import { CheckCircle, Clock, AlertCircle, ChevronDown, ChevronUp, X, Check } from 'lucide-react';

// Agreed rates (R per unit)
const RATES = {
  pole_installation: 85,   // R85 per pole installed
  cable: 12,               // R12 per metre of cable
  activation: 200,         // R200 per household activated
};

// Simulated payment history per SC (paid %)
const PAID_PCT = {
  SC01: 0.70, SC02: 0.65, SC03: 0.80, SC04: 0.50, SC05: 0.90,
  SC06: 0.60, SC07: 0.75, SC08: 0.40, SC09: 0.85, SC10: 0.55,
  SC11: 0.70, SC12: 0.80, SC13: 0.65, SC14: 0.45, SC15: 0.75,
};

function StatusBadge({ status }) {
  if (status === 'paid') return <span className="badge badge-green">✓ Paid</span>;
  if (status === 'pending') return <span className="badge badge-amber">⏳ Pending</span>;
  if (status === 'overdue') return <span className="badge badge-red">! Overdue</span>;
  return <span className="badge badge-gray">—</span>;
}

function ApproveModal({ sc, earnings, onClose, onApprove }) {
  const [amount, setAmount] = useState(Math.round(earnings.outstanding));
  const [note, setNote] = useState('');
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <span className="modal-title">Approve Payment — {sc.name}</span>
          <button className="btn btn-ghost btn-sm" onClick={onClose}><X size={16}/></button>
        </div>
        <div className="modal-body">
          <div style={{ background: 'var(--app-surface-2)', border: '0.5px solid var(--app-border)', borderRadius: 'var(--r-md)', padding: '16px', marginBottom: 20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, textAlign: 'center' }}>
              <div>
                <div style={{ fontSize: 11, color: 'var(--app-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Total Earned</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700 }}>R {earnings.total.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--app-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Already Paid</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--green)' }}>R {earnings.paid.toLocaleString()}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: 'var(--app-text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Outstanding</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: '#b07010' }}>R {earnings.outstanding.toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--app-text-2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Payment amount (R)</div>
            <input
              type="number"
              className="form-input"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              style={{ fontSize: 18, fontWeight: 600 }}
            />
            <div style={{ fontSize: 12, color: 'var(--app-text-3)', marginTop: 4 }}>Default is full outstanding amount. Adjust for partial payment.</div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--app-text-2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Payment note (optional)</div>
            <textarea className="form-input" style={{ resize: 'none', height: 72 }} placeholder="e.g. February installment, partial payment pending site inspection..." value={note} onChange={e => setNote(e.target.value)}/>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onClose}>Cancel</button>
          <button className="btn btn-amber" onClick={() => onApprove(amount, note)}>
            <Check size={14}/> Approve R {Number(amount).toLocaleString()} Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Payments() {
  const { state, computed } = useStore();
  const [expanded, setExpanded] = useState(null);
  const [approveTarget, setApproveTarget] = useState(null);
  const [approvedPayments, setApprovedPayments] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');

  // Build earnings per subcontractor
  const scEarnings = state.subcontractors.map(sc => {
    const poles = computed.polesInstalledBySC[sc.id] || 0;
    const meters = computed.cableMetersBySC[sc.id] || 0;
    const households = computed.householdsActivatedBySC[sc.id] || 0;

    const poleEarnings = poles * RATES.pole_installation;
    const cableEarnings = meters * RATES.cable;
    const activationEarnings = households * RATES.activation;
    const total = poleEarnings + cableEarnings + activationEarnings;

    const basePaidPct = PAID_PCT[sc.id] || 0;
    const extraPaid = approvedPayments[sc.id] || 0;
    const paid = Math.round(total * basePaidPct) + extraPaid;
    const outstanding = Math.max(0, total - paid);
    const paidPct = total > 0 ? Math.round((paid / total) * 100) : 0;

    const hasWork = total > 0;
    const status = !hasWork ? null : outstanding === 0 ? 'paid' : paidPct < 30 ? 'overdue' : 'pending';

    return { sc, poles, meters, households, poleEarnings, cableEarnings, activationEarnings, total, paid, outstanding, paidPct, status };
  }).filter(e => e.total > 0);

  const totalEarned = scEarnings.reduce((s, e) => s + e.total, 0);
  const totalPaid = scEarnings.reduce((s, e) => s + e.paid, 0);
  const totalOutstanding = scEarnings.reduce((s, e) => s + e.outstanding, 0);

  const filtered = filterStatus === 'all' ? scEarnings : scEarnings.filter(e => e.status === filterStatus);

  const handleApprove = (scId, amount, note) => {
    setApprovedPayments(prev => ({ ...prev, [scId]: (prev[scId] || 0) + Number(amount) }));
    setApproveTarget(null);
  };

  return (
    <div className="page-wrap">
      <div className="page-header">
        <div>
          <div className="page-title">Contractor Payments</div>
          <div className="page-subtitle">Track earnings, outstanding amounts, and approve payments per subcontractor</div>
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{ fontSize: 12, color: 'var(--app-text-3)' }}>Rates: R{RATES.pole_installation}/pole · R{RATES.cable}/m cable · R{RATES.activation}/HH</div>
        </div>
      </div>

      {/* Summary metrics */}
      <div className="metric-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="metric-card">
          <div className="metric-label">Total Earned</div>
          <div className="metric-value">R {Math.round(totalEarned / 1000)}k</div>
          <div className="metric-sub">across all contractors</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Total Paid</div>
          <div className="metric-value green">R {Math.round(totalPaid / 1000)}k</div>
          <div className="metric-sub">{totalEarned > 0 ? Math.round((totalPaid/totalEarned)*100) : 0}% of total</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Outstanding</div>
          <div className="metric-value amber">R {Math.round(totalOutstanding / 1000)}k</div>
          <div className="metric-sub">awaiting payment</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Contractors Active</div>
          <div className="metric-value">{scEarnings.length}</div>
          <div className="metric-sub">with billable work logged</div>
        </div>
      </div>

      {/* Alert for overdue */}
      {scEarnings.some(e => e.status === 'overdue') && (
        <div className="alert alert-danger gap">
          <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }}/>
          <span><strong>{scEarnings.filter(e => e.status === 'overdue').length} contractors</strong> have outstanding payments below 30% — review and approve payments to avoid delays.</span>
        </div>
      )}

      {/* Filter row */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {[['all', 'All'], ['pending', 'Pending'], ['overdue', 'Overdue'], ['paid', 'Fully Paid']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilterStatus(key)}
            className={`btn btn-sm ${filterStatus === key ? 'btn-primary' : 'btn-outline'}`}
          >
            {label}
            <span style={{ marginLeft: 4, fontSize: 11, opacity: 0.7 }}>
              ({key === 'all' ? scEarnings.length : scEarnings.filter(e => e.status === key).length})
            </span>
          </button>
        ))}
      </div>

      {/* Main table */}
      <div className="card gap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Subcontractor</th>
              <th>Poles (R{RATES.pole_installation}/pole)</th>
              <th>Cable (R{RATES.cable}/m)</th>
              <th>Activations (R{RATES.activation}/HH)</th>
              <th>Total Earned</th>
              <th>Paid</th>
              <th>Outstanding</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(({ sc, poles, meters, households, poleEarnings, cableEarnings, activationEarnings, total, paid, outstanding, paidPct, status }) => (
              <>
                <tr
                  key={sc.id}
                  className="clickable"
                  onClick={() => setExpanded(expanded === sc.id ? null : sc.id)}
                  style={{ background: expanded === sc.id ? '#faf8f4' : undefined }}
                >
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--amber-light)', border: '0.5px solid var(--amber-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: 'var(--amber-dark)', flexShrink: 0 }}>
                        {sc.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{sc.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--app-text-3)' }}>{sc.contact}</div>
                      </div>
                      {expanded === sc.id ? <ChevronUp size={14} style={{ color: 'var(--app-text-3)', marginLeft: 4 }}/> : <ChevronDown size={14} style={{ color: 'var(--app-text-3)', marginLeft: 4 }}/>}
                    </div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{poles} poles</div>
                    <div style={{ fontSize: 11, color: 'var(--app-text-3)' }}>R {poleEarnings.toLocaleString()}</div>
                  </td>
                  <td>
                    {meters > 0 ? (
                      <>
                        <div style={{ fontWeight: 500 }}>{meters.toLocaleString()}m</div>
                        <div style={{ fontSize: 11, color: 'var(--app-text-3)' }}>R {cableEarnings.toLocaleString()}</div>
                      </>
                    ) : <span style={{ color: 'var(--app-text-3)' }}>—</span>}
                  </td>
                  <td>
                    {households > 0 ? (
                      <>
                        <div style={{ fontWeight: 500 }}>{households} HH</div>
                        <div style={{ fontSize: 11, color: 'var(--app-text-3)' }}>R {activationEarnings.toLocaleString()}</div>
                      </>
                    ) : <span style={{ color: 'var(--app-text-3)' }}>—</span>}
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 700 }}>R {total.toLocaleString()}</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: 'var(--green)', fontWeight: 600 }}>R {paid.toLocaleString()}</span>
                      <div className="progress-wrap" style={{ minWidth: 48 }}>
                        <div className="progress-fill green" style={{ width: `${paidPct}%` }}/>
                      </div>
                      <span style={{ fontSize: 11, color: 'var(--app-text-3)' }}>{paidPct}%</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: outstanding > 0 ? '#b07010' : 'var(--green)' }}>
                      R {outstanding.toLocaleString()}
                    </span>
                  </td>
                  <td><StatusBadge status={status}/></td>
                  <td onClick={e => e.stopPropagation()}>
                    {outstanding > 0 ? (
                      <button
                        className="btn btn-amber btn-sm"
                        onClick={() => setApproveTarget({ sc, earnings: { total, paid, outstanding } })}
                      >
                        Approve
                      </button>
                    ) : (
                      <span style={{ fontSize: 12, color: 'var(--green)' }}>✓ Settled</span>
                    )}
                  </td>
                </tr>

                {/* Expanded breakdown row */}
                {expanded === sc.id && (
                  <tr key={`${sc.id}-detail`}>
                    <td colSpan={9} style={{ background: '#faf8f4', padding: 0 }}>
                      <div style={{ padding: '16px 20px', borderTop: '0.5px solid var(--app-border)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                          {/* Work breakdown */}
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--app-text-3)', marginBottom: 10 }}>Work breakdown</div>
                            {[
                              { label: 'Pole installation', qty: `${poles} poles`, rate: `R${RATES.pole_installation}`, amount: poleEarnings },
                              { label: 'Cable installation', qty: `${meters.toLocaleString()}m`, rate: `R${RATES.cable}/m`, amount: cableEarnings },
                              { label: 'HH activations', qty: `${households} HH`, rate: `R${RATES.activation}`, amount: activationEarnings },
                            ].map(row => (
                              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid var(--app-border)', fontSize: 13 }}>
                                <div>
                                  <span style={{ color: 'var(--app-text-2)' }}>{row.label}</span>
                                  <span style={{ color: 'var(--app-text-3)', fontSize: 11, marginLeft: 8 }}>{row.qty} × {row.rate}</span>
                                </div>
                                <span style={{ fontWeight: 600 }}>R {row.amount.toLocaleString()}</span>
                              </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 0', fontSize: 14, fontWeight: 700 }}>
                              <span>Total earned</span>
                              <span>R {total.toLocaleString()}</span>
                            </div>
                          </div>

                          {/* Payment status */}
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--app-text-3)', marginBottom: 10 }}>Payment status</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid var(--app-border)', fontSize: 13 }}>
                              <span style={{ color: 'var(--app-text-2)' }}>Total earned</span>
                              <span style={{ fontWeight: 600 }}>R {total.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '0.5px solid var(--app-border)', fontSize: 13 }}>
                              <span style={{ color: 'var(--app-text-2)' }}>Paid to date</span>
                              <span style={{ fontWeight: 600, color: 'var(--green)' }}>R {paid.toLocaleString()}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', fontSize: 13 }}>
                              <span style={{ color: 'var(--app-text-2)' }}>Still outstanding</span>
                              <span style={{ fontWeight: 700, color: outstanding > 0 ? '#b07010' : 'var(--green)' }}>R {outstanding.toLocaleString()}</span>
                            </div>
                            <div style={{ marginTop: 12 }}>
                              <div className="progress-wrap" style={{ height: 8 }}>
                                <div className="progress-fill green" style={{ width: `${paidPct}%` }}/>
                              </div>
                              <div style={{ fontSize: 11, color: 'var(--app-text-3)', marginTop: 4 }}>{paidPct}% of total earnings paid</div>
                            </div>
                          </div>

                          {/* Contact & zones */}
                          <div>
                            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--app-text-3)', marginBottom: 10 }}>Contractor details</div>
                            {[
                              ['Contact', sc.contact],
                              ['Phone', sc.phone],
                              ['Email', sc.email],
                              ['Team size', `${sc.teamSize} people`],
                            ].map(([k, v]) => (
                              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '0.5px solid var(--app-border)', fontSize: 12 }}>
                                <span style={{ color: 'var(--app-text-3)' }}>{k}</span>
                                <span style={{ color: 'var(--app-text-2)' }}>{v}</span>
                              </div>
                            ))}
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

      {/* Rates reference */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Agreed Rates Reference</span>
          <span style={{ fontSize: 12, color: 'var(--app-text-3)' }}>Rates apply to all verified work submissions · Manage in Admin → Payment Rates</span>
        </div>
        <div className="card-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { icon: '🪝', label: 'Pole Installation', rate: `R ${RATES.pole_installation.toFixed(2)}`, unit: 'per pole installed & logged' },
            { icon: '🔌', label: 'Cable Installation', rate: `R ${RATES.cable.toFixed(2)}`, unit: 'per metre of cable run' },
            { icon: '🏠', label: 'Household Activation', rate: `R ${RATES.activation.toFixed(2)}`, unit: 'per household connected' },
          ].map(r => (
            <div key={r.label} style={{ background: 'var(--app-surface-2)', border: '0.5px solid var(--app-border)', borderRadius: 'var(--r-md)', padding: '16px 18px', display: 'flex', gap: 14, alignItems: 'center' }}>
              <div style={{ fontSize: 24 }}>{r.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{r.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--amber-dark)' }}>{r.rate}</div>
                <div style={{ fontSize: 11, color: 'var(--app-text-3)', marginTop: 2 }}>{r.unit}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Approve modal */}
      {approveTarget && (
        <ApproveModal
          sc={approveTarget.sc}
          earnings={approveTarget.earnings}
          onClose={() => setApproveTarget(null)}
          onApprove={(amount, note) => handleApprove(approveTarget.sc.id, amount, note)}
        />
      )}
    </div>
  );
}