import React, { Component } from "react";
import axios from "axios";

export class index extends Component {
  state = {
    first_name: "",
    last_name: "",
  };

  componentDidMount() {
    axios
      .get("/user/getDetails")
      .then(({ data: { first_name, last_name } }) => {
        this.setState({ first_name, last_name });
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { first_name, last_name } = this.state;
    return (
      <div>
        <div>first_name {first_name}</div>
        <div>last_name {last_name}</div>
      </div>
    );
  }
}

export default index;
