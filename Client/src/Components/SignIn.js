import React, { useState, useEffect } from "react";
import "../style/signinstyle.css";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import { Link,useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { USER_SIGN } from "../Action/userAction";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";

  const { userInfo } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(USER_SIGN(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  return (
    <>
      <Container className="mainContainer">
        <Typography variant="h5" style={{ marginBottom: 20, marginTop: 20 }}>
          Sign In Your Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="email"
            label="Email"
            required
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <TextField
            type="password"
            label="Password"
            required
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />

          <Button
            variant="contained"
            size="large"
            color="primary"
            style={{ marginBottom: 10 }}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
        </form>

        <Typography>
          Don't have an account ?{" "}
          <Link to={`/register?redirect=${redirect}`} style={{ textDecoration: "none" }}>
            Create One{" "}
          </Link>
        </Typography>
      </Container>
    </>
  );
};

export default React.memo(SignIn);
