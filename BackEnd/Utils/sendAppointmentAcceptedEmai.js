import { transporter } from "./transporter.js"; // Import the transporter

export const sendAppointmentAcceptedEmail = async (
  email,
  appointmentDetails
) => {
  const { doctorName, appointmentDate, appointmentNo } = appointmentDetails;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Appointment Accepted",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #e8f5e9; border-radius: 10px; color: #333;">
        <h2 style="color: #4caf50;">Appointment Accepted</h2>
        <p>Your  request for appointment with Dr. <strong>${doctorName}</strong> has been accepted.</p>
        <p><strong>Appointment Date:</strong> ${appointmentDate}</p>
        <p><strong>Token NO:</strong> A-${appointmentNo}</p>
        <p>We look forward to seeing you!</p>
        <p>Best regards,<br>The CareConnect Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Appointment accepted email sent to:", email);
  } catch (error) {
    console.error("Error sending appointment accepted email:", error);
    throw error;
  }
};
