const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecord.controller");

router.post(
  "/createMedicalRecord/:doctorId/:patientId",
  medicalRecordController.createMedicalRecord
);

router.get(
  "/getMedicalRecords/:patientId",
  medicalRecordController.getMedicalRecords
);

router.get(
  "/valid-medical-records/:patientId",
  medicalRecordController.getValidMedicalRecords
);
module.exports = router;
