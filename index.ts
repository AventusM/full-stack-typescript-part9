import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises, ExerciseParameters } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(404).send({ error: "missing parameters" });
  } else if (isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(404).send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(Number(weight), Number(height));
  res.send({
    weight,
    height,
    bmi,
  });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseParameters;

  const hasNaNinArgs =
    daily_exercises
      .map((item: number) => isNaN(Number(item)))
      .filter((nanValue: boolean) => nanValue === false).length === 0;


  if (!daily_exercises || !target) {
    res.status(404).send({ error: "missing parameters" });
  } else if (isNaN(target) || hasNaNinArgs) {
    res.status(404).send({ error: "malformatted parameters" });
  }

  const exerciseResult = calculateExercises(daily_exercises, target);
  res.send({
    ...exerciseResult,
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
