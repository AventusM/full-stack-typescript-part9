"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiagnoses = void 0;
// import data
const diagnoses_1 = require("../../data/diagnoses");
// function to be exported, using data and types
const getDiagnoses = () => {
    return diagnoses_1.diagnosisData;
};
exports.getDiagnoses = getDiagnoses;
