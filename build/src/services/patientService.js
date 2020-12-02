"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNonSSNPatientsData = void 0;
// import data
const patients_1 = require("../../data/patients");
// function to be exported, using data and types
const getNonSSNPatientsData = () => {
    // Remember to filter out data itself as TypeScript doesnt filter it by itself
    return patients_1.patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
exports.getNonSSNPatientsData = getNonSSNPatientsData;
