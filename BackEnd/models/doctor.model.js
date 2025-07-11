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
  profileImage: {
    type: String,
    default:""
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "password must be 8 character long"],
    select: false,
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
      minlength: [8, "password must be 8 character long"],
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
    checkupfee: {
      type: Number,
      required: true,
    },
    AverageCheckupTime: {
      type: Number,
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
      Monday: {
        StartTime: String,
        EndTime: String,
      },
      Tuesday: {
        StartTime: String,
        EndTime: String,
      },
      Wednesday: {
        StartTime: String,
        EndTime: String,
      },
      Thursday: {
        StartTime: String,
        EndTime: String,
      },
      Friday: {
        StartTime: String,
        EndTime: String,
      },
      Saturday: {
        StartTime: String,
        EndTime: String,
      },
      Sunday: {
        StartTime: String,
        EndTime: String,
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
