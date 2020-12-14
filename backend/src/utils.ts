/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
  NewDoctorVisitEntry,
  AllEntryTypes,
  DischargeInfo,
  SickLeaveInfo,
} from "./types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

import { diagnosisData } from "../data/diagnoses";

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

const isDoctorVisitType = (param: any): param is AllEntryTypes => {
  console.log("isDoctorVisitType param", param);
  return Object.values(AllEntryTypes).includes(param);
};

const isArray = (param: any): param is Array<any> => {
  return Array.isArray(param);
};

const isDiagnosisArray = (params: any): params is string[] => {
  const diagnosisCodes = diagnosisData.map(({ code }) => code);

  const keysIncludedStatus = params.map((param: any) =>
    Object.values(diagnosisCodes).includes(param)
  );

  const noFalseKeysIncluded =
    keysIncludedStatus.findIndex((result: boolean) => result === false) === -1;
  return noFalseKeysIncluded;
};

const isDischargeInfo = (param: any): param is DischargeInfo => {
  return (
    "date" in param &&
    "criteria" in param &&
    isDate(param.date) &&
    isString(param.criteria)
  );
};

const isParamSickLeaveInfo = (param: any): param is SickLeaveInfo => {
  return (
    "startDate" in param &&
    "endDate" in param &&
    isDate(param.startDate) &&
    isDate(param.endDate)
  );
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

const parseDescription = (paramDescription: any): string => {
  if (!paramDescription || !isString(paramDescription)) {
    throw new Error(
      "Incorrect or missing paramDescription: " + paramDescription
    );
  }
  return paramDescription;
};

const parseSpecialist = (paramSpecialist: any): string => {
  if (!paramSpecialist || !isString(paramSpecialist)) {
    throw new Error("Incorrect or missing paramSpecialist: " + paramSpecialist);
  }
  return paramSpecialist;
};

const parseDoctorVisitType = (paramVisitType: any): AllEntryTypes => {
  if (!paramVisitType || !isDoctorVisitType(paramVisitType)) {
    throw new Error("Incorrect or missing paramVisitType: " + paramVisitType);
  }
  return paramVisitType;
};

const parseDiagnosisCodes = (
  paramDiagnosisCodes: any
): string[] | undefined => {
  if (!paramDiagnosisCodes) return undefined;
  else if (
    !isArray(paramDiagnosisCodes) ||
    !isDiagnosisArray(paramDiagnosisCodes)
  ) {
    throw new Error(
      "Erroneous paramDiagnosisCode(s) found within data set " +
        paramDiagnosisCodes
    );
  }

  return paramDiagnosisCodes;
};

const parseDischargeInfo = (paramDischarge: any): DischargeInfo => {
  if (!paramDischarge || !isDischargeInfo(paramDischarge)) {
    throw new Error(
      "Incorrect paramDischarge (date / criteria) " +
        paramDischarge.date +
        " / " +
        paramDischarge.criteria
    );
  }

  return paramDischarge;
};

const parseSickLeave = (paramSickLeave: any): SickLeaveInfo | undefined => {
  if (!paramSickLeave) {
    return undefined;
  }
  if (!isParamSickLeaveInfo(paramSickLeave)) {
    throw new Error(
      "Incorrect paramSickLeave (startDate / endDate) " +
        paramSickLeave.startDate +
        " / " +
        paramSickLeave.endDate
    );
  }
  return paramSickLeave;
};

const parseHealthCheckRating = (paramHealthCheckRating: any): number => {
  if (!paramHealthCheckRating || !Number(paramHealthCheckRating)) {
    throw new Error(
      "Incorrect or missing paramHealthCheckRating: " + paramHealthCheckRating
    );
  }
  return paramHealthCheckRating;
};

const parseEmployerName = (paramEmployerName: any): string => {
  if (!paramEmployerName || !isString(paramEmployerName)) {
    throw new Error(
      "Incorrect or missing paramEmployerName: " + paramEmployerName
    );
  }

  return paramEmployerName;
};

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSSN(object.ssn),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: [], // TODO: parseEntries or something like that in the future
  };

  return newPatient;
};

const toNewDoctorVisitEntry = (object: any): NewDoctorVisitEntry => {
  const type: AllEntryTypes = parseDoctorVisitType(object.type);

  switch (type) {
    case AllEntryTypes.Hospital:
      return {
        date: parseDate(object.date),
        description: parseDescription(object.description),
        specialist: parseSpecialist(object.specialist),
        type,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        discharge: parseDischargeInfo(object.discharge),
      };
    case AllEntryTypes.OccupationalHealthCare:
      return {
        date: parseDate(object.date),
        description: parseDescription(object.description),
        specialist: parseSpecialist(object.specialist),
        type,
        diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave), // Optional
      };
    case AllEntryTypes.HealthCheck:
      return {
        date: parseDate(object.date),
        description: parseDescription(object.description),
        specialist: parseSpecialist(object.specialist),
        type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    default:
      return assertNever(type);
  }
};

export default {
  toNewDiaryEntry,
  toNewPatient,
  toNewDoctorVisitEntry,
};
