import { transporter } from "./transporter.js"; // Import the transporter

export const sendNoShowAppointmentEmail = async (email, appointmentDetails) => {
  const { patientName, appointmentDate, appointmentNo } = appointmentDetails;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Appointment No-Show Notification",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #fff3e0; border-radius: 10px; color: #333;">
        <h2 style="color: #ff9800;">Appointment No-Show</h2>
        <p>Dear <strong>${patientName}</strong>,</p>
        <p>We noticed that you did not arrive for your appointment on <strong>${appointmentDate}</strong> at Token No: <strong>A-${appointmentNo}</strong>.</p>
        <p>Your appointment has been placed in the "no-show" queue. Whenever you visit the clinic, please remember to inform doctor to put your token in the patient queue.</p>
        <p>If you would like to reschedule your appointment or have any questions, feel free to contact us.</p>
        <p>Best regards,<br>The CareConnect Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("No-show appointment email sent to:", email);
  } catch (error) {
    console.error("Error sending no-show appointment email:", error);
    throw error;
  }
};
