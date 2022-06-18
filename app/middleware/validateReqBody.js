const { validationResult } = require('express-validator');
module.exports = (request, response, next) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    // console.log(errors);
    return response.status(422).json({
      status: false,
      message: errors.errors[0].msg,
    });
  } else next();
};
