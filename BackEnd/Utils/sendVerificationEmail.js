import { transporter } from "./transporter.js"; // Import the transporter

// Function to send a verification email
export const sendVerificationEmail = async (email, verificationCode) => {
  const mailOptions = {
    from: process.env.SMTP_USER, // sender address
    to: email, // list of receivers
    subject: "Verify Your Email Address", // Subject line
    html: `<div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0f8ff; border-radius: 10px; color: #333;">
        <h2 style="color: #007acc;">Welcome to CareConnect!</h2>
        <p>Thank you for signing up. To verify your email address, please use the following verification code:</p>
        <h3 style="font-weight: bold; font-size: 24px; color: #007acc;">${verificationCode}</h3>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,<br>The CareConnect Team</p>
      </div>`, // HTML body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error; // Optionally re-throw the error for further handling
  }
};
