const { Pool } = require('pg');

const PG_URI = 'postgres://khdcswpz:0rKJ3iUwCHP6awn7bBLufyoEJiEYjIZv@queenie.db.elephantsql.com/khdcswpz';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
