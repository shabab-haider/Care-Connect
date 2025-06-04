const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const doctorController = require("../controllers/doctor.controller");
const authMiddleware = require("../Middlewares/Auth.middleware");
const doctorModel = require("../models/doctor.model");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("wrong email"),
    body("fullname")
      .isLength({ min: 3 })
      .withMessage("firtname must be 3 characters long"),
    body("Password")
      .isLength({ min: 8 })
      .withMessage("password must be 8 characters long"),
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

router.post("/checkemail", doctorController.checkEmail);

router.post("/update",doctorController.updateDoctor)

router.get("/getdoctors", doctorController.getDoctors)

module.exports = router;
