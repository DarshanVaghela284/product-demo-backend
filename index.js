const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

require("./src/database/conn");

const router = require("./src/api/routes");
const fileUpload = require("express-fileupload");

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));
app.use(fileUpload());

// Routing
app.use(router);

const errorHandler = (error, req, res) => {
  // Error handling middleware functionality
  return res.status(error.status ? error.status : 200).json({
    message: error.message,
    status: error.status,
  });
};

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is up at ${port}`);
});

module.exports = app;
