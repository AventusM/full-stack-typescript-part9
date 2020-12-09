/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
const router = express.Router();

import patientService from "../services/patientService";
import utils from "../utils";

router.get("/", (_req, res) => {
  res.send(patientService.getNonSSNPatientsData());
});

router.post("/", (req, res) => {
  try {
    const parsedPatientData = utils.toNewPatient(req.body);
    const addedPatientEntry = patientService.addPatientEntry(parsedPatientData);
    res.json(addedPatientEntry);
  } catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    res.status(400).send({ error: e.message });
  }
});

export default router;
