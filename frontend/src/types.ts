export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[]; // Can do this also: Array<Diagnosis['code']> OR Diagnosis['code'][]
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum AllEntryTypes {
  Hospital = "Hospital",
  OccupationalHealthCare = "OccupationalHealthCare",
  HealthCheck = "HealthCheck",
}

export interface HealthCheckEntry extends BaseEntry {
  type: AllEntryTypes.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

interface SickLeaveInfo {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: AllEntryTypes.OccupationalHealthCare;
  employerName: string;
  sickLeave?: SickLeaveInfo; // Optional
}

interface DischargeInfo {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: AllEntryTypes.Hospital;
  discharge: DischargeInfo;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type DoctorDiagnosisFormValues = Omit<HealthCheckEntry, "id">;
//| Omit<HospitalEntry, "id">
//| Omit<OccupationalHealthcareEntry, "id">;
