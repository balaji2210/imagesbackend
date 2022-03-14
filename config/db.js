const mongoose = require("mongoose");

const DB = () => {
  mongoose
    .connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log(`DB CONNECTED`);
    })
    .catch((error) => {
      console.log(`ERROR:`, error);
      process.exit(1);
    });
};

module.exports = DB;
