"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const diaries_1 = require("../../data/diaries");
// Avoid typecasting (xyzData as abcType) like in the row below
//const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;
// Array<DiaryEntry> = DiaryEntry[]
const getEntries = () => {
    return diaries_1.diaries;
};
// eslint complains with unused vars when using {comment, ...rest}
const getNonSensitiveEntries = () => {
    return diaries_1.diaries.map(({ id, date, weather, visibility }) => ({
        id,
        date,
        weather,
        visibility,
    }));
};
const addEntry = () => {
    return null;
};
exports.default = {
    getEntries,
    addEntry,
    getNonSensitiveEntries,
};
