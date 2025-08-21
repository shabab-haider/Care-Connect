const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const doctorController = require("../controllers/doctor.controller");
const authMiddleware = require("../Middlewares/Auth.middleware");
const doctorModel = require("../models/doctor.model");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email format"),
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  doctorController.registerDoctor
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("wrong email"),
    body("Password")
      .isLength({ min: 8 })
      .withMessage("password must be 8 characters long"),
  ],
  doctorController.loginDoctor
);

router.get(
  "/dashboard",
  authMiddleware.doctorAuth,
  doctorController.getDoctorDashboard
);

router.get("/all", doctorController.getAllDoctors);

router.get("/:id", doctorController.getDoctorById);

router.get(
  "/:id/availability",
  doctorController.getDoctorAvailabilityNext7Days
);

router.get("/:id/tokens", doctorController.getDoctorTokens);

router.post("/:id/update", doctorController.updateDoctor);

router.get(
  "/getAppointments/:id",

  doctorController.getAppointments
);

module.exports = router;
