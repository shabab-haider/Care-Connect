const { validationResult } = require("express-validator");
const PatientServices = require("../Services/patients.service");
const PatientModel = require("../models/Patient.model");
const bcrypt = require("bcrypt");
const appointmentModel = require("../models/appointment.model");
const doctorModel = require("../models/doctor.model");
const tokenModel = require("../models/token.model");
const moment = require("moment");

module.exports.registerPatient = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }

  try {
    let {
      fullname,
      email,
      password,
      dateOfBirth,
      phoneNumber,
      gender,
      isOffline = false,
    } = req.body;

    // Hash password only for online patients
    if (!isOffline) {
      const hash = await PatientModel.hashPassword(password);
      password = hash;
    } else {
      password = null;
      email = null;
    }

    const patient = await PatientServices.CreatePatient({
      fullname,
      email,
      password,
      dateOfBirth,
      gender,
      phoneNumber,
      isOffline,
    });

    const token = patient.genrateToken(); // Will be null for offline patients
    if (token) res.cookie("token", token);

    res.status(201).json({
      message: "Patient registered successfully",
      patient,
      token: token || null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering patient",
      error: error.message,
    });
  }
};

module.exports.loginPatient = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }

  const { email, password } = req.body;

  try {
    const patient = await PatientModel.findOne({ email }).select("+password");

    if (!patient || patient.isOffline) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const checkPassword = await bcrypt.compare(password, patient.password);
    if (!checkPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = patient.genrateToken();
    res.cookie("token", token);

    res.status(200).json({
      message: "Login successful",
      patient,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error logging in",
      error: error.message,
    });
  }
};

module.exports.getPatientDashboard = function (req, res) {
  res.status(200).json({ patient: req.Patient });
};

module.exports.getUpcomingAppointments = async function (req, res) {
  const patientId = req.Patient._id;

  try {
    // Fetch appointments for the given patient ID
    const appointments = await appointmentModel
      .find({ patient: patientId, status: { $in: ["booked", "pending"] } })
      .populate("doctor");

    const karachiDate = moment.tz("Asia/Karachi");
    const utcDate = moment.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[+00:00]");

    const appointmentDetails = await Promise.all(
      appointments.map(async (appointment) => {
        // Fetch token details
        const tokenDoc = await tokenModel.findOne({
          doctor: appointment.doctor._id,
        });

        // Find the specific token from the token list
        let tokenDetails = null;
        if (tokenDoc) {
          tokenDetails = tokenDoc.tokens
            .flatMap((token) => token.tokenList)
            .find((token) => token._id.equals(appointment.token));

          // Check if token date is before the current UTC date
          if (tokenDetails) {
            const tokenDateTime = moment(tokenDetails.date); // Assuming token has a date field
            if (tokenDateTime.isBefore(utcDate)) {
              tokenDetails = null; // Set to null if the token date is before the UTC date
            }
          }
        }

        // Continue with the rest of the logic only if tokenDetails is valid
        if (tokenDetails) {
          const timeInKarachi = moment
            .tz(tokenDetails.displayTime, "h:mm A", "UTC")
            .tz("Asia/Karachi");

          // Format the result to the same input format
          const formattedTime = timeInKarachi.format("h:mm A");

          // Get current time in Asia/Karachi timezone
          const currentTime = moment().tz("Asia/Karachi");

          // Get token time and format it
          const tokenTime = moment(formattedTime, "h:mm A").set({
            year: currentTime.year(),
            month: currentTime.month(),
            date: currentTime.date(),
          });

          // Create a moment object for the token time, using the appointment date
          const tokenDateTime = moment(
            `${appointment.date} ${formattedTime}`,
            "YYYY-MM-DD h:mm A"
          ).tz("Asia/Karachi");

          // Calculate estimated wait time in minutes
          const estimatedWaitMinutes = tokenDateTime.isAfter(currentTime)
            ? tokenDateTime.diff(currentTime, "minutes")
            : 0;

          // Function to format estimated wait time
          const formatWaitTime = (minutes) => {
            if (minutes <= 0) return "0 minutes";

            const days = Math.floor(minutes / (24 * 60));
            const hours = Math.floor((minutes % (24 * 60)) / 60);
            const mins = minutes % 60;

            let result = [];
            if (days > 0) result.push(`${days} day${days > 1 ? "s" : ""}`);
            if (hours > 0) result.push(`${hours} hour${hours > 1 ? "s" : ""}`);
            if (mins > 0) result.push(`${mins} minute${mins > 1 ? "s" : ""}`);

            return result.join(" ");
          };

          return {
            id: appointment.appointmentNo,
            date: appointment.date,
            time: formattedTime,
            tokenNumber: tokenDetails.tokenNumber,
            estimatedWait: formatWaitTime(estimatedWaitMinutes),
            doctor: {
              name: appointment.doctor.fullName,
              specialization:
                appointment.doctor.professionalDetails.specialization,
              clinic: appointment.doctor.clinicInfo.clinicName,
              address: appointment.doctor.clinicInfo.address,
              phone: appointment.doctor.phone,
              fee: appointment.doctor.professionalDetails.consultationFee,
              profileImage: appointment.doctor.profileImage,
            },
            status: appointment.status,
          };
        } else {
          // Return null or skip if tokenDetails is not valid
          return null;
        }
      })
    );

    // Filter out any null values from the appointment details
    const filteredDetails = appointmentDetails.filter(Boolean);

    res.json(filteredDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getRecentAppointments = async function (req, res) {
  const patientId = req.Patient._id;

  try {
    const appointments = await appointmentModel
      .find({ patient: patientId, status: { $in: ["no_show", "completed"] } })
      .populate("doctor");

    const appointmentDetails = appointments.map((appointment) => ({
      id: appointment.appointmentNo,
      date: appointment.date,
      tokenNumber: appointment.appointmentNo,
      doctor: appointment.doctor.fullName,
      specialization: appointment.doctor.professionalDetails.specialization,
      clinic: appointment.doctor.clinicInfo.clinicName,
      fee: appointment.doctor.professionalDetails.consultationFee,
      profileImage: appointment.doctor.profileImage,
      status: appointment.status,
    }));

    res.json(appointmentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
