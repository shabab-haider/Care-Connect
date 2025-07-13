const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const doctorSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    minlength: [3, "Full name must be at least 3 characters"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [8, "Email must be at least 8 characters"],
  },
  profileImage: {
    type: String,
    default:
      "https://res.cloudinary.com/di9ljccil/image/upload/v1752328111/default-avatar-photo-placeholder-profile-icon-vector_nlejsr.jpg",
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters"],
    select: false,
  },
  phone: {
    type: String,
    required: true,
  },

  professionalDetails: {
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    qualification: { type: String, required: true },
    registrationNumber: { type: String, required: true },
    consultationFee: { type: Number, required: true },
    avgAppointmentTime: { type: Number, required: true },
  },

  clinicInfo: {
    clinicName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    availableDays: { type: [String], required: true },
    clinicOpenTime: { type: String, required: true },
    clinicCloseTime: { type: String, required: true },
    appointmentsPerDay: { type: Number, required: true },
  },
});

doctorSchema.methods.genrateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

doctorSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

doctorSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Doctor", doctorSchema);
