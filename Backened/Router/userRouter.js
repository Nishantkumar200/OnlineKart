import express from "express";
import user from "../data/user.js";
import userModel from "../Model/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../util.js";
import bcrypt from "bcrypt";

const router = express.Router();

// review - expressAsyncHandler;
export const userRouter = router.get(
  "/seed",
  expressAsyncHandler(async (req, res) => {
    // just -it was testing --------------await userModel.remove({});
    const newUsers = await userModel.insertMany(user);
    res.send(newUsers);
  })
);

// sigin user
export const signInRoute = router.post(
  "/signin",
  expressAsyncHandler(async (req, res) => {
    const user = await userModel.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
      }
    } else {
      res.status(401).send(error);
    }
  })
);

// Register Router API
export const registerRouter = router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const user = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });


    // if I am making this routing function async and not including await then erro will come
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);
