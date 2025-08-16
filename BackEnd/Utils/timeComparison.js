export function isTimeAfter(time1, time2) {
  // Helper function to convert to 24-hour format
  function convertTo24Hour(time) {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes, seconds] = timePart.split(":");

    if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12;
    }
    if (modifier === "AM" && hours === "12") {
      hours = "00";
    }

    return `${hours}:${minutes}:${seconds}`;
  }

  // Convert both times to 24-hour format
  const date1 = new Date(`1970-01-01T${convertTo24Hour(time1)}`);
  const date2 = new Date(`1970-01-01T${convertTo24Hour(time2)}`);

  // Compare the two dates
  return date1 > date2; // Returns true if time1 is after time2
}
