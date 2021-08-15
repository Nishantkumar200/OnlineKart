import React, { useState } from "react";
import {
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import "../style/payment.css";
import { paymentMethod } from "../Action/CartAction";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const PaymentMethod = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [payment, setPayment] = useState("PayPal");
  const { userInfo } = useSelector((state) => state.user);
  const { shippingAddress } = useSelector((state) => state.cart);

  if (!userInfo) {
    history.push("/signin");
  }

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const handleChange = (e) => {
    setPayment(e.target.value);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    dispatch(paymentMethod(payment));
    history.push('/placeorder');
  };
  console.log(payment);
  return (
    <>
      <Container style={{ width: 950 }}>
        <Stepper activeStep={2}>
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

      <Container className="paymentContainer">
        <form onSubmit={handleContinue}>
          <Typography>Choose your payment method</Typography>
          <RadioGroup name="payment" value={payment} onChange={handleChange}>
            <FormControlLabel
              value="PayPal"
              control={<Radio />}
              label="Paypal"
            />
            <FormControlLabel
              value="Stripe"
              control={<Radio />}
              label="Stripe"
            />
          </RadioGroup>

          <Button
            variant="contained"
            onClick={handleContinue}
            className="continue"
          >
            Continue
          </Button>
        </form>
      </Container>
    </>
  );
};

export default PaymentMethod;
