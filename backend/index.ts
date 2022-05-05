import express,{Request,Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ErrorHandler } from './errorMiddleware/errorHandler';

const port: number = 5000;
const url:string = "mongodb://localhost:27017/users";

const signupRoutes = require('./routes/signup');
const loginRoutes = require('./routes/login')
const forgotRoutes = require('./routes/forgot')

const app = express();
app.use(express.json());
app.use(cors());
app.use('/signup',signupRoutes);
app.use('/login',loginRoutes);
app.use('/forgot',forgotRoutes);

const errorHandler = new ErrorHandler();
app.use(errorHandler.errorHandler);


mongoose.connect(url, (err: any) =>{
    if (err) {
    console.log(err.message);
    } else {
    console.log(`Connecting to MONGO`);
    } 
});

app.listen(port, () => {console.log(`Listening on port ${port}`);});
