const appointmentModel = require("../models/appointment.model");
const MedicalRecord = require("../models/medicalRecord.model");
const moment = require("moment-timezone");
const {
  sendAppointmentCompletionEmail,
} = require("../Utils/sendAppointmentCompletionEmail");

module.exports.createMedicalRecord = async (req, res) => {
  const { doctorId, patientId, appointmentId } = req.params; // Extracting doctor and patient IDs from URL parameters

  const {
    appointmentDetails,
    prescription: { validity, medicines },
  } = req.body.formData;

  try {
    // Create a new medical record
    const newMedicalRecord = new MedicalRecord({
      doctor: doctorId,
      patient: patientId,
      date: new Date().toISOString().split("T")[0], // Store the current date in "YYYY-MM-DD" format
      appointmentDetails,
      prescription: {
        validity,
        medicines,
      },
    });

    // Save the medical record to the database
    const savedRecord = await newMedicalRecord.save();
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      status: "completed",
    });

    const medicalRecord = await MedicalRecord.findOne({
      patient: patientId,
    }).populate("patient doctor");

    const medicalRecordForMail = {
      patientName: medicalRecord.patient.fullname,
      doctorName: medicalRecord.doctor.fullName,
      date: medicalRecord.date,
      appointmentDetails: medicalRecord.appointmentDetails,
      prescription: medicalRecord.prescription,
    };

    sendAppointmentCompletionEmail(
      medicalRecord.patient.email,
      medicalRecordForMail
    );

    res.status(201).json({
      message: "Medical record created successfully",
      record: savedRecord,
    });
  } catch (error) {
    console.error("Error creating medical record:", error);
    res.status(500).json({ message: "Error creating medical record", error });
  }
};

module.exports.getMedicalRecords = async (req, res) => {
  const patientId = req.params.patientId;
  console.log(patientId);
  try {
    // Fetch medical records for the given patient ID
    const medicalRecords = await MedicalRecord.find({
      patient: patientId,
    }).populate("doctor"); // Populate doctor details
    console.log(medicalRecords);
    // Format the response
    const formattedRecords = medicalRecords.map((record) => ({
      _id: record._id,
      doctor: {
        name: record.doctor.fullName,
        specialization: record.doctor.professionalDetails.specialization,
        profileImage: record.doctor.profileImage,
      },
      patient: record.patient,
      date: record.date,
      appointmentDetails: record.appointmentDetails,
      prescription: {
        validity: record.prescription.validity,
        medicines: record.prescription.medicines,
      },
    }));

    res.json(formattedRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.getValidMedicalRecords = async (req, res) => {
  const patientId = req.params.patientId;

  try {
    // Get today's date in Asia/Karachi timezone
    const today = moment.tz("Asia/Karachi").format("YYYY-MM-DD");

    // Fetch medical records for the given patient ID
    const medicalRecords = await MedicalRecord.find({
      patient: patientId,
    }).populate("doctor"); // Populate doctor details
    // Filter records where prescription validity is today or earlier
    const validRecords = medicalRecords.filter((record) => {
      return record.prescription.validity >= today;
    });

    // Format the response
    const formattedRecords = validRecords.map((record) => ({
      prescriptionId: record._id,

      doctorName: record.doctor.fullName,
      validity: record.prescription.validity,
      medicines: record.prescription.medicines,
    }));
    console.log(formattedRecords);
    res.json(formattedRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
