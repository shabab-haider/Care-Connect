const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const PatientSchema = mongoose.Schema({
  isOffline: {
    type: Boolean,
    default: false, // true if added manually by doctor
  },
  fullname: {
    type: String,
    required: true,
    minlength: [3, "Fullname must be at least 3 characters long"],
  },
  email: {
    type: String,
    minlength: [8, "Email must be at least 8 characters long"],
    unique: true, // Keep it unique
    sparse: true, // Allows multiple null emails for offline patients
  },
  password: {
    type: String,
    minlength: [8, "Password must be at least 8 characters long"],
    select: false,
  },
  dateOfBirth: {
    type: String,
    required: function () {
      return !this.isOffline; // Required only for online patients
    },
  },
  gender: {
    type: String,
    enum: ["male", "female", "other", "prefer not to say"],
    required: function () {
      return !this.isOffline;
    },
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

// Generate token (only for online patients)
PatientSchema.methods.genrateToken = function () {
  if (this.isOffline) return null; // No token for offline patients
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// Password hashing
PatientSchema.statics.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare passwords
PatientSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("Patient", PatientSchema);
