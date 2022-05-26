import * as mysql from 'mysql';
import { pool } from "../sqlconfig/connection";
import { entity } from "../models/types";

//Running the sql queries

export const runQuery = async (sql: string): Promise<entity[]> => {
    return await new Promise(
        (resolve, reject) => pool.getConnection((err: Error, connection: mysql.PoolConnection) => {
            connection.query(sql, (err: Error, result: object) => {
                if (err) reject(err);
                resolve(result);
                connection.release();
            })
        })
    ).then(val => JSON.parse(JSON.stringify(val)));
}