import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

//UI
import { Box, Button, TextField, Typography } from "@material-ui/core";

export class RegisterScreen extends Component {
  state = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    success: false,
    error: false,
  };

  onSignup = (e) => {
    e.preventDefault();

    const { email, password, first_name, last_name } = this.state;

    axios({
      url: "/auth/register",
      method: "POST",
      data: { email, password, first_name, last_name },
    })
      .then((res) => {
        window.localStorage.setItem("isAuthenticated", true);
        if (res.status === 200) {
          this.setState({ success: true, error: false });
          this.props.history.push("/");
        }
      })
      .catch(({ response }) => {
        this.setState({ error: response.data.message, success: false });
      });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
      error: false,
      success: false,
    });
  };

  render() {
    const { error, success } = this.state;
    return (
      <div className="auth-background d-flex justify-content-center">
        <Box boxShadow={3} className="auth-box">
          <form onSubmit={this.onSignup}>
            {success && "You've registered in successfully"}
            {error}
            <Typography variant="h5" className="font-weight-bold row">
              Create an account
            </Typography>
            <div className="auth-inputs">
              <div className="auth-field auth-flex">
                <div className="w-50">
                  <span className="auth-subtitle">First Name</span>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="first_name"
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className="w-50 ml-4">
                  <span className="auth-subtitle">Last Name</span>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="last_name"
                    onChange={this.onChange}
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <span className="auth-subtitle">E-mail Address</span>
                <TextField
                  type="email"
                  fullWidth
                  variant="outlined"
                  name="email"
                  onChange={this.onChange}
                  required
                />
              </div>
              <div className="auth-field">
                <span className="auth-subtitle">Password</span>
                <TextField
                  type="password"
                  fullWidth
                  variant="outlined"
                  name="password"
                  onChange={this.onChange}
                  required
                />
              </div>
            </div>

            <Button
              fullWidth
              className="mt-4 p-3 submit-button"
              variant="contained"
              type="submit"
            >
              <Typography variant="h6" className="font-weight-bold">
                Create account
              </Typography>
            </Button>
            <p className="mt-2">
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </form>
        </Box>
      </div>
    );
  }
}

export default RegisterScreen;
