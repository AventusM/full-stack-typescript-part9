type exerciseValue = number;

interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  target: number;
  average: number;
  rating: number;
  ratingDescription: string;
}

interface ExerciseRating {
  rating: number;
  ratingDescription: string;
}

const rateExercisePeriod = (
  average: number,
  target: number
): ExerciseRating => {
  const difference: number = average - target;
  if (difference >= 0)
    return { rating: 3, ratingDescription: "Youre on target, keep it up!" };
  else if (-1 < difference && difference < 0)
    return { rating: 2, ratingDescription: "Doing well, can keep pushing!" };
  else
    return {
      rating: 1,
      ratingDescription: "Gotta improve those numbers my guy!",
    };
};

const calculateExercises = (
  args: Array<exerciseValue>,
  target: exerciseValue
): ExerciseResult => {
  const periodLength: number = args.length;
  const trainingDays: number = args.filter((day: number) => day > 0).length;
  const average: number = args.reduce((a, b) => a + b) / periodLength;
  const success = average >= target;
  const { rating, ratingDescription } = rateExercisePeriod(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const exerciseResults = [3, 0, 2, 4.5, 0, 3, 1]; // TODO: Args number each?
const avgHourlyTarget = 2; // TODO: Args number this too?

console.log(calculateExercises(exerciseResults, avgHourlyTarget));
