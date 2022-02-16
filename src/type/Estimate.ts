interface EstimateDatum {
  value: number;
  marginOfError: number;
  coefficientOfVariation: number;
}

interface EstimatePercent {
  value: number;
  marginOfError: number;
}

// This should probably be refactored to have special
// properties for denominator and median rows.
// For now, each row in the table corresponds to an Estimate
export interface Estimate {
  id: string;
  label: string;
  datum: EstimateDatum;
  percent?: EstimatePercent;
}
