const tokenModel = require("../models/token.model");
const moment = require("moment-timezone");

export async function subtractTimeFromFollowingTokensById(
  tokenId,
  doctorId,
  timeToSubtract
) {
  const tokenEntry = await tokenModel.findOne({ doctor: doctorId });

  if (!tokenEntry) {
    throw new Error("No available tokens found");
  }

  // Access the first token, which is for the current day
  const todayTokens = tokenEntry.tokens[0];

  if (!todayTokens) {
    throw new Error("No tokens found for today");
  }

  // Find the index of the specific token by _id
  const tokenIndex = todayTokens.tokenList.findIndex(
    (token) => token._id.toString() === tokenId
  );

  if (tokenIndex === -1) {
    throw new Error("Token not found");
  }

  // Update the time for all tokens following the matched token
  for (let i = tokenIndex + 1; i < todayTokens.tokenList.length; i++) {
    const currentToken = todayTokens.tokenList[i];
    const currentTime = moment(currentToken.time, "HH:mm");

    // Subtract the specified time
    const newTime = currentTime.subtract(timeToSubtract, "minutes");

    // Update the token's time and display time
    currentToken.time = newTime.format("HH:mm");
    currentToken.displayTime = newTime.format("h:mm A");
  }

  // Save the updated token entry
  await tokenEntry.save();
}