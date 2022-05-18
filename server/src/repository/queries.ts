import * as mysql from 'mysql';
// import { connection } from "../sqlconfig/connection";
import { connection, pool } from "../sqlconfig/connection";
import { entity } from "../types";

//Running the sql queries
export const runQuery = async (sql: string): Promise<entity[]> => {
    return await new Promise(
        (resolve, reject) => connection.query(sql, (err: Error, result: object) => {
            if (err) { reject(err); }
            resolve(result);
        })
    ).then(val => JSON.parse(JSON.stringify(val)));
}
// const query = async (sql: string): Promise<entity[]> => {
//     return await new Promise(
//         (resolve, reject) => connection.query(sql, (err: Error, result: object) => {
//             if (err) { reject(err); }
//             resolve(result);
//         })
//     ).then(val => JSON.parse(JSON.stringify(val)));
// }

// export const runQuery = (sql: string) => {

// }

// var getConnection = function (callback: any) {
//     pool.getConnection(function (err: Error, connection: mysql.Connection) {
//         callback(err, connection);
//     });
// }