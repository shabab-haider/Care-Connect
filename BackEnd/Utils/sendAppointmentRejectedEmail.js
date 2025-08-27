import { transporter } from "./transporter.js"; // Import the transporter

export const sendAppointmentRejectedEmail = async (
  email,
  appointmentDetails
) => {
  const { doctorName, appointmentDate, appointmentNo } = appointmentDetails;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Appointment Rejected",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffebee; border-radius: 10px; color: #333;">
        <h2 style="color: #f44336;">Appointment Rejected</h2>
        <p>We regret to inform you that the appointment request with Dr. <strong>${doctorName}</strong> has been rejected.</p>
        <p><strong>Appointment Date:</strong> ${appointmentDate}</p>
        <p><strong>Token NO:</strong> A-${appointmentNo}</p>
        <p>Best regards,<br>The CareConnect Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Appointment rejected email sent to:", email);
  } catch (error) {
    console.error("Error sending appointment rejected email:", error);
    throw error;
  }
};
