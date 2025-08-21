import moment from "moment-timezone";

export function isCurrentTimeGreater(time, today) {
  const currentTime = moment.tz("Asia/Karachi"); // Set timezone
  const givenTime = moment.tz(time, "HH:mm", "Asia/Karachi"); // Parse given time

  return today && currentTime.isAfter(givenTime); // Compare times
}
