const db = require('../db/investWithFriendsDb');

const userService = {};

userService.userExists = async (email) => {
  const query = ('SELECT * FROM users WHERE email = $1;');
  const { rows: userEntry } = await db.query(query, [email]);

  return !!userEntry.length;
};

userService.createUser = async (username, email, password) => {
  const query = (
    'INSERT INTO users (username, email, password) '
    + 'VALUES ($1, $2, $3)'
  );
  const insert = await db.query(query, [username, email, password]);

  return insert.rowCount === 1;
};

module.exports = userService;
