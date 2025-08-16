const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const PatientController = require("../controllers/patient.controller");
const authMiddleware = require("../Middlewares/Auth.middleware");

// Register patient
router.post(
  "/register",
  [
    body("fullname")
      .isLength({ min: 3 })
      .withMessage("Fullname must be at least 3 characters long"),
    body("isOffline")
      .optional()
      .isBoolean()
      .withMessage("isOffline must be a boolean"),

    // Email & password required only if NOT offline
    body("email")
      .if((value, { req }) => !req.body.isOffline)
      .isEmail()
      .withMessage("Invalid Email"),
    body("password")
      .if((value, { req }) => !req.body.isOffline)
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  PatientController.registerPatient
);

// Login (online patients only)
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  PatientController.loginPatient
);

// Dashboard (auth required)
router.get(
  "/dashboard",
  authMiddleware.PatientAuth,
  PatientController.getPatientDashboard
);

module.exports = router;
