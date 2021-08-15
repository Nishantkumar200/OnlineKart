import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register_user } from "../Action/userAction";

const Userregister = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [newpassword, setPassword] = useState();

  const redirect = window.location.search
    ? window.location.search.split("=")[1]
    : "/";

  const { userInfo } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register_user(name, email, newpassword));
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
          Create New Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            type="text"
            label="Name"
            required
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
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
            value={newpassword}
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
            Create
          </Button>
        </form>

        <Typography>
          Already have an account ?{" "}
          <Link to={`/sigin?redirect=${redirect}`} style={{ textDecoration: "none" }}>
            Sign In{" "}
          </Link>
        </Typography>
      </Container>
    </>
  );
};

export default Userregister;
