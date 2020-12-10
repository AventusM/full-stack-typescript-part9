import { DiaryEntry } from "../src/types";
import utils from "../src/utils";

const rawData = [
  {
    id: 1,
    date: "2017-01-01",
    weather: "rainy",
    visibility: "poor",
    comment: "Pretty scary flight, I'm glad I'm alive",
  },
  {
    id: 2,
    date: "2017-04-01",
    weather: "sunny",
    visibility: "good",
    comment: "Everything went better than expected, I'm learning much",
  },
  {
    id: 3,
    date: "2017-04-15",
    weather: "windy",
    visibility: "good",
    comment: "I'm getting pretty confident although I hit a flock of birds",
  },
  {
    id: 4,
    date: "2017-05-11",
    weather: "cloudy",
    visibility: "good",
    comment: "I almost failed the landing but I survived",
  },
];

export const diaries: DiaryEntry[] = rawData.map((object) => {
  const parsedObject = utils.toNewDiaryEntry(object) as DiaryEntry;

  parsedObject.id = object.id;
  return parsedObject;
});
