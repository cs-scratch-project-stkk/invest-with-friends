const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { API_KEY, PG_URI } = process.env;

module.exports = {
  API_KEY,
  PG_URI,
};
