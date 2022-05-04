import express, { Application } from "express";
import { connection } from "./sqlconfig/connection";
import cors from "cors";
import dotenv from "dotenv";

const auth = require('./routes/auth');
const products = require("./routes/products");
const order = require("./routes/cartAndOrder");

const app: Application = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    console.log("index is working");
    res.send("/ is getting")
})
app.use('/auth', auth);
app.use('/products', products);
app.use('/order', order);

app.listen(process.env.PORT || 5000, () => {
    console.log("Server listening on Port");
    connection.connect(function (err: Error) {
        if (err) throw err;
        console.log("Database connected.")
    })
})