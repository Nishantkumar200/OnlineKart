import React, { useEffect, useState } from "react";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import {
  Backdrop,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import "../style/productdetail.css";
import { Link, useParams } from "react-router-dom";
import { Rating } from "@material-ui/lab";

import { useSelector, useDispatch } from "react-redux";
import { getParticularProductDetail } from "../Action/productAction";
import { useHistory } from "react-router-dom";

const ProductDetail = () => {
  // By default we have set quantity = 1 ;
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const Oneproduct = useSelector((state) => state.oneProductList);

  const history = useHistory();

  // for getting the id from url;
  const { _id } = useParams();

  //comparing the value and it is returning the matched object
  //const product = data.product.find((x) => x._id == _id);

  // console.log(_id);
  // console.log(product);

  //console.log("single Product", Oneproduct);

  const { loading, product } = Oneproduct;
  //console.log(loading, product);


  
  //handleAddToCart
  const handleAddToCart = () => {
    history.push(`/cart/${_id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(getParticularProductDetail(_id));
  }, [_id, dispatch]);

  return (
    <>
      {loading ? (
        <Backdrop open={loading}>
          <CircularProgress />
        </Backdrop>
      ) : (
        <>
          <Link to="/" className="backsection_top">
            <KeyboardBackspaceIcon />
            <Typography variant="subtitle2">Back to result</Typography>
          </Link>
          <Container>
            <Grid container justify="space-between">
              <Grid item lg={6}>
                <img
                  src={product?.productImage}
                  alt="review_productimage"
                  className="reviewProduct"
                />
              </Grid>
              <Grid item lg={3}>
                <Typography variant="h5">{product?.name}</Typography>
                <Rating readOnly value={product?.rating} />
                <Typography className="review">{product?.reviews}</Typography>
                <Typography variant="subtitle1">{`Price: $${product?.price}`}</Typography>
                <Typography variant="subtitle2">
                  Description : {product?.description}
                </Typography>
                <Typography>Image : </Typography>
                <img src={product?.productImage} className="small" alt="" />
              </Grid>

              <Grid item lg={3}>
                <div className="rightSection">
                  <Typography variant="subtitle1">Seller</Typography>
                  <Typography variant="subtitle2">{product?.brand}</Typography>
                  <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                      <Typography>
                        <Rating value={product?.rating} readOnly />
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography className="review">
                        {product?.numRevies} reviews
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                      <Typography>Price</Typography>
                    </Grid>
                    <Grid item>
                      <Typography className="review">
                        ${product?.price}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                      <Typography>Status</Typography>
                    </Grid>
                    <Grid item>
                      {product?.quantity > 0 ? (
                        <Typography className="stock">In Stock</Typography>
                      ) : (
                        <Typography className="outStock">
                          Out of Stock
                        </Typography>
                      )}
                    </Grid>
                  </Grid>

                  <Grid container alignItems="center" justify="space-between">
                    <Grid item>
                      <Typography>Qty</Typography>
                    </Grid>
                    <Grid item>
                      <select
                        className="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                      </select>
                    </Grid>
                  </Grid>
                  {product?.quantity > 0 ? (
                    <button className="addToCart" onClick={handleAddToCart}>
                      Add to cart
                    </button>
                  ) : (
                    <button className="addToCartdisabled" disabled readOnly>
                      Add to cart
                    </button>
                  )}
                </div>
              </Grid>
            </Grid>
          </Container>
        </>
      )}
    </>
  );
};

export default ProductDetail;
