const { check } = require("express-validator");
const taskController = require("../controllers/task.controller");
const validateReqBody = require("../middleware/validateReqBody");

module.exports = function (app) {
  app.post(
    "/task/search-sort",
    [
      check("array")
        .notEmpty()
        .withMessage("Please provide array of element")
        .isArray({ min: 1 })
        .withMessage("Input must be an array with minimum of 1 element"),
      check("key")
        .notEmpty()
        .withMessage("Please provide a key")
        .isAlphanumeric()
        .withMessage("Key must be a number or alphabet"),
    ],
    validateReqBody,
    taskController.task
  );
};
