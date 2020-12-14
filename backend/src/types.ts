export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

//export type Visibility = "great" | "good" | "ok" | "poor";

// Changed to type and removed optional comment type in favor of new nonsensitive type
export type DiaryEntry = {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string; // Used to be comment? and didnt display an error when trying to substitute return type from DiaryEntry[] to NonSensitiveDiaryEntry[] on already mapped data in return (omitting comment)
};

// Pretty cool to have 'lodash' within
export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;

// No id ready when adding a new entry
export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export interface BaseEntry {
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

export interface SickLeaveInfo {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: AllEntryTypes.OccupationalHealthCare;
  employerName: string;
  sickLeave?: SickLeaveInfo; // Optional
}

export interface DischargeInfo {
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

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">; // What is this being used for? Material has something for this in 1 spot only

export type NONCriticalPatientData = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export type NewDoctorVisitEntry =
  | Omit<HospitalEntry, "id">
  | Omit<OccupationalHealthcareEntry, "id">
  | Omit<HealthCheckEntry, "id">;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};
