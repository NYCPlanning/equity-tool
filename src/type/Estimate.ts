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
// properties for denominator and median rows
export interface Estimate {
  id: string;
  label: string;
  datum: EstimateDatum;
  percent: EstimatePercent;
}
