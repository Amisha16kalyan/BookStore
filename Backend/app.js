const express = require("express");
const app = express();
const cors=require("cors");
require("dotenv").config();
require("./connection/conn");

const User=require("./routes/user");
const Books=require("./routes/book");
const Favourite=require("./routes/favourite");
const Cart=require("./routes/cart");
const Order=require("./routes/order");
app.use(cors());
app.use(express.json());
app.use("/",User);
app.use("/",Books);
app.use("/",Favourite);
app.use("/",Cart);
app.use("/",Order);
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
