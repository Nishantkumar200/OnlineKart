import React, { useEffect } from "react";
import "../style/cartStyle.css";
import { useParams, useHistory } from "react-router-dom";
import { addToCart, removeFromCart } from "../Action/CartAction";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Button, Container, Grid, Typography } from "@material-ui/core";

const CartPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  // this is returning quanity value
  const quantity = window.location.search
    ? Number(window.location.search.split("=")[1])
    : 1;

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, quantity));
    }
  }, [id, quantity, dispatch]);

  return (
    <>
      <Container>
        {cartItems.length > 0 ? (
          <Typography className="cartname">Your Shopping Cart</Typography>
        ) : (
          <Typography className="cartname2" variant="body1">
            Your Shopping Cart is empty !{" "}
            <span>
              <Link to="/" style={{ textDecoration: "none" }}>
                Go to shopping store .
              </Link>
            </span>
          </Typography>
        )}

        <Grid container justify="space-between" spacing={8}>
          <Grid item lg={9}>
            {cartItems.map((cartProduct) => (
              <Grid
                container
                justify="space-between"
                className="cartContainer"
                alignItems="center"
                spacing={2}
              >
                <Grid item lg={2}>
                  <img
                    src={cartProduct.image}
                    alt={cartProduct.name}
                    className="cartImage"
                  />
                </Grid>
                <Grid item lg={2}>
                  <Link
                    to={`/product/${cartProduct.product}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Typography>{cartProduct.name}</Typography>
                  </Link>
                </Grid>
                <Grid item lg={2}>
                  <select
                    className="finalSelect"
                    value={cartProduct.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(cartProduct.product, Number(e.target.value))
                      )
                    }
                  >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                  </select>
                </Grid>
                <Grid item lg={2}>
                  <Typography>${cartProduct.price}</Typography>
                </Grid>

                <Grid item lg={2}>
                  <Button
                    type="button"
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      dispatch(removeFromCart(cartProduct.product))
                    }
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>

          {cartItems.length > 0 ? (
            <Grid item lg={3} justify="center">
              <div className="checkOutSection">
                <Typography variant="body1">
                  <b> Subtotal :</b> ({cartItems.reduce((a, c) => a + c.qty, 0)}{" "}
                  Items)
                </Typography>
                <Grid container alignItems="center" justify="space-between">
                  <Grid item>
                    <Typography variant="subtitle1">Total Cost </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      <b>
                        ${cartItems.reduce((a, c) => a + c.qty * c.price, 0)}
                      </b>
                    </Typography>
                  </Grid>
                </Grid>

                <button
                  className="checkoutbtn"
                  onClick={() => {
                    history.push("/signin?redirect=shipping");
                  }}
                >
                  proceed to checkout
                </button>
              </div>
            </Grid>
          ) : (
            " "
          )}
        </Grid>
      </Container>
    </>
  );
};

export default CartPage;
