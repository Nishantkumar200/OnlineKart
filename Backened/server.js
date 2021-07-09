import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser, { json } from "body-parser";
import {registerRouter,signInRoute,userRouter,} from "./Router/userRouter.js";
import {AllProducts,GetOneProduct,productRouter,} from "./Router/productRouter.js";
import mongoose from "mongoose";

import Order from "./Model/orderModel.js";
import { OrderGetRoute, orderPayRoute, OrderPostRouter } from "./Router/orderRouter.js";

const app = express();
app.use(cors());
app.use(json());

dotenv.config();

const db = mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/amazona",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  }
);

db.then(console.log("successfully connected to the database")).catch((err) =>
  console.log(err)
);

app.get('/api/config/paypal',(req,res) =>{
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
})

//User Routing
app.use("/api/users", userRouter);
// user sign in
app.use("/api/users", signInRoute);
// user Register
app.use("/api/users", registerRouter);

// create new product data
app.use("/api", productRouter);
app.use("/api", AllProducts);
// get one product data
app.use("/api", GetOneProduct);

app.use("/api",OrderPostRouter);
app.use("/api",OrderGetRoute);
app.use("/api",orderPayRoute);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
