const express = require("express");
const cors = require("cors");
// const config = require('./app/config/config');
const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
//cors provides Express middleware to enable CORS

app.use(cors());

// Home route
app.get("/", (request, response) => {
  response.status(200).json({ message: "Welcome to Loan Spot Backend Test" });
});

// Other routes
require("./app/routes/task.routes")(app);

app.all("*", (request, response) => {
  response.status(404).json({
    status: false,
    message: "This is a wrong route, please check",
  });
});

// set port, listen for requests
const PORT = 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
