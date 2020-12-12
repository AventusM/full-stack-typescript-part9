/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
const router = express.Router();

import patientService from "../services/patientService";
import utils from "../utils";

router.get("/:id", (req, res) => {
  const foundPatient = patientService.findById(req.params.id);
  if (foundPatient) {
    res.send(foundPatient);
  } else {
    res.status(404).send({ error: "Not found" });
  }
});

router.get("/", (_req, res) => {
  res.send(patientService.getNonSSNPatientsData());
});

router.post("/", (req, res) => {
  try {
    const parsedPatientData = utils.toNewPatient(req.body);
    const addedPatientEntry = patientService.addPatientEntry(parsedPatientData);
    res.json(addedPatientEntry);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

export default router;
