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

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NONCriticalPatientData = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

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
