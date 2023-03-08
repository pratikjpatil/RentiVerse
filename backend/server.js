const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();

const connectDB = require("./config/db");
connectDB();


const showAllProducts = require("./routes/showAllProducts");



app.use(express.json());
app.use(cors());



app.use('/showallproducts', showAllProducts);




app.get('/', (req,res)=>{
    res.send('<h1>Welcome to AgroRent</h1>');
})


app.listen(PORT, () => {
    console.log(`Server Succesfully running on http://localhost:5000`);
});


