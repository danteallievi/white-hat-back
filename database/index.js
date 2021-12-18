const debug = require("debug")("whitehat:database");
const mongoose = require("mongoose");

function initializeMongo(connectionString) {
  return new Promise((resolve, reject) => {
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-underscore-dangle
        delete ret.__v;
      },
    });
    mongoose.set("debug", true);
    mongoose.connect(connectionString, (error) => {
      if (error) {
        debug("Failed connection with the database");
        debug(error.message);
        reject();
        return;
      }
      debug("Connected with the database");
      resolve();
    });
  });
}
module.exports = initializeMongo;
