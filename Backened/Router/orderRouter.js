import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../Model/orderModel.js";
import { isAuth } from "../util.js";

const orderRouter = express.Router();

export const OrderPostRouter = orderRouter.post(
  "/order",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({ message: "Cart is Empty" });
    } else {
      // console.log(req.body.orderItems);
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: res.user._id,
      });

      const createdOrder = await order.save();
      res.status(201).send(createdOrder);
    }
  })
);

export const OrderGetRoute = orderRouter.get(
  "/order/:id",
  expressAsyncHandler(async (req, res) => {
    const getOrderDetail = await Order.findById(req.params.id);
    if (getOrderDetail) {
      res.status(200).send({ getOrderDetail });
    } else {
      res.status(404).send({ message: "Product Does not Found" });
    }
  })
);

export const orderPayRoute = orderRouter.put(
  "/order/:id/pay",
  expressAsyncHandler(async (req, res) => {
    // If an order is an existing
    const order = await Order.findById(req.params.id);
    // then we want to update what we want to update
    console.log(order);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body_id,
        status: req.body.status,
        update_At: req.body.update_At,
        email: req.body.email_address,
      };
    }
    const updatedOrder = await order.save();

    if (updatedOrder) {
      res.status(200).send({ updatedOrder });
    } else {
      res.status(404).send({ message: "Order Payment Not found" });
    }
  })
);
