import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React, { useEffect } from "react";
import "../style/producthomepage.css";
import { Link } from "react-router-dom";
import { fetchAllProduct } from "../Action/productAction";

import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  // Destructuring means taking out loading and allproducts from productList array
  const { loading } = productList;
  const allProducts = productList.allProducts;
  useEffect(() => {
    dispatch(fetchAllProduct());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
      ) : (
        <Container>
          <Grid container spacing={2}>
            {allProducts.map((p) => (
              <Grid item lg={4} sm={12} key={p._id}>
                <div className="product">
                  <div>
                    <Link to={`/product/${p._id}`} className="image">
                      <img src={p.productImage} alt=" product " />
                    </Link>
                  </div>
                  <div className="productDetail">
                    <Typography>{p.name}</Typography>
                    <Rating value={p.rating} size="small" readOnly={true} />
                    <span>{p.numRevies} reviews</span>
                    <Typography variant="subtitle1">$ {p.price}</Typography>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}{" "}
    </>
  );
};

export default Product;
