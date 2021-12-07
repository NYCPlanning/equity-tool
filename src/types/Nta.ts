import ntas from "@data/ntas.json";

// This file takes the type automatically created by TS based on ntas.json and
// decomposes it into some helpful utliity types for working with those records.
// This code will likely go away as we move to a real back end for our indicator data

export type NtaId = keyof typeof ntas;

export type NtaIndicatorRecord = typeof ntas["BK0101"];

export type NtaIndicatorDict = typeof ntas;
