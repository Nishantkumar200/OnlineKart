import React, { useEffect } from "react";
import {
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";

import "../style/placeOrder.css";
import { useHistory } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../Action/OrderAction";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, paymentMethod, cartItems } = cart;

  if (!cart.paymentMethod) {
    history.push("/payment");
  }

  if (!cartItems.length) {
    history.push("/");
  }

  const OrderedItemsdetail = useSelector(
    (state) => state.wholeOrderInformation
  );

  const {success,orderItems } = OrderedItemsdetail;
  console.log(orderItems);
  //console.log(OrderedItemsdetail);

  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12 => 5"

  // calculation of all prices
  cart.itemsPrice = toPrice(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
  cart.shippingPrice = cart.itemsPrice < 100 ? toPrice(0) : toPrice(10);

  cart.taxPrice = toPrice(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;
  const handleOrder = (e) => {
    // Here we are doing that we are loading whole cart and we are assigning the cartItems parts into the orderItems.
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
   
  };

  useEffect(()=>{
    if(success){
      history.push(`/order/${orderItems._id}`);
    }
  },[history,success])
 
  return (
    <>
      <Container style={{ width: 950 }}>
        <Stepper activeStep={3}>
          <Step>
            <StepLabel>Sign in</StepLabel>
          </Step>
          <Step>
            <StepLabel>Shipping Address</StepLabel>
          </Step>
          <Step>
            <StepLabel>Payment</StepLabel>
          </Step>
          <Step>
            <StepLabel>Place Order</StepLabel>
          </Step>
        </Stepper>
      </Container>

      <Container>
        <Grid container justify="space-between">
          <Grid item lg={8}>
            <Paper className="addressPaper">
              <Typography>
                <strong>Shipping to :</strong>
                {shippingAddress.fullName}{" "}
              </Typography>
              <Typography>
                <strong>Address:</strong>
                {shippingAddress.address} , {shippingAddress.city} ,
                {shippingAddress.postalcode} , {shippingAddress.country}
              </Typography>
            </Paper>
            <Paper className="addressPaper">
              <Typography>
                <strong>Payment Method :</strong>
                {paymentMethod}{" "}
              </Typography>
            </Paper>
            <Paper className="addressPaper">
              <Typography>
                <strong>Ordered Items </strong>
              </Typography>
              <Grid container direction="column">
                {cartItems.map((eachItem, index) => (
                  <Grid
                    key={index}
                    container
                    alignItems="center"
                    justify="space-between"
                    className="eachproduct"
                  >
                    <Grid item>
                      <img
                        src={eachItem.image}
                        alt=""
                        className="previewImage"
                      />
                    </Grid>
                    <Grid item>
                      <Typography>{eachItem.name}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>
                        {eachItem.qty} X ${eachItem.price} = $
                        {eachItem.qty * eachItem.price}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          <Grid item lg={4} className="placeOrder">
            <Paper
              style={{
                justifyContent: "center",
                padding: 25,
                background: "#cce6ff",
              }}
            >
              <Typography variant="h6">Order Summary</Typography>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <strong>Items Price</strong>
                </Grid>
                <Grid item>${cart.itemsPrice.toFixed(2)}</Grid>
              </Grid>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  {" "}
                  <strong>Delivery Charges</strong>
                </Grid>
                <Grid item>${cart.shippingPrice.toFixed(2)}</Grid>
              </Grid>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  {" "}
                  <strong>Tax</strong>
                </Grid>
                <Grid item>${cart.taxPrice.toFixed(2)}</Grid>
              </Grid>
              <hr />
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  {" "}
                  <strong>Net Price</strong>
                </Grid>
                <Grid item>${cart.totalPrice.toFixed(2)}</Grid>
              </Grid>
              <Button
                className="placeorderbtn"
                variant="contained"
                color="primary"
                onClick={handleOrder}
              >
                 Place Order 
              </Button>
             
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PlaceOrder;
