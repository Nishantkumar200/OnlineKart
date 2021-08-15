import express from "express";
import productModel from "../Model/productModel.js";
import expressAsyncHandler from "express-async-handler";
import data from "../data/data.js";

const router = express.Router();


// For creating new products
export const productRouter = router.get(
    "/createdproducts",
    expressAsyncHandler(async (req, res) => {
      await productModel.remove({});
      const createdNewProducts = await productModel.insertMany(data);
  
      res.send({ createdNewProducts });
    })
  );
  
  // For getting all produts
  export const AllProducts = router.get(
    "/products",
    expressAsyncHandler(async (req, res) => {
      res.send(await productModel.find({}));
    })
  );
  
  // For creating one product
  
  export const GetOneProduct = router.get(
    "/products/:id",
    expressAsyncHandler(async (req, res) => {
      const oneProductDetail = await productModel.findById(req.params.id);
  
      if (oneProductDetail) {
        res.send(oneProductDetail);
      }else{
        res.status(404).send("Product does not found ");
      }
    })
  );

