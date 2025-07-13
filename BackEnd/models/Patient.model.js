const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PatientSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minlength: [3, "Firstname must be 3 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [8, "email must be 8 character long"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "password must be 8 character long"],
    select: false,
  },
  dateOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", "prefer not to say"],
    required: true,
  },

  phoneNumber: {
    type: Number,
    minlength: [10, "Phone number must be 10 digits"],
    required: true,
  },
  profileImage: {
    type: String,
    default:
      "https://res.cloudinary.com/di9ljccil/image/upload/v1752328111/default-avatar-photo-placeholder-profile-icon-vector_nlejsr.jpg",
  },
});

PatientSchema.methods.genrateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

PatientSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

PatientSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Patient", PatientSchema);
