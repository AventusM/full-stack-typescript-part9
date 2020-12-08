import { diaries } from "../../data/diaries";
import { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from "../types";

// Avoid typecasting (xyzData as abcType) like in the row below
//const diaries: Array<DiaryEntry> = diaryData as Array<DiaryEntry>;

// Allow undefined result (naturally)
const findById = (id: number): DiaryEntry | undefined => {
  return diaries.find((diary) => diary.id === id);
};

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

const addDiaryEntry = (entry: NewDiaryEntry): DiaryEntry => {
  const newObject = {
    id: diaries.length + 1,
    ...entry,
  };

  diaries.push(newObject); // Cant use diaries = diaries.concat(...) since its not a variable
  return newObject;
};

export default {
  getEntries,
  addDiaryEntry,
  getNonSensitiveEntries,
  findById,
};
