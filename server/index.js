const cors = require("cors");
const debug = require("debug")("whitehat:server");
const express = require("express");
const morgan = require("morgan");
const {
  notFoundErrorHandler,
  generalErrorHandler,
} = require("./middlewares/error");
const usersRoutes = require("./routes/usersRoutes");

const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

const initializeServer = (port) =>
  new Promise((resolve, reject) => {
    const server = app.listen(port, () => {
      debug(`Server is listening on port number: ${port}`);
      resolve(server);
    });

    server.on("error", (error) => {
      debug("There was an error starting the server");
      if (error.code === "EADDRINUSE") {
        debug(`The port ${port} is in use.`);
      }
      reject();
    });

    server.on("close", () => {
      debug("Server express disconnected");
    });
  });

app.use("/user", usersRoutes);

app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

module.exports = { app, initializeServer };
