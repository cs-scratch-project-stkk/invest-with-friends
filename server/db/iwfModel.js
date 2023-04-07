const { Pool } = require('pg');

const PG_URI = 'postgres://kxwscezd:vAsnsPw-7HVp-sACYCLrZiE7KR4JD5ID@drona.db.elephantsql.com/kxwscezd';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
