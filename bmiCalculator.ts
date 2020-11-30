type Result = string;

const heightCMtoMeter = (heightCM: number): number => {
  return heightCM / 100;
};

const calculateBmi = (heightCM: number, weightKG: number): Result => {
  const bmi = weightKG / Math.pow(heightCMtoMeter(heightCM), 2);
  if (bmi < 18.5) return "You're underweight";
  else if (18.5 <= bmi && bmi < 25) return "Normal (healthy weight)";
  else if (25 <= bmi && bmi < 30) return "You're overweight";
  else return "You're obese";
};

console.log(calculateBmi(180, 74));
console.log(calculateBmi(180, 84));
console.log(calculateBmi(180, 94));
console.log(calculateBmi(180, 104));
console.log(calculateBmi(180, 54));
