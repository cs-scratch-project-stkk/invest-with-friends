const db = require('../db/investWithFriendsDb');

const userService = {};

userService.userExists = async (email) => {
  const query = ('SELECT * FROM users WHERE email = $1;');
  const { rows: userEntry } = await db.query(query, [email]);

  return !!userEntry.length;
};

userService.createUser = async (firstName, lastName, email, password) => {
  const query = (`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4) 
    RETURNING user_id AS id, first_name AS "firstName", last_name AS "lastName", email
  `);
  const params = [firstName, lastName, email, password];
  const data = await db.query(query, params);

  const createdUser = data.rows[0]

  return createdUser;
};

userService.getExistingUser = async (email) => {
  const query = (`
    SELECT user_id AS id, first_name AS "firstName", last_name AS "lastName", email, password 
    FROM users WHERE email=$1
  `);
  const params = [email];

  const data = await db.query(query, params);
  const existingUser = data.rows[0];

  return existingUser;
}

module.exports = userService;
