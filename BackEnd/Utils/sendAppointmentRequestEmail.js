const { transporter } = require("./transporter.js"); // Import the transporter

const sendAppointmentRequestEmail = async (
  email,
  appointmentDetails
) => {
  const { patientName, appointmentDate, appointmentNo } = appointmentDetails;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Appointment Request Notification",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0f8ff; border-radius: 10px; color: #333;">
        <h2 style="color: #007acc;">New Appointment Request</h2>
        <p>You have received a new appointment request from <strong>${patientName}</strong>.</p>
        <p><strong>Appointment Date:</strong> ${appointmentDate}</p>
        <p><strong>Token NO:</strong> A-${appointmentNo}</p>
        <p>Please review the request and respond accordingly.</p>
        <p>Best regards,<br>The CareConnect Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Appointment request email sent to:", email);
  } catch (error) {
    console.error("Error sending appointment request email:", error);
    throw error;
  }
};

module.exports = { sendAppointmentRequestEmail };
