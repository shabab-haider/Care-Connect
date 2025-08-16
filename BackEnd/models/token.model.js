const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  tokens: [
    {
      date: { type: Date, required: true }, // Date for the tokens
      tokenList: [
        {
          tokenNumber: { type: String, required: true }, // e.g., "A-01"
          time: { type: String, required: true }, // e.g., "09:00"
          displayTime: { type: String, required: true }, // e.g., "9:00 AM"
          isBooked: { type: Boolean, default: false },
          isCurrentToken: { type: Boolean, default: false },
          patientId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            default: null,
          }, // Patient ID
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Token", tokenSchema);
