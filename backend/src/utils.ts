/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  NewDiaryEntry,
  NewPatient,
  Visibility,
  Weather,
  Gender,
} from "./types";

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isWeather = (param: any): param is Weather => {
  return Object.values(Weather).includes(param);
};

const isVisibility = (param: any): param is Visibility => {
  return Object.values(Visibility).includes(param);
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseComment = (comment: any): string => {
  if (!comment || !isString(comment)) {
    throw new Error("Incorrect or missing comment: " + comment);
  }

  return comment;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date: " + date);
  }
  return date;
};

const parseWeather = (weather: any): Weather => {
  if (!weather || !isWeather(weather)) {
    throw new Error("Incorrect or missing weather: " + weather);
  }
  return weather;
};

const parseVisibility = (visibility: any): Visibility => {
  if (!visibility || !isVisibility(visibility)) {
    throw new Error("Incorrect or missing visibility: " + visibility);
  }
  return visibility;
};

const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    date: parseDate(object.date),
    comment: parseComment(object.comment),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
  };

  return newEntry;
};

const parseName = (paramName: any): string => {
  if (!paramName || !isString(paramName)) {
    throw new Error("Incorrect or missing paramName: " + paramName);
  }

  return paramName;
};

const parseDateOfBirth = (paramDOB: any): string => {
  if (!paramDOB || !isString(paramDOB)) {
    throw new Error("Incorrect or missing paramDOB: " + paramDOB);
  }

  return paramDOB;
};

const parseSSN = (paramSsn: any): string => {
  if (!paramSsn || !isString(paramSsn)) {
    throw new Error("Incorrect or missing paramSsn: " + paramSsn);
  }

  return paramSsn;
};

const parseOccupation = (paramOccupation: any): string => {
  if (!paramOccupation || !isString(paramOccupation)) {
    throw new Error("Incorrect or missing paramOccupation: " + paramOccupation);
  }

  return paramOccupation;
};

const parseGender = (paramGender: any): Gender => {
  if (!paramGender || !isGender(paramGender)) {
    throw new Error("Incorrect or missing paramGender: " + paramGender);
  }

  return paramGender;
};

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
  };

  return newPatient;
};

export default {
  toNewDiaryEntry,
  toNewPatient,
};
