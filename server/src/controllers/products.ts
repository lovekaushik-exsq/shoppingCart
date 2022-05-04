import { NextFunction, Request, Response } from "express";
import fs from "fs";

export const getAllProducts = (req: Request, res: Response) => {
    fs.readFile("../try.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File failed to read: ", err);
            return;
        }
        try {
            const products = JSON.parse(jsonString);
            let size = Object.keys(products).length;
            let output = [];
            console.log(size);
            for (let i = 0; i < size; i++) {
                if (products[i].sub_category == "dress") {
                    output.push(products[i]);
                }
            }

            return res.send(products);
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    })
}