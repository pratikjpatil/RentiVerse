const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const http = require('http')
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 4500;
dotenv.config();

const connectDB = require("./config/db");
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors(
  {
    origin: ['http://localhost:3000', 'https://rentiverse.netlify.app'],
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


// Setup Socket.IO
const { setupSocket } = require("./socket/socket");
setupSocket(server);


const getProductsRoutes = require("./routes/getProductsRoutes"); //landing page, dashboard page
const userRoutes = require("./routes/userRoutes");  //user registration, login, check if logged in
const productRoutes = require("./routes/productRoutes");    //add on rent page
const userProfileRoutes = require("./routes/userProfileRoutes");    //profile page, show profile details and edit profile details
const productRequest = require("./routes/productRequestRoutes");   //request feature, send product request to owner for rent, show received requests for your listed products, accept the request , reject the request
const paymentRoute = require("./routes/paymentRoute"); 
const notificationRoutes = require("./routes/notificationRoutes");
const productReturnRoutes = require("./routes/productReturnRoutes");


app.use("/api/products", getProductsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/profile", userProfileRoutes);
app.use("/api/request", productRequest);
app.use("/api/payment", paymentRoute);
app.use("/api/notification", notificationRoutes);
app.use("/api/productreturn", productReturnRoutes);



app.get("/", (req, res) => {
  return res.send("<h1>Welcome to RentiVerse</h1>");
});

 server.listen(PORT ,() => {
  console.log(`Server Succesfully running on http://localhost:${PORT}`);
});
