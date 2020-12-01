import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(404).send({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(Number(weight), Number(height));
  res.send({
    weight,
    height,
    bmi,
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
