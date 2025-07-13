const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const PatientController = require("../controllers/patient.controller");
const authMiddleware = require("../Middlewares/Auth.middleware");
const PatientModel = require("../models/Patient.model");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be 8 charaters long"),
    body("fullname")
      .isLength({ min: 3 })
      .withMessage("fullname must be 3 characters long"),
  ],
  PatientController.registerPatient
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be 8 charaters long"),
  ],
  PatientController.loginPatient
);

router.get(
  "/dashboard",
  authMiddleware.PatientAuth,
  PatientController.getPatientDashboard
);

module.exports = router;
