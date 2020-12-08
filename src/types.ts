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

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
};

export type NONCriticalPatientData = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;

export type Diagnosis = {
  code: string;
  name: string;
  latin?: string;
};
