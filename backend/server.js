// import { ConnectDB } from './src/utils/connectDB';
import * as dotenv from 'dotenv';
import express from 'express';
import colors from 'colors';
import ConnectDB from './src/utils/connect.js';
dotenv.config();
ConnectDB();
const app = express();

// console.log(process.env.PORT)

app.listen(5000, () => {
    console.log(colors.yellow.underline(`Server Succesfully running on http://localhost:5000`));
});


