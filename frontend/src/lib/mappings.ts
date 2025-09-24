// utils/partnershipMappings.ts
export const partnershipMappings = {
  // Frontend display values to backend enum values
  type: {
    "Individual": "Individual",
    "Corporate / Company": "Corporate", 
    "Strategic / Non-equity": "StrategicNonEquity",
    "Other": "Other"
  },
  
  board: {
    "No board seat": "None",
    "Observer seat": "Observer", 
    "One board seat": "OneSeat",
    "Multiple board seats": "MultipleSeats"
  },
  
  roleType: {
    "Passive investor": "PassiveInvestor",
    "Active partner - management": "ActivePartnerManagement",
    "Strategic advisor": "StrategicAdvisor",
    "Technical lead": "TechnicalLead"
  },
  
  dividend: {
    "Reinvest profits": "Reinvest",
    "Quarterly cash dividends": "QuarterlyCash",
    "Annual cash dividends": "AnnualCash",
    "Convertible instruments": "ConvertibleInstruments"
  },
  
  presence: {
    "Fully remote": "FullyRemote",
    "Occasional visits": "OccasionalVisits",
    "On-site / Local": "OnSiteLocal"
  }
} as const;

// Reverse mappings for displaying data
export const reverseMappings = {
  type: Object.fromEntries(Object.entries(partnershipMappings.type).map(([k, v]) => [v, k])),
  board: Object.fromEntries(Object.entries(partnershipMappings.board).map(([k, v]) => [v, k])),
  roleType: Object.fromEntries(Object.entries(partnershipMappings.roleType).map(([k, v]) => [v, k])),
  dividend: Object.fromEntries(Object.entries(partnershipMappings.dividend).map(([k, v]) => [v, k])),
  presence: Object.fromEntries(Object.entries(partnershipMappings.presence).map(([k, v]) => [v, k]))
};

export const mapFormDataToBackend = (formData: any) => {
  return {
    ...formData,
    // Convert numeric fields
    amount: parseFloat(formData.amount) || 0,
    equity: parseFloat(formData.equity) || 0,
    
    // Map enum values
    type: partnershipMappings.type[formData.type as keyof typeof partnershipMappings.type] || "Other",
    board: partnershipMappings.board[formData.board as keyof typeof partnershipMappings.board] || "None",
    roleType: partnershipMappings.roleType[formData.roleType as keyof typeof partnershipMappings.roleType] || "PassiveInvestor",
    dividend: partnershipMappings.dividend[formData.dividend as keyof typeof partnershipMappings.dividend] || "Reinvest",
    presence: partnershipMappings.presence[formData.presence as keyof typeof partnershipMappings.presence] || "FullyRemote",
    
    // Ensure arrays
    nonCash: Array.isArray(formData.nonCash) ? formData.nonCash : [],
    docs: Array.isArray(formData.docs) ? formData.docs : [],
    
    // Default values for optional fields
    contribOther: formData.contribOther || "",
    veto: formData.veto || "",
    kpis: formData.kpis || "",
    exit: formData.exit || "",
    ip: formData.ip || "",
    ethics: formData.ethics || "",
    timeline: formData.timeline || "",
    team: formData.team || "",
    signature: formData.signature || "",
  };
};

// utils/enums.ts
export const mapStatus = (status: string) => {
  switch (status) {
    case 'planning': return 'planning';
    case 'active': return 'active';
    case 'completed': return 'completed';
    case 'on-hold': return 'onHold'; // map UI "on-hold" -> backend "onHold"
    default: return 'planning';
  }
};

export const mapPriority = (priority: string) => {
  switch (priority) {
    case 'low': return 'low';
    case 'medium': return 'medium';
    case 'high': return 'high';
    default: return 'medium';
  }
};
