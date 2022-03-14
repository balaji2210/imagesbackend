require("dotenv").config();
const app = require("./app");
const DBCONNECTION = require("./config/db");
const cloudinary = require("cloudinary");

DBCONNECTION();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});
