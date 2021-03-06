const express = require("express");

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");

app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Working</h1>");
});

module.exports = app;
