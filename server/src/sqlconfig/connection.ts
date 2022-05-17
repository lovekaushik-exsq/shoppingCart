import dotenv from "dotenv";
dotenv.config();
const mysql = require('mysql');
//CREATE CONNECTION
// export const connection = mysql.createConnection({
//     host: process.env.host,
//     user: process.env.user,
//     password: process.env.password,
//     database: process.env.database
// });
export const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: "root",
    password: "",
    database: "shopping"
});