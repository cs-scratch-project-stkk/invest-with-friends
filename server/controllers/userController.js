const { createUser, userExists } = require('../services/userService');

const userController = {};

userController.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (await userExists(email)) {
      throw new Error('email already in use.');
    }

    res.locals.createUserSuccess = await createUser(firstName, lastName, email, password);

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = userController;
