import moment from "moment-timezone";

export const convertDate = (dateString) => {
  return moment
    .tz(dateString, "UTC") // Treat the input date as UTC
    .set({ hour: 19, minute: 0, second: 0, millisecond: 0 }) // Set time to 19:00:00
    .format("YYYY-MM-DDTHH:mm:ss.SSS[+00:00]"); // Format to the desired output
};
