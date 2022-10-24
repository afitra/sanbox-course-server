require('dotenv').config(); // this is important!
module.exports = {
"development": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DBNAME,
    "host": process.env.MYSQL_HOST,
    "dialect": process.env.DIALECT
},
"test": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DBNAME,
    "host": process.env.MYSQL_HOST,
    "dialect": process.env.DIALECT
},
"production": {
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "database": process.env.MYSQL_DBNAME,
    "host": process.env.MYSQL_HOST,
    "dialect": process.env.DIALECT
}
};