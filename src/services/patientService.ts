// import data
import { patientData } from "../../data/patients";
// import types
import { NONCriticalPatientData } from "../types";
// function to be exported, using data and types
export const getNonSSNPatientsData = (): NONCriticalPatientData[] => {
  // Remember to filter out data itself as TypeScript doesnt filter it by itself
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
