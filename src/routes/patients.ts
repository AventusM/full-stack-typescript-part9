/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
const router = express.Router();

import patientService from "../services/patientService";

router.get("/", (_req, res) => {
  res.send(patientService.getNonSSNPatientsData());
});

router.post("/", (req, res) => {
  try {
    //const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatientEntry = patientService.addPatientEntry(req.body);
    res.json(addedPatientEntry);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

export default router;
