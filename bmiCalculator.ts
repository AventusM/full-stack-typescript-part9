type BMIResult = string;

interface NumberBMIArgs {
  heightCM: number;
  weightKG: number;
}

const parseBMIArguments = (args: Array<string>): NumberBMIArgs => {
  if (args.length !== 4)
    throw new Error(
      "Required arguments: 4, you have " + args.length + " arguments provided"
    );

  const numHeightCM: number = Number(args[2]);
  const numWeightKG: number = Number(args[3]);
  if (!isNaN(numHeightCM) && !isNaN(numWeightKG)) {
    return {
      heightCM: numHeightCM,
      weightKG: numWeightKG,
    };
  } else {
    throw new Error("Provided values weren't numbers!");
  }
};

const heightCMtoMeter = (heightCM: number): number => {
  return heightCM / 100;
};

export const calculateBmi = (heightCM: number, weightKG: number): BMIResult => {
  const bmi = weightKG / Math.pow(heightCMtoMeter(heightCM), 2);
  if (bmi < 18.5) return "You're underweight";
  else if (18.5 <= bmi && bmi < 25) return "Normal (healthy weight)";
  else if (25 <= bmi && bmi < 30) return "You're overweight";
  else return "You're obese";
};

try {
  const { heightCM, weightKG } = parseBMIArguments(process.argv);
  console.log(calculateBmi(heightCM, weightKG));
} catch (e) {
  console.log("Error, something bad happened, message:", e.message);
}

/*console.log(calculateBmi(180, 74));
console.log(calculateBmi(180, 84));
console.log(calculateBmi(180, 94));
console.log(calculateBmi(180, 104));
console.log(calculateBmi(180, 54));*/
