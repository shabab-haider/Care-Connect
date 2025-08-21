const { validationResult } = require("express-validator");
const doctorService = require("../Services/doctor.service");
const doctorModel = require("../models/doctor.model");
const tokenModel = require("../models/token.model");
const appointmentModel = require("../models/appointment.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
const { generateTokensForDate } = require("../utils/tokenGenerator");

module.exports.registerDoctor = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }
  console.log(req.body);
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      specialization,
      experience,
      qualification,
      registrationNumber,
      consultationFee,
      avgAppointmentTime,
      clinicName,
      about,
      address,
      city,
      state,
      pincode,
      availableDays,
      clinicOpenTime,
      clinicCloseTime,
      appointmentsPerDay,
    } = req.body;

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check for existing doctor
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res
        .status(409)
        .json({ message: "Doctor with this email already exists" });
    }

    // Hash password
    const hashedPassword = await doctorModel.hashPassword(password);

    // Create doctor
    const doctor = await doctorModel.create({
      fullName: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      phone,
      about,
      professionalDetails: {
        specialization,
        experience,
        qualification,
        registrationNumber,
        consultationFee,
        avgAppointmentTime,
      },
      clinicInfo: {
        clinicName,
        address,
        city,
        state,
        pincode,
        availableDays,
        clinicOpenTime,
        clinicCloseTime,
        appointmentsPerDay,
      },
    });

    // Token
    const token = doctor.genrateToken();
    res.cookie("token", token);

    // Success Response
    res.status(201).json({
      message: "Doctor registered successfully",
      doctor: {
        _id: doctor._id,
        fullName: doctor.fullName,
        email: doctor.email,
        profileImage: doctor.profileImage,
      },
      token,
    });
  } catch (error) {
    console.error("Doctor registration error:", error);
    res.status(500).json({ message: "Server error. Try again later." });
  }
};

module.exports.loginDoctor = async function (req, res) {
  const err = validationResult(req);
  if (!err.isEmpty) {
    return res.status(422).json({ errors: err.array() });
  }
  let { email, password } = req.body;
  const doctor = await doctorModel.findOne({ email }).select("+password");
  if (!doctor) {
    return res.status(401).json({ Error: "Invalid Credentials" });
  }
  const checkPassword = await bcrypt.compare(password, doctor.password);
  if (!checkPassword) {
    return res.status(401).json({ Error: "Invalid Credentials" });
  }
  const token = doctor.genrateToken();
  res.cookie("token", token);
  res.json({ doctor: doctor, token: token });
};

module.exports.getDoctorDashboard = function (req, res) {
  res.status(200).json({ doctor: req.doctor });
};

module.exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();

    const formattedDoctors = doctors.map((doc) => ({
      _id: doc._id,
      fullName: doc.fullName,
      email: doc.email,
      profileImage: doc.profileImage || "/placeholder.svg?height=120&width=120",
      phone: doc.phone,
      professionalDetails: {
        specialization: doc.professionalDetails.specialization,
        experience: doc.professionalDetails.experience,
        qualification: doc.professionalDetails.qualification,
        registrationNumber: doc.professionalDetails.registrationNumber,
        consultationFee: doc.professionalDetails.consultationFee,
        avgAppointmentTime: doc.professionalDetails.avgAppointmentTime,
      },
      clinicInfo: {
        clinicName: doc.clinicInfo.clinicName,
        address: doc.clinicInfo.address,
        city: doc.clinicInfo.city,
        state: doc.clinicInfo.state,
        pincode: doc.clinicInfo.pincode,
        availableDays: doc.clinicInfo.availableDays,
        clinicOpenTime: doc.clinicInfo.clinicOpenTime,
        clinicCloseTime: doc.clinicInfo.clinicCloseTime,
        appointmentsPerDay: doc.clinicInfo.appointmentsPerDay,
      },
      about: doc.about || "",
    }));

    res.status(200).json(formattedDoctors);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching doctors", error: error.message });
  }
};

module.exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const formattedDoctor = {
      _id: doctor._id,
      fullName: doctor.fullName,
      email: doctor.email,
      profileImage:
        doctor.profileImage || "/placeholder.svg?height=120&width=120",
      phone: doctor.phone,
      professionalDetails: {
        specialization: doctor.professionalDetails.specialization,
        experience: doctor.professionalDetails.experience,
        qualification: doctor.professionalDetails.qualification,
        consultationFee: doctor.professionalDetails.consultationFee,
        avgAppointmentTime: doctor.professionalDetails.avgAppointmentTime,
      },
      clinicInfo: {
        clinicName: doctor.clinicInfo.clinicName,
        address: doctor.clinicInfo.address,
        city: doctor.clinicInfo.city,
        state: doctor.clinicInfo.state,
        availableDays: doctor.clinicInfo.availableDays,
        clinicOpenTime: doctor.clinicInfo.clinicOpenTime,
        clinicCloseTime: doctor.clinicInfo.clinicCloseTime,
        appointmentsPerDay: doctor.clinicInfo.appointmentsPerDay,
      },
    };

    res.status(200).json(formattedDoctor);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching doctor", error: error.message });
  }
};

module.exports.getDoctorAvailabilityNext7Days = async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const availableDays = doctor.clinicInfo.availableDays;
    const today = moment.tz("Asia/Karachi").startOf("day");
    const currentTime = moment.tz("Asia/Karachi");
    const closingTime = moment.tz(
      `${today.format("YYYY-MM-DD")} ${doctor.clinicInfo.clinicCloseTime}`,
      "Asia/Karachi"
    );

    const isPastClosingTime = currentTime.isAfter(closingTime);

    const startDay = isPastClosingTime ? today.add(1, "days") : today;

    // Remove past days & their tokens from DB
    await tokenModel.updateOne(
      { doctor: doctor._id },
      {
        $pull: {
          tokens: {
            date: { $lt: today.utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") },
          },
        },
      }
    );

    const result = [];
    // Add next 7 days
    for (let i = 0; i < 7; i++) {
      const date = moment.tz(startDay, "Asia/Karachi").add(i, "days");
      const dayName = date.format("dddd");
      const isToday = date.isSame(moment.tz("Asia/Karachi").startOf("day"));

      if (availableDays.includes(dayName)) {
        // Generate tokens if not already in DB
        await generateTokensForDate(doctor, date);

        result.push({
          date: date.format("YYYY-MM-DD"),
          displayDate: date.format("ddd, MMM DD"),
          dayName,
          isToday,
        });
      }
    }

    res.status(200).json({ result, isPastClosingTime });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching availability", error: error.message });
  }
};

module.exports.getDoctorTokens = async (req, res) => {
  try {
    const doctorId = req.params.id;

    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Fetch tokens for doctor
    const tokenData = await tokenModel.findOne({ doctor: doctorId });
    if (!tokenData || !tokenData.tokens) {
      return res.status(200).json({});
    }

    const result = {};
    const timezone = "Asia/Karachi";

    tokenData.tokens.forEach((dayTokens) => {
      const dateKey = moment.tz(dayTokens.date, timezone).format("YYYY-MM-DD");
      result[dateKey] = dayTokens.tokenList.map((t) => ({
        id: t._id,
        tokenNumber: t.tokenNumber,
        // Convert time from UTC to local time
        time: moment.utc(t.time, "HH:mm").tz(timezone).format("HH:mm"), // Convert to local time
        displayTime: moment.utc(t.time, "HH:mm").tz(timezone).format("h:mm A"), // Display in local format
        isBooked: t.isBooked || false,
        isCurrentToken: t.isCurrentToken || false,
      }));
    });

    return res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching doctor tokens", error: err.message });
  }
};

module.exports.updateDoctor = async (req, res) => {
  let { id } = req.params; // Extracting the doctor ID from URL parameters

  // Clean the ID by removing any leading colons or whitespace
  id = id.replace(/^:/, "").trim();

  console.log("Cleaned Doctor ID:", id); // Log the cleaned ID for debugging

  try {
    // Find the existing doctor by ID
    const existingDoctor = await doctorModel.findById(id);
    if (!existingDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Extracting fields from req.body
    const {
      fullName,
      phone,
      profileImage,
      about,
      professionalDetails,
      clinicInfo,
    } = req.body.data;

    // Prepare the updated document
    const updatedDoctor = {
      fullName: fullName || existingDoctor.fullName,
      phone: phone || existingDoctor.phone,
      profileImage: profileImage || existingDoctor.profileImage,
      about: about || existingDoctor.about,
      professionalDetails: {
        specialization: existingDoctor.professionalDetails.specialization,
        experience:
          professionalDetails?.experience ||
          existingDoctor.professionalDetails.experience,
        qualification: existingDoctor.professionalDetails.qualification,
        registrationNumber:
          existingDoctor.professionalDetails.registrationNumber,
        consultationFee:
          professionalDetails?.consultationFee ||
          existingDoctor.professionalDetails.consultationFee,
        avgAppointmentTime:
          professionalDetails?.avgAppointmentTime ||
          existingDoctor.professionalDetails.avgAppointmentTime,
      },
      clinicInfo: {
        clinicName: existingDoctor.clinicInfo.clinicName,
        address: existingDoctor.clinicInfo.address,
        city: existingDoctor.clinicInfo.city,
        state: existingDoctor.clinicInfo.state,
        pincode: existingDoctor.clinicInfo.pincode,
        availableDays:
          clinicInfo?.availableDays || existingDoctor.clinicInfo.availableDays,
        clinicOpenTime:
          clinicInfo?.clinicOpenTime ||
          existingDoctor.clinicInfo.clinicOpenTime,
        clinicCloseTime:
          clinicInfo?.clinicCloseTime ||
          existingDoctor.clinicInfo.clinicCloseTime,
        appointmentsPerDay:
          clinicInfo?.appointmentsPerDay ||
          existingDoctor.clinicInfo.appointmentsPerDay,
      },
    };

    // Update the doctor with the new values
    const result = await doctorModel.findByIdAndUpdate(id, updatedDoctor, {
      new: true,
      runValidators: true,
    });

    res.json({ doctor: result });
  } catch (error) {
    console.error("Error updating doctor:", error);
    res.status(500).json({ message: "Error updating doctor", error });
  }
};

module.exports.getAppointments = async (req, res) => {
  const doctorId = req.params.id;
  try {
    // Fetch appointments for the given doctor ID
    const appointments = await appointmentModel
      .find({ doctor: doctorId, status: { $in: ["no_show", "completed"] } })
      .populate("patient");

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
        }
        console.log(tokenDetails);

        // Get current time in Asia/Karachi timezone
        const currentTime = moment().tz("Asia/Karachi");

        // Get token time and format it
        const tokenTime = moment(tokenDetails.displayTime, "h:mm A").set({
          year: currentTime.year(),
          month: currentTime.month(),
          date: currentTime.date(),
        });

        // Format the appointment time to Asia/Karachi
        const formattedTime = moment
          .tz(tokenTime, "Asia/Karachi")
          .format("h:mm A");

        // Determine booking type based on patient's isOffline field
        const bookingType = appointment.patient.isOffline
          ? "Walk-in"
          : "Online";

        return {
          id: appointment.appointmentNo, // Assuming appointmentNo is unique
          patientName: appointment.patient.fullName, // Get patient's name
          phone: appointment.patient.phone, // Get patient's phone
          gender: appointment.patient.gender, // Get patient's gender
          date: appointment.date, // Appointment date
          appointmentTime: formattedTime, // Formatted appointment time
          status: appointment.status, // Appointment status
          bookingType: bookingType, // Set booking type based on isOffline
        };
      })
    );

    console.log(appointmentDetails);
    res.json(appointmentDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
