import { transporter } from "./transporter.js"; // Import the transporter


//Number 1

// export const sendAppointmentCompletionEmail = async (email, medicalRecord) => {
//   const { patientName, doctorName, date, appointmentDetails, prescription } =
//     medicalRecord;

//   const medicinesList = prescription.medicines
//     .map(
//       (medicine) => `
//     <li>
//       <strong>${medicine.name}</strong>: ${
//         medicine.dosage
//       } (${medicine.frequency.join(", ")})
//       <br>Instructions: ${
//         medicine.instructions || "No specific instructions provided."
//       }
//     </li>
//   `
//     )
//     .join("");

//   const prescriptionValidity = `
//     <p><strong>Prescription Validity:</strong> Until ${prescription.validity}</p>
//   `;

//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: email,
//     subject: "Your Appointment is Complete",
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #e8f5e9; border-radius: 10px; color: #333;">
//         <h2 style="color: #4caf50;">Appointment Completed</h2>
//         <p>Dear <strong>${patientName}</strong>,</p>
//         <p>Your appointment with Dr. <strong>${doctorName}</strong> on <strong>${date}</strong> has been successfully completed.</p>
//         <p><strong>Appointment Details:</strong> ${appointmentDetails}</p>
//         <p>Your medical record has been updated. Please follow the doctor's prescription below:</p>
//         <ul>${medicinesList}</ul>
//         ${prescriptionValidity}
//         <p>Make sure to take your medicines as instructed. If you have any questions, feel free to reach out.</p>
//         <p>Best regards,<br>The CareConnect Team</p>
//       </div>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Appointment completion email sent to:", email);
//   } catch (error) {
//     console.error("Error sending appointment completion email:", error);
//     throw error;
//   }
// };

export const sendAppointmentCompletionEmail = async (email, medicalRecord) => {
  const { patientName, doctorName, date, appointmentDetails, prescription } =
    medicalRecord;

  const medicinesList = prescription.medicines
    .map(
      (medicine) => `
    <li style="margin: 10px 0; padding: 10px; border: 1px solid #cfd8dc; border-radius: 5px;">
      <strong style="color: #1976d2;">${medicine.name}</strong>: <em>${
        medicine.dosage
      }</em> (${medicine.frequency.join(", ")})
      <br>Instructions: ${
        medicine.instructions || "No specific instructions provided."
      }
    </li>
  `
    )
    .join("");

  const prescriptionValidity = `
    <p style="font-weight: bold; color: #d32f2f;">Prescription Validity:</p>
    <p style="background-color: #e3f2fd; padding: 10px; border-radius: 5px; font-weight: bold;">Until ${prescription.validity}</p>
  `;

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "Your Appointment is Complete",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 30px; background-color: #ffffff; border-radius: 10px; color: #333; border: 1px solid #e0e0e0; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #4caf50; text-align: center; font-family: 'Helvetica Neue', sans-serif;">Appointment Completed</h2>
        <p style="font-size: 16px;">Dear <strong>${patientName}</strong>,</p>
        <p style="font-size: 16px;">Your appointment with Dr. <strong>${doctorName}</strong> on <strong>${date}</strong> has been successfully completed.</p>
        <p style="font-size: 16px;"><strong>Appointment Details:</strong> ${appointmentDetails}</p>
        <p style="font-size: 16px;">Your medical record has been updated. Please follow the doctor's prescription below:</p>
        <ul style="list-style-type: none; padding: 0;">${medicinesList}</ul>
        ${prescriptionValidity}
        <p style="font-size: 16px;">Make sure to take your medicines as instructed. If you have any questions, feel free to reach out.</p>
        <p style="text-align: center; margin-top: 20px; font-weight: bold;">Best regards,<br>The CareConnect Team</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Appointment completion email sent to:", email);
  } catch (error) {
    console.error("Error sending appointment completion email:", error);
    throw error;
  }
};

//Number 2

// export const sendAppointmentCompletionEmail = async (email, medicalRecord) => {
//   const { patientName, doctorName, date, appointmentDetails, prescription } =
//     medicalRecord;

//   const medicinesList = prescription.medicines
//     .map(
//       (medicine) => `
//     <li style="margin: 10px 0;">
//       <strong>${medicine.name}</strong>: <em>${
//         medicine.dosage
//       }</em> (${medicine.frequency.join(", ")})
//       <br>Instructions: ${
//         medicine.instructions || "No specific instructions provided."
//       }
//     </li>
//   `
//     )
//     .join("");

//   const prescriptionValidity = `
//     <p style="font-weight: bold;">Prescription Validity:</p>
//     <p style="background-color: #e3f2fd; padding: 10px; border-radius: 5px;">Until ${prescription.validity}</p>
//   `;

//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: email,
//     subject: "Your Appointment is Complete",
//     html: `
//       <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffffff; border-radius: 10px; color: #333; border: 1px solid #e0e0e0;">
//         <h2 style="color: #4caf50; text-align: center;">Appointment Completed</h2>
//         <p style="font-size: 16px;">Dear <strong>${patientName}</strong>,</p>
//         <p style="font-size: 16px;">Your appointment with Dr. <strong>${doctorName}</strong> on <strong>${date}</strong> has been successfully completed.</p>
//         <p style="font-size: 16px;"><strong>Appointment Details:</strong> ${appointmentDetails}</p>
//         <p style="font-size: 16px;">Your medical record has been updated. Please follow the doctor's prescription below:</p>
//         <ul style="list-style-type: none; padding: 0;">${medicinesList}</ul>
//         ${prescriptionValidity}
//         <p style="font-size: 16px;">Make sure to take your medicines as instructed. If you have any questions, feel free to reach out.</p>
//         <p style="text-align: center; margin-top: 20px;">Best regards,<br>The CareConnect Team</p>
//       </div>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("Appointment completion email sent to:", email);
//   } catch (error) {
//     console.error("Error sending appointment completion email:", error);
//     throw error;
//   }
// };
