'use strict';
/* istanbul ignore file */
const mysql = require('mysql');
let db = {};

const { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE} = process.env;

db = {
  dbPool: null,
  _connection: null,
  getSettings: function () {
    const mysqlParams = {
      host: MYSQL_HOST,
      port: MYSQL_PORT,
      user: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DATABASE,
    };

    return mysqlParams;
  },
  connect: () => {
    return new Promise((resolve, reject) => {
      const dbSettings = db.getSettings();

      if (!db.dbPool) {
        db.dbPool = mysql.createPool(dbSettings);
      }

      db.dbPool.getConnection(function (err, connection) {
        if (err) {
          return reject(err);
        }
        db._connection = connection;
        return resolve(db._connection);
      });
    });
  },
  query: (query, params = []) => {
    return new Promise((resolve, reject) => {
      db.connect()
        .then((connection) => {
          connection.query(query, params, function (err, reply) {
            connection.release();
            if (err) {
              return reject(err);
            }
            return resolve(reply);
          });
        })
        .catch((error) => {
          return reject(error);
        });
    });
  },
};

module.exports = { query: db.query };
