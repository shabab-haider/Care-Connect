const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const connectToDB = require("./config/db.config");
connectToDB();
const patientsRoutes = require("./Routes/patients.routes");
const doctorRoutes = require("./Routes/doctor.routes");

const cookieParser = require("cookie-parser");
const cors = require("cors");

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/patients", patientsRoutes);
app.use("/doctors", doctorRoutes);

app.get("/", (req, res) => {
  res.send("home");
});

module.exports = app;
