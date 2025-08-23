const doctorModel = require("../models/doctor.model");
const patientModel = require("../models/Patient.model");
const appointmentModel = require("../models/appointment.model");
const tokenModel = require("../models/token.model");
const moment = require("moment");
const patientServices = require("../Services/patients.service");

module.exports.requestAppointment = async (req, res) => {
  try {
    const { doctorId, patientId, selectedDate, selectedToken, appointmentNo } =
      req.body;
    console.log(req.body);

    // Validate input
    if (!doctorId || !patientId || !selectedDate || !selectedToken) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Convert Date to UTC
    const utcDate = moment.tz(selectedDate, "Asia/Karachi").utc().format(); // Convert to UTC

    // Check if doctor exists
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Check if patient exists
    const patient = await patientModel.findById(patientId);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    // Find token & ensure it's not already booked
    const tokenDoc = await tokenModel.findOne({
      doctor: doctorId,
      "tokens.date": utcDate, // Use UTC date for searching tokens
    });

    if (!tokenDoc) {
      return res
        .status(404)
        .json({ message: "Token list for this date not found" });
    }

    const dayTokens = tokenDoc.tokens.find((t) => {
      return moment(t.date).isSame(utcDate); // Compare with UTC date
    });

    if (!dayTokens) {
      return res
        .status(404)
        .json({ message: "No tokens for the selected date" });
    }

    const tokenObj = dayTokens.tokenList.id(selectedToken);
    if (!tokenObj) {
      return res.status(404).json({ message: "Token not found" });
    }
    if (tokenObj.isBooked) {
      return res.status(400).json({ message: "Token already booked" });
    }

    // Create appointment with initial status = pending
    const appointment = await appointmentModel.create({
      doctor: doctorId,
      patient: patientId,
      token: selectedToken,
      date: selectedDate, // Store date in UTC
      appointmentNo,
      status: "pending", // doctor will confirm later
    });

    // Update token as booked
    tokenObj.isBooked = true;
    tokenObj.patientId = patientId;
    await tokenDoc.save();

    return res.status(201).json({
      message: "Appointment request sent successfully (pending confirmation)",
      appointment,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error booking appointment",
      error: err.message,
    });
  }
};

module.exports.getPendingAppointments = async (req, res) => {
  try {
    const doctorId = req.doctor._id;

    // Fetch pending appointments for the doctor
    const appointments = await appointmentModel.find({
      doctor: doctorId,
      status: "pending",
    });

    if (!appointments.length) {
      return res.json({
        appointments,
        message: "No pending appointments found",
      });
    }

    // Format the response
    const formattedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        // Fetch the corresponding token document
        const tokenDoc = await tokenModel.findOne({ doctor: doctorId });

        // Find the specific token from the token list
        let tokenDetails = null;

        if (tokenDoc) {
          // Loop through the tokens to find the specific token by ID
          for (const token of tokenDoc.tokens) {
            tokenDetails = token.tokenList.id(appointment.token);
            if (tokenDetails) break; // Break if found
          }
        }

        // Fetch patient details
        const patient = await patientModel.findById(appointment.patient);
        const timezone = "Asia/Karachi";
        return {
          id: appointment._id, // Use appointment's ID
          patientName: patient.fullname, // Patient's name
          patientPhone: patient.phoneNumber, // Patient's phone number
          patientEmail: patient.email, // Patient's email
          appointmentDate: appointment.date, // Appointment date
          appointmentTime: tokenDetails
            ? moment
                .utc(tokenDetails.time, "HH:mm")
                .tz(timezone)
                .format("h:mm A")
            : null, // Token's time
          tokenNumber: tokenDetails ? tokenDetails.tokenNumber : null, // Token's number
          tokenId: tokenDetails ? tokenDetails._id : null,
          doctorId,
        };
      })
    );

    return res.status(200).json({ appointments: formattedAppointments });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching pending appointments",
      error: error.message,
    });
  }
};

module.exports.acceptAppointmentRequest = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        status: "booked",
      }
    );
    res.status(200).json({ message: "Appointment Accepted" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports.rejectAppointmentRequest = async (req, res) => {
  const { tokenId, appointmentId, doctorId } = req.body;

  try {
    // Find the token document for the specified doctor
    const tokenDoc = await tokenModel.findOne({ doctor: doctorId });
    if (!tokenDoc) {
      return res
        .status(404)
        .json({ message: "Token document not found for the specified doctor" });
    }

    // Loop through the tokens to find the specific token
    let tokenFound = false;

    for (const token of tokenDoc.tokens) {
      const tokenEntry = token.tokenList.id(tokenId);
      if (tokenEntry) {
        // Update the isBooked property
        tokenEntry.isBooked = false;
        tokenFound = true;
        break; // Exit the loop once the token is found
      }
    }

    if (!tokenFound) {
      return res
        .status(404)
        .json({ message: "Token entry not found in token list" });
    }

    await tokenDoc.save(); // Save the changes to the token document
    await appointmentModel.findByIdAndDelete(appointmentId);
    return res
      .status(200)
      .json({ message: "Token has been rejected successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error booking token",
      error: error.message,
    });
  }
};

module.exports.getBookedAppointments = async (req, res) => {
  const doctorId = req.doctor._id;
  const date = req.params.date;

  try {
    // Find all appointments for the given doctorId and date with status "booked"
    const appointments = await appointmentModel.find({
      doctor: doctorId,
      date: date,
      status: "booked",
    });

    if (appointments.length === 0) {
      return res.json({
        appointments,
        message:
          "No booked appointments found for this doctor on the specified date.",
      });
    }
    console.log(appointments);

    const formattedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        // Fetch the corresponding token document
        const tokenDoc = await tokenModel.findOne({ doctor: doctorId });

        // Find the specific token from the token list
        let tokenDetails = null;

        if (tokenDoc) {
          // Loop through the tokens to find the specific token by ID
          for (const token of tokenDoc.tokens) {
            tokenDetails = token.tokenList.id(appointment.token);
            if (tokenDetails) break; // Break if found
          }
        }

        console.log(tokenDetails);

        // Fetch patient details
        const patient = await patientModel.findById(appointment.patient);
        const timezone = "Asia/Karachi";
        return {
          appointmentNo: appointment.appointmentNo,
          bookingType: patient.isOffline ? "Offline" : "online",
          status: appointment.status,
          id: appointment._id, // Use appointment's ID
          patientId: patient._id,
          patientName: patient.fullname, // Patient's name
          phone: patient.phoneNumber, // Patient's phone number
          image: patient.profileImage,
          gender: patient.gender,
          appointmentTime: tokenDetails
            ? moment
                .utc(tokenDetails.time, "HH:mm")
                .tz(timezone)
                .format("h:mm A")
            : null, // Token's time
          tokenNumber: tokenDetails ? tokenDetails.tokenNumber : null, // Token's number
          tokenId: tokenDetails ? tokenDetails._id : null,
          doctorId,
        };
      })
    );

    return res.status(200).json({ appointments: formattedAppointments });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving appointments",
      error: error.message,
    });
  }
};

module.exports.setAppointmentToNoShaow = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        status: "no_show",
      }
    );
    if (!appointment) {
      return res.json({
        appointment,
        message:
          "No booked appointments found for this doctor on the specified date.",
      });
    }
    const tokenDoc = await tokenModel.findOne({
      doctor: appointment.doctor,
    });

    // Find the specific token from the token list
    let tokenDetails = null;

    if (tokenDoc) {
      // Loop through the tokens to find the specific token by ID
      for (const token of tokenDoc.tokens) {
        tokenDetails = token.tokenList.id(appointment.token);
        if (tokenDetails) break; // Break if found
      }
    }

    // Fetch patient details
    const patient = await patientModel.findById(appointment.patient);
    const timezone = "Asia/Karachi";

    const formattedAppointments = {
      appointmentNo: appointment.appointmentNo,
      bookingType: appointment.isOffline ? "Offline" : "online",
      status: appointment.status,
      id: appointment._id, // Use appointment's ID
      patientName: patient.fullname, // Patient's name
      phone: patient.phoneNumber, // Patient's phone number
      image: patient.profileImage,
      gender: patient.gender,
      appointmentTime: tokenDetails
        ? moment.utc(tokenDetails.time, "HH:mm").tz(timezone).format("h:mm A")
        : null, // Token's time
      tokenNumber: tokenDetails ? tokenDetails.tokenNumber : null, // Token's number
      tokenId: tokenDetails ? tokenDetails._id : null,
      doctorId: appointment.doctor,
    };

    return res.status(200).json({ appointments: formattedAppointments });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getMissedAppointments = async (req, res) => {
  const doctorId = req.doctor._id;
  const date = req.params.date;

  try {
    // Find all appointments for the given doctorId and date with status "booked"
    const appointments = await appointmentModel.find({
      doctor: doctorId,
      date: date,
      status: "no_show",
    });

    if (appointments.length === 0) {
      return res.json({
        appointments,
        message:
          "No missed appointments found for this doctor on the specified date.",
      });
    }
    const formattedAppointments = await Promise.all(
      appointments.map(async (appointment) => {
        // Fetch the corresponding token document
        const tokenDoc = await tokenModel.findOne({ doctor: doctorId });

        // Find the specific token from the token list
        let tokenDetails = null;

        if (tokenDoc) {
          // Loop through the tokens to find the specific token by ID
          for (const token of tokenDoc.tokens) {
            tokenDetails = token.tokenList.id(appointment.token);
            if (tokenDetails) break; // Break if found
          }
        }

        // Fetch patient details
        const patient = await patientModel.findById(appointment.patient);
        const timezone = "Asia/Karachi";
        return {
          appointmentNo: appointment.appointmentNo,
          bookingType: patient.isOffline ? "Offline" : "online",
          status: appointment.status,
          id: appointment._id, // Use appointment's ID
          patientName: patient.fullname, // Patient's name
          phone: patient.phoneNumber, // Patient's phone number
          image: patient.profileImage,
          gender: patient.gender,
          appointmentTime: tokenDetails
            ? moment
                .utc(tokenDetails.time, "HH:mm")
                .tz(timezone)
                .format("h:mm A")
            : null, // Token's time
          tokenNumber: tokenDetails ? tokenDetails.tokenNumber : null, // Token's number
          tokenId: tokenDetails ? tokenDetails._id : null,
          doctorId,
        };
      })
    );

    return res.status(200).json({ appointments: formattedAppointments });
  } catch (error) {
    return res.status(500).json({
      message: "Error retrieving appointments",
      error: error.message,
    });
  }
};

module.exports.moveToQueue = async (req, res) => {
  try {
    const appointmentId = req.body.id;
    const appointment = await appointmentModel.findByIdAndUpdate(
      appointmentId,
      {
        status: "booked",
      },
      { new: true } // Return the updated document
    );
    res.status(200).json({ message: "Moved To Queue Sucessfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.addOfflinePatient = async (req, res) => {
  const { patientName, phoneNumber, gender } = req.params;
  const doctorId = req.doctor._id;

  try {
    // Step 1: Create a patient with isOffline set to true
    const patient = await patientServices.CreatePatient({
      fullname: patientName,
      phoneNumber,
      gender,
      isOffline: true,
    });

    // Step 2: Get today's date in Asia/Karachi time zone and convert to UTC
    const today = moment.tz("Asia/Karachi").format("YYYY-MM-DD");
    const utcDate = moment.tz(today, "Asia/Karachi").utc().format(); // Convert to UTC
    const currentUtcTime = moment.utc().format("HH:mm");

    // Step 3: Find the first available token
    const tokenEntry = await tokenModel.findOne({
      doctor: doctorId,
    });

    if (!tokenEntry) {
      return res.status(404).json({ message: "No available tokens found" });
    }

    // Find the first unbooked token
    const availableToken = tokenEntry.tokens[0].tokenList.find(
      (token) => !token.isBooked && token.time >= currentUtcTime
    );

    if (!availableToken) {
      return res.status(404).json({ message: "No available tokens found" });
    }

    // Step 4: Create the appointment
    const appointment = await appointmentModel.create({
      doctor: doctorId,
      patient: patient._id,
      appointmentNo: parseInt(availableToken.tokenNumber.replace("A-", "")), // Remove leading A- and convert to number
      token: availableToken._id,
      date: today,
      status: "booked",
    });

    // Mark the token as booked
    availableToken.isBooked = true;
    await tokenEntry.save();

    return res.status(201).json({ appointment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.getAppointmentData = async (req, res) => {
  let appointmentId = req.params.appointmentId;
  appointmentId = appointmentId.replace(/^:/, "").trim();
  try {
    // Find the appointment by ID and populate the patient details
    const appointment = await appointmentModel
      .findById(appointmentId)
      .populate("patient");

    // Check if the appointment exists
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Extract patient details
    const patient = appointment.patient; // Assuming patient is populated
    const patientData = {
      name: patient.fullname, // Adjust according to your patient schema
      gender: patient.gender, // Adjust according to your patient schema
      tokenNumber: appointment.appointmentNo, // Assuming this field exists in the appointment
    };
    // Return the patient data
    res.status(200).json(patientData);
  } catch (error) {
    console.error("Error fetching appointment data:", error);
    res.status(500).json({ message: "Error fetching appointment data", error });
  }
};
