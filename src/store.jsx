export const ZONES = [
  { id: 'Z01', name: 'Naledi Section A', area: 'Naledi', targetPoles: 120, description: 'Northern residential blocks' },
  { id: 'Z02', name: 'Naledi Section B', area: 'Naledi', targetPoles: 95, description: 'Southern commercial strip' },
  { id: 'Z03', name: 'Meadowlands Ext 1', area: 'Meadowlands', targetPoles: 140, description: 'Main avenue corridor' },
  { id: 'Z04', name: 'Meadowlands Ext 2', area: 'Meadowlands', targetPoles: 110, description: 'Residential grid east' },
  { id: 'Z05', name: 'Zola North', area: 'Zola', targetPoles: 130, description: 'High-density blocks' },
  { id: 'Z06', name: 'Zola South', area: 'Zola', targetPoles: 88, description: 'Mixed residential' },
  { id: 'Z07', name: 'Dobsonville Core', area: 'Dobsonville', targetPoles: 155, description: 'Town centre zone' },
  { id: 'Z08', name: 'Dobsonville Ext', area: 'Dobsonville', targetPoles: 100, description: 'Eastern extension' },
  { id: 'Z09', name: 'Mapetla Block 1', area: 'Mapetla', targetPoles: 75, description: 'Cluster A-D' },
  { id: 'Z10', name: 'Mapetla Block 2', area: 'Mapetla', targetPoles: 80, description: 'Cluster E-H' },
  { id: 'Z11', name: 'Jabulani Gardens', area: 'Jabulani', targetPoles: 65, description: 'Residential estate' },
  { id: 'Z12', name: 'Jabulani Central', area: 'Jabulani', targetPoles: 90, description: 'Main road spine' },
];

export const SUBCONTRACTORS = [
  { id: 'SC01', name: 'Khumalo Civil Works', contact: 'Thabo Khumalo', phone: '071 234 5678', email: 'thabo@khumalocivil.co.za', teamSize: 12, specialisation: ['pole_installation'] },
  { id: 'SC02', name: 'Dlamini Infrastructure', contact: 'Sipho Dlamini', phone: '082 345 6789', email: 'sipho@dlamini-infra.co.za', teamSize: 8, specialisation: ['pole_installation', 'cable'] },
  { id: 'SC03', name: 'Mokoena Telecoms', contact: 'Lesego Mokoena', phone: '073 456 7890', email: 'lesego@mokoena-tel.co.za', teamSize: 10, specialisation: ['cable', 'activation'] },
  { id: 'SC04', name: 'Nkosi Contractors', contact: 'Bongani Nkosi', phone: '064 567 8901', email: 'bongani@nkosi-cc.co.za', teamSize: 6, specialisation: ['pole_installation'] },
  { id: 'SC05', name: 'Sithole Networks', contact: 'Zanele Sithole', phone: '083 678 9012', email: 'zanele@sitholen.co.za', teamSize: 14, specialisation: ['cable', 'activation'] },
  { id: 'SC06', name: 'Ntuli Civil', contact: 'Mthokozisi Ntuli', phone: '076 789 0123', email: 'mthoko@ntulic.co.za', teamSize: 9, specialisation: ['pole_installation'] },
  { id: 'SC07', name: 'Radebe Fibre Co', contact: 'Palesa Radebe', phone: '061 890 1234', email: 'palesa@radebefibre.co.za', teamSize: 11, specialisation: ['cable', 'activation'] },
  { id: 'SC08', name: 'Mahlangu Projects', contact: 'Sibusiso Mahlangu', phone: '079 901 2345', email: 'sbu@mahlanguproj.co.za', teamSize: 7, specialisation: ['pole_installation', 'cable'] },
  { id: 'SC09', name: 'Zulu Installations', contact: 'Nomvula Zulu', phone: '082 012 3456', email: 'nomvula@zuluins.co.za', teamSize: 13, specialisation: ['activation'] },
  { id: 'SC10', name: 'Mthembu Works', contact: 'Lungelo Mthembu', phone: '071 123 4567', email: 'lungelo@mthembu.co.za', teamSize: 5, specialisation: ['pole_installation'] },
  { id: 'SC11', name: 'Cele Construction', contact: 'Nokukhanya Cele', phone: '084 234 5678', email: 'nokukh@celec.co.za', teamSize: 8, specialisation: ['cable'] },
  { id: 'SC12', name: 'Buthelezi Civils', contact: 'Mduduzi Buthelezi', phone: '065 345 6789', email: 'mduduzi@buthelezi.co.za', teamSize: 10, specialisation: ['pole_installation', 'activation'] },
  { id: 'SC13', name: 'Ngubane Networks', contact: 'Thandi Ngubane', phone: '073 456 7891', email: 'thandi@ngubanen.co.za', teamSize: 6, specialisation: ['cable', 'activation'] },
  { id: 'SC14', name: 'Mkhize Infra', contact: 'Siyanda Mkhize', phone: '082 567 8902', email: 'siyanda@mkhizei.co.za', teamSize: 9, specialisation: ['pole_installation'] },
  { id: 'SC15', name: 'Ndlovu Telecoms', contact: 'Ayanda Ndlovu', phone: '079 678 9013', email: 'ayanda@ndlovutel.co.za', teamSize: 11, specialisation: ['cable', 'activation'] },
];

// Zone assignments: which subcontractor does which phase in which zone
export const ZONE_ASSIGNMENTS = [
  { zoneId: 'Z01', phase: 'pole_installation', subcontractorId: 'SC01' },
  { zoneId: 'Z01', phase: 'cable', subcontractorId: 'SC03' },
  { zoneId: 'Z01', phase: 'activation', subcontractorId: 'SC09' },
  { zoneId: 'Z02', phase: 'pole_installation', subcontractorId: 'SC01' },
  { zoneId: 'Z02', phase: 'cable', subcontractorId: 'SC05' },
  { zoneId: 'Z02', phase: 'activation', subcontractorId: 'SC09' },
  { zoneId: 'Z03', phase: 'pole_installation', subcontractorId: 'SC02' },
  { zoneId: 'Z03', phase: 'cable', subcontractorId: 'SC02' },
  { zoneId: 'Z03', phase: 'activation', subcontractorId: 'SC13' },
  { zoneId: 'Z04', phase: 'pole_installation', subcontractorId: 'SC06' },
  { zoneId: 'Z04', phase: 'cable', subcontractorId: 'SC07' },
  { zoneId: 'Z04', phase: 'activation', subcontractorId: 'SC07' },
  { zoneId: 'Z05', phase: 'pole_installation', subcontractorId: 'SC04' },
  { zoneId: 'Z05', phase: 'cable', subcontractorId: 'SC11' },
  { zoneId: 'Z05', phase: 'activation', subcontractorId: 'SC15' },
  { zoneId: 'Z06', phase: 'pole_installation', subcontractorId: 'SC10' },
  { zoneId: 'Z06', phase: 'cable', subcontractorId: 'SC08' },
  { zoneId: 'Z06', phase: 'activation', subcontractorId: 'SC15' },
  { zoneId: 'Z07', phase: 'pole_installation', subcontractorId: 'SC12' },
  { zoneId: 'Z07', phase: 'cable', subcontractorId: 'SC03' },
  { zoneId: 'Z07', phase: 'activation', subcontractorId: 'SC09' },
  { zoneId: 'Z08', phase: 'pole_installation', subcontractorId: 'SC14' },
  { zoneId: 'Z08', phase: 'cable', subcontractorId: 'SC07' },
  { zoneId: 'Z08', phase: 'activation', subcontractorId: 'SC13' },
  { zoneId: 'Z09', phase: 'pole_installation', subcontractorId: 'SC06' },
  { zoneId: 'Z09', phase: 'cable', subcontractorId: 'SC05' },
  { zoneId: 'Z09', phase: 'activation', subcontractorId: 'SC09' },
  { zoneId: 'Z10', phase: 'pole_installation', subcontractorId: 'SC14' },
  { zoneId: 'Z10', phase: 'cable', subcontractorId: 'SC11' },
  { zoneId: 'Z10', phase: 'activation', subcontractorId: 'SC13' },
  { zoneId: 'Z11', phase: 'pole_installation', subcontractorId: 'SC10' },
  { zoneId: 'Z11', phase: 'cable', subcontractorId: 'SC08' },
  { zoneId: 'Z11', phase: 'activation', subcontractorId: 'SC15' },
  { zoneId: 'Z12', phase: 'pole_installation', subcontractorId: 'SC12' },
  { zoneId: 'Z12', phase: 'cable', subcontractorId: 'SC03' },
  { zoneId: 'Z12', phase: 'activation', subcontractorId: 'SC09' },
];

// Warehouse issuances
export const ISSUANCES = [
  { id: 'ISS001', date: '2025-01-06', subcontractorId: 'SC01', quantity: 80, reference: 'WH-2025-001', issuedBy: 'K. Moyo' },
  { id: 'ISS002', date: '2025-01-08', subcontractorId: 'SC02', quantity: 70, reference: 'WH-2025-002', issuedBy: 'K. Moyo' },
  { id: 'ISS003', date: '2025-01-10', subcontractorId: 'SC01', quantity: 50, reference: 'WH-2025-003', issuedBy: 'T. Vilakazi' },
  { id: 'ISS004', date: '2025-01-13', subcontractorId: 'SC04', quantity: 65, reference: 'WH-2025-004', issuedBy: 'T. Vilakazi' },
  { id: 'ISS005', date: '2025-01-15', subcontractorId: 'SC06', quantity: 90, reference: 'WH-2025-005', issuedBy: 'K. Moyo' },
  { id: 'ISS006', date: '2025-01-17', subcontractorId: 'SC10', quantity: 55, reference: 'WH-2025-006', issuedBy: 'K. Moyo' },
  { id: 'ISS007', date: '2025-01-20', subcontractorId: 'SC12', quantity: 100, reference: 'WH-2025-007', issuedBy: 'T. Vilakazi' },
  { id: 'ISS008', date: '2025-01-22', subcontractorId: 'SC14', quantity: 80, reference: 'WH-2025-008', issuedBy: 'K. Moyo' },
  { id: 'ISS009', date: '2025-02-03', subcontractorId: 'SC02', quantity: 80, reference: 'WH-2025-009', issuedBy: 'T. Vilakazi' },
  { id: 'ISS010', date: '2025-02-05', subcontractorId: 'SC06', quantity: 60, reference: 'WH-2025-010', issuedBy: 'K. Moyo' },
  { id: 'ISS011', date: '2025-02-10', subcontractorId: 'SC04', quantity: 75, reference: 'WH-2025-011', issuedBy: 'K. Moyo' },
  { id: 'ISS012', date: '2025-02-14', subcontractorId: 'SC14', quantity: 50, reference: 'WH-2025-012', issuedBy: 'T. Vilakazi' },
];

// Work logs - pole installations
export const POLE_INSTALLATIONS = [
  { id: 'PI001', date: '2025-01-09', zoneId: 'Z01', subcontractorId: 'SC01', quantity: 45, notes: 'Morning shift, good conditions', supervisor: 'T. Khumalo' },
  { id: 'PI002', date: '2025-01-12', zoneId: 'Z01', subcontractorId: 'SC01', quantity: 52, notes: 'Completed northern blocks', supervisor: 'T. Khumalo' },
  { id: 'PI003', date: '2025-01-14', zoneId: 'Z02', subcontractorId: 'SC01', quantity: 41, notes: 'Partial completion', supervisor: 'T. Khumalo' },
  { id: 'PI004', date: '2025-01-16', zoneId: 'Z03', subcontractorId: 'SC02', quantity: 68, notes: 'Main avenue done', supervisor: 'S. Dlamini' },
  { id: 'PI005', date: '2025-01-19', zoneId: 'Z05', subcontractorId: 'SC04', quantity: 55, notes: '', supervisor: 'B. Nkosi' },
  { id: 'PI006', date: '2025-01-21', zoneId: 'Z07', subcontractorId: 'SC12', quantity: 80, notes: 'Town centre complete', supervisor: 'M. Buthelezi' },
  { id: 'PI007', date: '2025-01-23', zoneId: 'Z04', subcontractorId: 'SC06', quantity: 70, notes: 'East grid complete', supervisor: 'M. Ntuli' },
  { id: 'PI008', date: '2025-01-25', zoneId: 'Z06', subcontractorId: 'SC10', quantity: 50, notes: '', supervisor: 'L. Mthembu' },
  { id: 'PI009', date: '2025-01-28', zoneId: 'Z08', subcontractorId: 'SC14', quantity: 60, notes: '', supervisor: 'S. Mkhize' },
  { id: 'PI010', date: '2025-02-03', zoneId: 'Z02', subcontractorId: 'SC01', quantity: 38, notes: 'Final poles for Z02', supervisor: 'T. Khumalo' },
  { id: 'PI011', date: '2025-02-06', zoneId: 'Z03', subcontractorId: 'SC02', quantity: 60, notes: 'Ext 1 fully poled', supervisor: 'S. Dlamini' },
  { id: 'PI012', date: '2025-02-09', zoneId: 'Z09', subcontractorId: 'SC06', quantity: 55, notes: '', supervisor: 'M. Ntuli' },
  { id: 'PI013', date: '2025-02-11', zoneId: 'Z10', subcontractorId: 'SC14', quantity: 48, notes: '', supervisor: 'S. Mkhize' },
  { id: 'PI014', date: '2025-02-13', zoneId: 'Z05', subcontractorId: 'SC04', quantity: 60, notes: 'Z05 complete', supervisor: 'B. Nkosi' },
  { id: 'PI015', date: '2025-02-17', zoneId: 'Z11', subcontractorId: 'SC10', quantity: 40, notes: '', supervisor: 'L. Mthembu' },
  { id: 'PI016', date: '2025-02-19', zoneId: 'Z12', subcontractorId: 'SC12', quantity: 75, notes: '', supervisor: 'M. Buthelezi' },
  { id: 'PI017', date: '2025-02-22', zoneId: 'Z08', subcontractorId: 'SC14', quantity: 40, notes: 'Z08 complete', supervisor: 'S. Mkhize' },
  { id: 'PI018', date: '2025-02-25', zoneId: 'Z07', subcontractorId: 'SC12', quantity: 55, notes: 'Dobsonville fully poled', supervisor: 'M. Buthelezi' },
];

// Cable installations
export const CABLE_INSTALLATIONS = [
  { id: 'CI001', date: '2025-01-30', zoneId: 'Z01', subcontractorId: 'SC03', polesConnected: 97, cableMeters: 4200, notes: 'Z01 cabling complete', supervisor: 'L. Mokoena' },
  { id: 'CI002', date: '2025-02-07', zoneId: 'Z03', subcontractorId: 'SC02', polesConnected: 128, cableMeters: 5800, notes: '', supervisor: 'S. Dlamini' },
  { id: 'CI003', date: '2025-02-12', zoneId: 'Z04', subcontractorId: 'SC07', polesConnected: 70, cableMeters: 3100, notes: '', supervisor: 'P. Radebe' },
  { id: 'CI004', date: '2025-02-15', zoneId: 'Z07', subcontractorId: 'SC03', polesConnected: 80, cableMeters: 3500, notes: 'Partial - main road done', supervisor: 'L. Mokoena' },
  { id: 'CI005', date: '2025-02-20', zoneId: 'Z05', subcontractorId: 'SC11', polesConnected: 115, cableMeters: 5100, notes: 'Z05 cabling complete', supervisor: 'N. Cele' },
  { id: 'CI006', date: '2025-02-24', zoneId: 'Z02', subcontractorId: 'SC05', polesConnected: 79, cableMeters: 3400, notes: '', supervisor: 'Z. Sithole' },
  { id: 'CI007', date: '2025-02-28', zoneId: 'Z07', subcontractorId: 'SC03', polesConnected: 55, cableMeters: 2400, notes: 'Z07 cabling complete', supervisor: 'L. Mokoena' },
];

// Household activations
export const ACTIVATIONS = [
  { id: 'ACT001', date: '2025-02-14', zoneId: 'Z01', subcontractorId: 'SC09', householdsActivated: 48, notes: 'Phase 1 activation', supervisor: 'N. Zulu' },
  { id: 'ACT002', date: '2025-02-18', zoneId: 'Z01', subcontractorId: 'SC09', householdsActivated: 35, notes: 'Phase 2 activation', supervisor: 'N. Zulu' },
  { id: 'ACT003', date: '2025-02-21', zoneId: 'Z03', subcontractorId: 'SC13', householdsActivated: 62, notes: '', supervisor: 'T. Ngubane' },
  { id: 'ACT004', date: '2025-02-26', zoneId: 'Z04', subcontractorId: 'SC07', householdsActivated: 44, notes: '', supervisor: 'P. Radebe' },
  { id: 'ACT005', date: '2025-03-03', zoneId: 'Z05', subcontractorId: 'SC15', householdsActivated: 71, notes: '', supervisor: 'A. Ndlovu' },
  { id: 'ACT006', date: '2025-03-06', zoneId: 'Z07', subcontractorId: 'SC09', householdsActivated: 88, notes: 'Dobsonville Core complete', supervisor: 'N. Zulu' },
];

export const WAREHOUSE_STOCK = {
  totalStock: 1500,
  currentBalance: 397,
};


import { createContext, useContext, useReducer } from 'react';
const initialState = {
  zones: ZONES,
  subcontractors: SUBCONTRACTORS,
  zoneAssignments: ZONE_ASSIGNMENTS,
  issuances: ISSUANCES,
  poleInstallations: POLE_INSTALLATIONS,
  cableInstallations: CABLE_INSTALLATIONS,
  activations: ACTIVATIONS,
  warehouseStock: WAREHOUSE_STOCK,
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ISSUANCE':
      return { ...state, issuances: [...state.issuances, { id: `ISS${Date.now()}`, ...action.payload }] };
    case 'ADD_POLE_INSTALLATION':
      return { ...state, poleInstallations: [...state.poleInstallations, { id: `PI${Date.now()}`, ...action.payload }] };
    case 'ADD_CABLE_INSTALLATION':
      return { ...state, cableInstallations: [...state.cableInstallations, { id: `CI${Date.now()}`, ...action.payload }] };
    case 'ADD_ACTIVATION':
      return { ...state, activations: [...state.activations, { id: `ACT${Date.now()}`, ...action.payload }] };
    case 'ADD_SUBCONTRACTOR':
      return { ...state, subcontractors: [...state.subcontractors, action.payload] };
    case 'EDIT_SUBCONTRACTOR':
      return { ...state, subcontractors: state.subcontractors.map(sc => sc.id === action.payload.id ? { ...sc, ...action.payload } : sc) };
    case 'DELETE_SUBCONTRACTOR':
      return { ...state, subcontractors: state.subcontractors.filter(sc => sc.id !== action.payload) };
    case 'ADD_ZONE':
      return { ...state, zones: [...state.zones, action.payload] };
    case 'EDIT_ZONE':
      return { ...state, zones: state.zones.map(z => z.id === action.payload.id ? { ...z, ...action.payload } : z) };
    case 'DELETE_ZONE':
      return { ...state, zones: state.zones.filter(z => z.id !== action.payload) };
    default:
      return state;
  }
}

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Computed: poles installed per zone
  const polesInstalledByZone = state.zones.reduce((acc, zone) => {
    acc[zone.id] = state.poleInstallations
      .filter(p => p.zoneId === zone.id)
      .reduce((sum, p) => sum + p.quantity, 0);
    return acc;
  }, {});

  // Computed: poles cabled per zone
  const polesCabledByZone = state.zones.reduce((acc, zone) => {
    acc[zone.id] = state.cableInstallations
      .filter(c => c.zoneId === zone.id)
      .reduce((sum, c) => sum + c.polesConnected, 0);
    return acc;
  }, {});

  // Computed: households activated per zone
  const householdsActivatedByZone = state.zones.reduce((acc, zone) => {
    acc[zone.id] = state.activations
      .filter(a => a.zoneId === zone.id)
      .reduce((sum, a) => sum + a.householdsActivated, 0);
    return acc;
  }, {});

  // Computed: zone status
  const zoneStatus = state.zones.reduce((acc, zone) => {
    const installed = polesInstalledByZone[zone.id] || 0;
    const cabled = polesCabledByZone[zone.id] || 0;
    const activated = householdsActivatedByZone[zone.id] || 0;
    const poleComplete = installed >= zone.targetPoles;
    const cableComplete = poleComplete && cabled >= installed * 0.9;
    const activationStarted = activated > 0;

    let status = 'not_started';
    if (activated > 0) status = cableComplete ? 'activated' : 'activating';
    else if (cabled > 0) status = cableComplete ? 'cabled' : 'cabling';
    else if (installed > 0) status = poleComplete ? 'poles_complete' : 'poles_in_progress';

    acc[zone.id] = { installed, cabled, activated, poleComplete, cableComplete, activationStarted, status };
    return acc;
  }, {});

  // Computed: poles issued per subcontractor
  const polesIssuedBySC = state.subcontractors.reduce((acc, sc) => {
    acc[sc.id] = state.issuances
      .filter(i => i.subcontractorId === sc.id)
      .reduce((sum, i) => sum + i.quantity, 0);
    return acc;
  }, {});

  // Computed: poles installed per subcontractor
  const polesInstalledBySC = state.subcontractors.reduce((acc, sc) => {
    acc[sc.id] = state.poleInstallations
      .filter(p => p.subcontractorId === sc.id)
      .reduce((sum, p) => sum + p.quantity, 0);
    return acc;
  }, {});

  // Computed: cable per subcontractor (poles connected)
  const polesCabledBySC = state.subcontractors.reduce((acc, sc) => {
    acc[sc.id] = state.cableInstallations
      .filter(c => c.subcontractorId === sc.id)
      .reduce((sum, c) => sum + c.polesConnected, 0);
    return acc;
  }, {});

  // Computed: cable meters per subcontractor
  const cableMetersBySC = state.subcontractors.reduce((acc, sc) => {
    acc[sc.id] = state.cableInstallations
      .filter(c => c.subcontractorId === sc.id)
      .reduce((sum, c) => sum + (c.cableMeters || 0), 0);
    return acc;
  }, {});

  // Computed: households activated per subcontractor
  const householdsActivatedBySC = state.subcontractors.reduce((acc, sc) => {
    acc[sc.id] = state.activations
      .filter(a => a.subcontractorId === sc.id)
      .reduce((sum, a) => sum + a.householdsActivated, 0);
    return acc;
  }, {});

  // Summary metrics
  const totalPolesIssued = state.issuances.reduce((s, i) => s + i.quantity, 0);
  const totalPolesInstalled = state.poleInstallations.reduce((s, p) => s + p.quantity, 0);
  const totalPolesCabled = state.cableInstallations.reduce((s, c) => s + c.polesConnected, 0);
  const totalHouseholds = state.activations.reduce((s, a) => s + a.householdsActivated, 0);
  const totalTargetPoles = state.zones.reduce((s, z) => s + z.targetPoles, 0);
  const warehouseBalance = WAREHOUSE_STOCK.totalStock - totalPolesIssued;

  const computed = {
    polesInstalledByZone,
    polesCabledByZone,
    householdsActivatedByZone,
    zoneStatus,
    polesIssuedBySC,
    polesInstalledBySC,
    polesCabledBySC,
    cableMetersBySC,
    householdsActivatedBySC,
    totalPolesIssued,
    totalPolesInstalled,
    totalPolesCabled,
    totalHouseholds,
    totalTargetPoles,
    warehouseBalance,
  };

  return (
    <StoreContext.Provider value={{ state, dispatch, computed }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);