import express from "express";
import { getNonSSNPatientsData } from "../services/patientService";

const router = express.Router();
router.get("/", (_req, res) => {
  res.send(getNonSSNPatientsData());
});

export default router;
