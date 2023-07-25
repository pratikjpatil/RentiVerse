const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 4500;
dotenv.config();

const connectDB = require("./config/db");
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true 
  }
));

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})




const showAllProducts = require("./routes/showAllProducts");
const user = require("./routes/user");
const getMyTools = require("./routes/getMyTools");
const addOnRent = require("./routes/addOnRent");



app.use("/api/products", showAllProducts);
app.use("/api/user", user);
app.use("/api/tools", getMyTools);
app.use("/api/rent", addOnRent);



app.get("/", (req, res) => {
  return res.send("<h1>Welcome to AgroRent</h1>");
});

app.listen(PORT, () => {
  console.log(`Server Succesfully running on http://localhost:${PORT}`);
});
