import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
  TextField,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../Action/CartAction";

const ShippingAddress = () => {
  const history = useHistory();
  const { shippingAddress } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);

  if (!userInfo) {
    history.push("/signin");
  }

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalcode, setPostalCode] = useState(shippingAddress.postalcode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();

  const handleShippingAddress = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ fullName, address, city, postalcode, country })
    );

    history.push("/payment");
  };
  return (
    <>
      <Container style={{ width: 950 }}>
        <Stepper activeStep={1}>
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

      <Container className="shippingContainer" style={{ width: 910 }}>
        <form onSubmit={handleShippingAddress}>
          <Grid container direction="column">
            <Grid item>
              <TextField
                label="Full Name"
                type="text"
                value={fullName}
                variant="outlined"
                fullWidth
                style={{ marginBottom: 7 }}
                onChange={(e) => setFullName(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Address"
                type="text"
                value={address}
                variant="outlined"
                fullWidth
                style={{ marginBottom: 7 }}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="City"
                type="text"
                value={city}
                variant="outlined"
                fullWidth
                style={{ marginBottom: 7 }}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Postal Code"
                type="number"
                value={postalcode}
                variant="outlined"
                fullWidth
                style={{ marginBottom: 7 }}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Country"
                type="text"
                value={country}
                variant="outlined"
                fullWidth
                style={{ marginBottom: 7 }}
                onChange={(e) => setCountry(e.target.value)}
              />
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShippingAddress}
                >
                  Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

export default ShippingAddress;
