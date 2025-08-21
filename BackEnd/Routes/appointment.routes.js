const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointment.controller");
const authMiddleware = require("../Middlewares/Auth.middleware");

router.post("/request", appointmentController.requestAppointment);

router.get(
  "/pending",
  authMiddleware.doctorAuth,
  appointmentController.getPendingAppointments
);

router.get("/:id/accept", appointmentController.acceptAppointmentRequest);
router.post("/reject", appointmentController.rejectAppointmentRequest);

router.get(
  "/booked/:date",
  authMiddleware.doctorAuth,
  appointmentController.getBookedAppointments
);

router.get("/NoShow/:id", appointmentController.setAppointmentToNoShaow);

router.get(
  "/missed/:date",
  authMiddleware.doctorAuth,
  appointmentController.getMissedAppointments
);

router.post("/moveToQueue", appointmentController.moveToQueue);

router.get(
  "/addOfflinePatient/:patientName/:phoneNumber/:gender",
  authMiddleware.doctorAuth,
  appointmentController.addOfflinePatient
);

module.exports = router;
