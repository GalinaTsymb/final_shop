const mySQL = require('mysql2');
/*require("dotenv").config();*/
const { HOST, DB_USER, DB_PASS, DB_NAME } = process.env;

const connection = mySQL.createConnection({
    host: HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
});
connection.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Database is connected!');
});
module.exports = connection;
