// import data
import { diagnosisData } from "../../data/diagnoses";
// import types
import { Diagnosis } from "../types";
// function to be exported, using data and types
export const getDiagnoses = (): Diagnosis[] => {
  return diagnosisData;
};
