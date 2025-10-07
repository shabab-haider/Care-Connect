const mongoose = require("mongoose");
const connectToDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to DB✅");
    })
    .catch((error) => {
      console.error("Database connection failed❌:", error.message);
      process.exit(1);
    });
};

module.exports = connectToDB;
