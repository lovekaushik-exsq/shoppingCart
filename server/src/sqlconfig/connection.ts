import * as mysql from 'mysql';
import dotenv from "dotenv";
dotenv.config();
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
export const pool = mysql.createPool({
    host: '127.0.0.1',
    user: "root",
    password: "",
    database: "shopping"
});

// var test = function (req: Request, res: Response) {
//     pool.getConnection(function (err, conn) {
//         conn.query("select * from users", function (err, rows) {
//             // res.json(rows);
//         })
//     })
// }
