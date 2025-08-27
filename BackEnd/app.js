const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectToDB = require("./config/db.config");
connectToDB();
const patientsRoutes = require("./Routes/patients.routes");
const doctorRoutes = require("./Routes/doctor.routes");
const appointmentRoutes = require("./Routes/appointment.routes");
const medicalRecordRoutes = require("./Routes/medicalRecord.routes");
const emailRoutes = require("./Routes/email.routes");
const moment = require("moment-timezone");

// Set Karachi timezone
const timezone = "Asia/Karachi";

// Middleware to get current time in Karachi timezone
app.use((req, res, next) => {
  req.currentTimeInKarachi = moment.tz(timezone).format("YYYY-MM-DD HH:mm:ss");
  next();
});

const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/patients", patientsRoutes);
app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/medicalRecord", medicalRecordRoutes);
app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

module.exports = app;
