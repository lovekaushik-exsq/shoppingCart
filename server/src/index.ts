import express, { Application } from "express";
import { pool } from './sqlconfig/connection'
import cors from "cors";
import auth from './routes/auth';
import products from "./routes/products";
import order from "./routes/cartAndOrder";
import address from "./routes/address";

const app: Application = express();

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
app.use('/address', address)

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server listening on Port ${process.env.PORT}`);
    pool.getConnection(function (err: Error) {
        if (err) throw err;
        console.log("Database connected.")
    })
})