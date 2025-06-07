const generateTimeSlots = function (startTime, endTime, duration) {
  if (startTime === "" || endTime === "") return [];

  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  let slots = [];
  let currentH = startH;
  let currentM = startM;

  while (currentH < endH || (currentH === endH && currentM < endM)) {
    let formatted = `${String(currentH).padStart(2, "0")}:${String(
      currentM
    ).padStart(2, "0")} ${currentH > 12 ? "PM" : "AM"}`;
    slots.push(formatted);

    currentM += duration;
    if (currentM >= 60) {
      currentH++;
      currentM -= 60;
    }
  }

  return slots;
};

module.exports = generateTimeSlots;
