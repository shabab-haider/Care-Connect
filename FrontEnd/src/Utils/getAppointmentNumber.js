export function getAppointmentNumber(token) {
  // Extract the numeric part after the hyphen
  const match = token.split("-")[1]; // Get the part after the hyphen

  const number = parseInt(match, 10); // Convert to a number
  // Return the number or the second digit if it's less than 10
  return number < 10 ? parseInt(match[1]) : number;
}
