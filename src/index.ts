import express from "express";
import cors from "cors";
import diaryRouter from "./routes/diaries";
import diagnosisRouter from "./routes/diagnoses";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pongers");
});

app.use("/api/diaries", diaryRouter);
app.use("/api/diagnoses", diagnosisRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
