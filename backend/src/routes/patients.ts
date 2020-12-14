/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from "express";
const router = express.Router();

import patientService from "../services/patientService";
import utils from "../utils";

// Temporary validation as of 9.19.
import { AllEntryTypes } from "../types";

router.get("/:id", (req, res) => {
  // 1. Find diary data through patientService
  const foundPatient = patientService.findById(req.params.id);

  if (foundPatient) {
    // 2. Parse found diary data through utils (later). As of 9.19 it is enough to check that field type has a correct value
    const allValidEntryTypes =
      foundPatient?.entries
        .map((entry) => Object.values(AllEntryTypes).includes(entry.type))
        .findIndex((result) => result === false) === -1;
    if (allValidEntryTypes) {
      res.send(foundPatient);
    } else {
      res.status(404).send({ error: "Incorrect type found" });
    }
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

router.post("/:id/entries", (req, res) => {
  try {
    const foundPatient = patientService.findById(req.params.id);
    if (foundPatient) {
      const parsedEntry = utils.toNewDoctorVisitEntry(req.body);
      /*       const updatedPatientEntry = patientService.addNewDoctorVisitEntry(
        foundPatient.id,
        parsedEntry
      ); */
      res.json(parsedEntry);
    } else {
      res.status(404).send({ error: "Not found" });
    }
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

export default router;
