const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const checkAuth = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];

		if (!token) {
			throw new Error('Authentication failed');
		}

		const payload = jwt.verify(token, JWT_SECRET);
		res.locals.userId = payload.id;

		return next();
	} catch (err) {
		return next(err);
	}
};

module.exports = checkAuth;
