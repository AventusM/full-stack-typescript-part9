// import data
import { v4 as uuidv4 } from "uuid";
import { patientData } from "../../data/patients";
// import types
import { NewPatient, NONCriticalPatientData, Patient } from "../types";
// function to be exported, using data and types
const getNonSSNPatientsData = (): NONCriticalPatientData[] => {
  // Remember to filter out data itself as TypeScript doesnt filter it by itself
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatientEntry = (patientEntry: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuidv4(),
    ...patientEntry,
  };

  patientData.push(newPatientEntry);
  return newPatientEntry;
};

export default { getNonSSNPatientsData, addPatientEntry };
