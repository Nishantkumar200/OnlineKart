import React from "react";
import "./App.css";

import AppBar from "@material-ui/core/Appbar";
import {
  Badge,
  Grid,
  Menu,
  Toolbar,
  Typography,
  MenuItem,
} from "@material-ui/core";
import Product from "./Components/Product";
import { BrowserRouter, Route, Link } from "react-router-dom";
import ProductDetail from "./Components/ProductDetail";
import CartPage from "./Components/CartPage";
import { SIGNOUT } from "./Action/userAction";

import { useSelector, useDispatch } from "react-redux";
import SignIn from "./Components/SignIn";
import Userregister from "./Components/Userregister";
import ShippingAddress from "./Components/ShippingAddress";
import PaymentMethod from "./Components/PaymentMethod";
import PlaceOrder from "./Components/PlaceOrder";
import OrderDetail from "./Components/OrderDetail";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userSignIn = useSelector((state) => state.user);
  const { userInfo } = userSignIn;
  const { cartItems } = cart;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <BrowserRouter>
        <AppBar position="sticky">
          <Toolbar>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="space-between"
            >
              <Grid item>
                <Link to="/" className="link">
                  <Typography>ShoppinG Cart</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Grid container spacing={3} direction="flex">
                  <Grid item>
                    <Link to="/cart" className="link">
                      {cartItems.length > 0 ? (
                        <Badge
                          badgeContent={cartItems.length}
                          color="secondary"
                        >
                          <Typography>Cart</Typography>
                        </Badge>
                      ) : (
                        <Typography>Cart</Typography>
                      )}
                    </Link>
                  </Grid>
                  <Grid item>
                    {userInfo ? (
                      <div>
                        <Link to="#" className="link">
                          <Typography
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                          >
                            {userInfo.name}
                          </Typography>
                        </Link>

                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={() => dispatch(SIGNOUT())}>
                            <Link
                              to="#signout"
                              style={{ textDecoration: "none" }}
                            >
                              SIGN OUT
                            </Link>
                          </MenuItem>
                        </Menu>
                      </div>
                    ) : (
                      <Link to="/signin" className="link">
                        <Typography>Sign in</Typography>
                      </Link>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>

        {/*To get all product*/}
        <Route exact path="/">
          <Product />
        </Route>

        {/*To get single product*/}
        <Route path="/product/:_id">
          <ProductDetail />
        </Route>

        {/*To cart page*/}

        <Route path="/cart/:id?">
          <CartPage />
        </Route>

        <Route path="/signin">
          <SignIn />
        </Route>

        <Route path="/register">
          <Userregister />
        </Route>

        <Route path="/shipping">
          <ShippingAddress />
        </Route>
        <Route path="/payment">
          <PaymentMethod />
        </Route>
        <Route path="/placeorder">
          <PlaceOrder />
        </Route>
        <Route path="/order/:_id">
          <OrderDetail />
        </Route>
      </BrowserRouter>
    </>
  );
}

export default App;
