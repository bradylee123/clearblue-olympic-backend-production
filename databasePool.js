const { Pool } = require('pg');

var config = {
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.DBPORT
};

const pool = new Pool(config);
pool.on('error', function (err, client) {
  console.error('Client Idle Error', err.message, err.stack);
});

module.exports.pool = pool;

module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

module.exports.connect = function (callback) {
  return pool.connect(callback);
};
