const appointmentsModel = require("../models/appointments.model");

module.exports.request = async function (req, res) {
  const { patientId, doctorId, appointmentDate, appointmentTime } = req.body;
  try {
    const newAppointment = await appointmentsModel.create({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
    });
    res.status(201).json({ appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
