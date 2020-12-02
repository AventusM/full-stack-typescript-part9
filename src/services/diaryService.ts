import { diaries } from "../../data/diaries";
import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

// Avoid typecasting (xyzData as abcType) like in the row below
//const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

// Array<DiaryEntry> = DiaryEntry[]
const getEntries = (): DiaryEntry[] => {
  return diaries;
};

// eslint complains with unused vars when using {comment, ...rest}
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
};
