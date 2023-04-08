const db = require('../db/investWithFriendsDb');

const userService = {};

userService.userExists = async (email) => {
  const query = ('SELECT * FROM users WHERE email = $1;');
  const { rows: userEntry } = await db.query(query, [email]);

  return !!userEntry.length;
};

userService.createUser = async (firstName, lastName, email, password) => {
  const query = (
    'INSERT INTO users (first_name, last_name, email, password) '
    + 'VALUES ($1, $2, $3, $4)'
  );
  const params = [firstName, lastName, email, password];
  const insert = await db.query(query, params);

  return insert.rowCount === 1;
};

module.exports = userService;
