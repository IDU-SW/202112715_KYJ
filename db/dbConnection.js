const mysql = require('mysql2');

const dbConfig = {
   host: 'nodedb.cjb7uqaza4lo.ap-northeast-2.rds.amazonaws.com',
   user: 'admin',
   password: 'yejin2908',
   port: 3306,
   database: 'sys',
   multipleStatements: true,
   dateStrings:"date"
};

const pool = mysql.createPool(dbConfig).promise();
module.exports = pool;
