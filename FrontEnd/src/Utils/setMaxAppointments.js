export const setMaxAppointments = (openTime, closeTime, avgAppointmentTime) => {
  const [openHours, openMinutes] = openTime.split(":").map(Number);
  const [closeHours, closeMinutes] = closeTime.split(":").map(Number);

  const totalOpenMinutes =
    closeHours * 60 + closeMinutes - (openHours * 60 + openMinutes);
  const maxAppointments = Math.floor(totalOpenMinutes / avgAppointmentTime);
  return maxAppointments;
};
