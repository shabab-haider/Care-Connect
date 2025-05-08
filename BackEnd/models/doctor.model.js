const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const doctorSchema = mongoose.Schema({
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
  },
  basicInfo: {
    dateOfBirth: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
  },
  professionalDetails: {
    specialty: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
    },
    yearsOfExperience: {
      type: String,
      required: true,
    },
  },
  clinicInfo: {
    clinicName: {
      type: String,
      required: true,
    },
    clinicAddress: {
      type: String,
      required: true,
    },
    consultationHours: {
      consultationStartTime: {},
      consultationEndTime: {
        type: String,
        required: true,
      },
    },
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

module.exports = mongoose.model("doctor", doctorSchema);
