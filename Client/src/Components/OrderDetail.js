import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { orderDetail } from "../Action/orderDetailAction";
import { PayPalButton } from "react-paypal-button-v2";
import {
  Backdrop,
  Container,
  Grid,
  Paper,
  Typography
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { orderPay } from "../Action/OrderAction";

const OrderDetail = () => {
  const { _id } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();
  const { loading, order } = useSelector((state) => state.order);

  //console.log(loading,order);
  const CustomerOrder = order?.getOrderDetail;
 // console.log(CustomerOrder);

  useEffect(() => {
    const AddPayPalScript = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/config/paypal"
      );
      const script = document.createElement("script");
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!CustomerOrder?._id) {
      dispatch(orderDetail(_id));
    } else {
      if (!CustomerOrder?.isPaid) {
        if (!window.paypal) {
          AddPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, CustomerOrder, _id]);

  const handleSuccessHandler = (order, paymentResult) => {
    dispatch(orderPay(order, paymentResult));
  };

  return (
    <>
      {loading ? (
        <Backdrop open={loading} />
      ) : (
        <Container style={{ marginTop: 30 }}>
          <Typography>Order {CustomerOrder?._id}</Typography>
          <Grid container justify="space-between">
            <Grid item lg={8}>
              <Paper className="addressPaper">
                <Typography>
                  <strong>Shipping to :</strong>
                  {CustomerOrder?.shippingAddress.fullName}{" "}
                </Typography>
                
                <Typography>
                  <strong>Address:</strong>
                  {CustomerOrder?.shippingAddress.address} ,{" "}
                  {CustomerOrder?.shippingAddress.city} ,
                  {CustomerOrder?.shippingAddress.postalcode} ,{" "}
                  {CustomerOrder?.shippingAddress.country}
                </Typography>
                {!CustomerOrder?.isDelivered ? (
                  <Alert severity="warning">Not Delivered </Alert>
                ) : (
                  <Alert severity="success">Delivered </Alert>
                )}
              </Paper>
              <Paper className="addressPaper">
                <Typography>
                  <strong>Payment Method :</strong>
                  {CustomerOrder?.paymentMethod}{" "}
                </Typography>
                {!CustomerOrder?.isPaid ? (
                  <Alert severity="warning">Not Paid </Alert>
                ) : (
                  <Alert severity="success">Paid</Alert>
                )}
              </Paper>
              <Paper className="addressPaper">
                <Typography>
                  <strong>Ordered Items </strong>
                </Typography>
                <Grid container direction="column">
                  {CustomerOrder?.orderItems.map((eachItem, index) => (
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
                  <Grid item>${CustomerOrder?.itemsPrice.toFixed(2)}</Grid>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    {" "}
                    <strong>Delivery Charges</strong>
                  </Grid>
                  <Grid item>${CustomerOrder?.shippingPrice.toFixed(2)}</Grid>
                </Grid>
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    {" "}
                    <strong>Tax</strong>
                  </Grid>
                  <Grid item>${CustomerOrder?.taxPrice.toFixed(2)}</Grid>
                </Grid>
                <hr />
                <Grid container justify="space-between" alignItems="center">
                  <Grid item>
                    {" "}
                    <strong>Order Total</strong>
                  </Grid>
                  <Grid item>${CustomerOrder?.totalPrice.toFixed(2)}</Grid>
                </Grid>
                {!CustomerOrder?.isPaid && !sdkReady ? (
                  <Backdrop open={sdkReady} />
                ) : (
                  <PayPalButton
                    currency="USD"
                    amount={CustomerOrder?.totalPrice}
                    onSuccess={handleSuccessHandler}
                  />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default OrderDetail;
