const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { createUser, userExists, getExistingUser } = require('../services/userService');
const { JWT_SECRET } = require('../utils/config');

const userController = {};

userController.signup = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body.userData;

		if (await userExists(email)) {
			throw new Error('email already in use.');
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const createdUser = await createUser(firstName, lastName, email, hashedPassword);

		const token = jwt.sign({ id: createdUser.id }, JWT_SECRET);
		res.locals.createdUser = { ...createdUser, ...{ token: token } };

		return next();
	} catch (err) {
		return next(err);
	}
};

userController.login = async (req, res, next) => {
	try {
		const { email, password } = req.body.userData;
		const existingUser = await getExistingUser(email);

		const isValidPassword = await bcrypt.compare(password, existingUser.password);
		delete existingUser.password;

		let token;

		if (isValidPassword) {
			token = jwt.sign({ id: existingUser.id }, JWT_SECRET);
			res.locals.existingUser = { ...existingUser, ...{ token: token } };
		}

		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = userController;
