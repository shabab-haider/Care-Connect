const moment = require("moment-timezone");
const tokenModel = require("../models/token.model");

/**
 * Generates tokens for a specific doctor & date
 * Only generates if no tokens exist for that date yet
 */
async function generateTokensForDate(doctor, date) {
  const timezone = "Asia/Karachi";
  const dateStart = moment.tz(date, timezone).startOf("day").utc().format(); // Store in UTC

  // Check if tokens already exist for this date
  const existing = await tokenModel.findOne({
    doctor: doctor._id,
    "tokens.date": dateStart,
  });

  if (existing) {
    return; // Already exists -> don't regenerate
  }

  const startTime = moment.tz(
    doctor.clinicInfo.clinicOpenTime,
    "HH:mm",
    timezone
  );
  const tokenList = [];

  for (let i = 0; i < doctor.clinicInfo.appointmentsPerDay; i++) {
    const tokenTime = moment
      .tz(startTime, timezone)
      .add(i * doctor.professionalDetails.avgAppointmentTime, "minutes");
    tokenList.push({
      tokenNumber: `A-${String(i + 1).padStart(2, "0")}`,
      time: tokenTime.utc().format("HH:mm"), // Store time in UTC
      displayTime: tokenTime.format("h:mm A"), // Display in local timezone
      isBooked: false,
      isCurrentToken: false,
      patientId: null,
    });
  }

  await tokenModel.findOneAndUpdate(
    { doctor: doctor._id },
    {
      $push: {
        tokens: {
          date: dateStart,
          tokenList,
        },
      },
    },
    { upsert: true, new: true }
  );
}

module.exports = { generateTokensForDate };
