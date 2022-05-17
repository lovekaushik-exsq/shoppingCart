import { connection } from "../sqlconfig/connection";
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