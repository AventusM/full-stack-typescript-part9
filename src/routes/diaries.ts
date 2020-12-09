/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
const router = express.Router();

import diaryService from "../services/diaryService";
import utils from "../utils";

router.get("/:id", (req, res) => {
  const foundDiary = diaryService.findById(Number(req.params.id));
  if (foundDiary) {
    res.send(foundDiary);
  } else {
    res.status(404).send({ error: "Not found" });
  }
});

router.get("/", (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  try {
    const newDiaryEntry = utils.toNewDiaryEntry(req.body);
    const addedEntry = diaryService.addDiaryEntry(newDiaryEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
