interface ExerciseResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  target: number;
  average: number;
  rating: number;
  ratingDescription: string;
}

export interface ExerciseParameters {
  daily_exercises: Array<number>;
  target: number;
}

/*const parseExerciseArguments = (args: Array<string>): ExerciseParameters => {
  if (args.length < 4) throw new Error("Missing exercises");
  const isNumberTarget = !isNaN(Number(args[2]));
  const dailyExerciseArguments = args.slice(3);
  const areNumbersDaily = !dailyExerciseArguments
    .map((arg: string) => isNaN(parseFloat(arg)))
    .find((nanStatus: boolean) => nanStatus === true);

  if (isNumberTarget && areNumbersDaily) {
    return {
      args: dailyExerciseArguments.map((arg) => parseFloat(arg)),
      target: Number(args[2]),
    };
  } else {
    throw new Error("All arguments provided must be numbers!");
  }
};*/

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

export const calculateExercises = (
  args: Array<number>,
  target: number
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

/*try {
  const { args, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(args, target));
} catch (e) {
  console.log("Error, something bad happened, message: ", e);
}*/

//const exerciseResults = [3, 0, 2, 4.5, 0, 3, 1]; // TODO: Args number each?
//const avgHourlyTarget = 2; // TODO: Args number this too?
//console.log(calculateExercises(exerciseResults, avgHourlyTarget));
