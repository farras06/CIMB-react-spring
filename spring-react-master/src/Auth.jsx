import React from "react";
import Axios from "axios";

const API_URL = `http://localhost:8080`;

class Auth extends React.Component {
  state = {
    selectedFile: null,
    formUser: {
      username: "",
      password: ""
    },
    loginState: {
      username: "",
      password: "",
      profilePicture: ""
    }
  }

  inputHandler = (event, key) => {
    const { value } = event.target;

    this.setState({
      [key]: value,
    });
  };

  registerHandler = () => {
    console.log("Register!");
    Axios.post(`${API_URL}/users`, {
      username: this.state.username,
      password: this.state.password,
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  loginHandler = () => {
    alert("Login!");
    Axios.get(`${API_URL}/users/login`, {
      params: {
        username: this.state.username,
        password: this.state.password,
      },
    })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  fileChangeHandler = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  fileUploadHandler = () => {
    let formData = new FormData();

    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    Axios.post(`${API_URL}/documents`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("ERROR");
        console.log(err);
      });
  };

  download = () => {
    window.open(`${API_URL}/documents/download/tower.png`);
  };

  render() {
    return (
      <div>
        <h1>Auth Screen</h1>

        <h5>Username</h5>
        <input type="text" onChange={(e) => this.inputHandler(e, "username")} />
        <h5>Password</h5>
        <input type="text" onChange={(e) => this.inputHandler(e, "password")} />

        <br />

        <input type="button" value="Login" onClick={this.loginHandler} />
        <input type="button" value="Register" onClick={this.registerHandler} />
        <br />
        <input type="file" onChange={this.fileChangeHandler} />
        <input type="button" value="Upload" onClick={this.fileUploadHandler} />
        <br />
        <input type="button" value="Download" onClick={this.download} />
      </div>
    );
  }
}

export default Auth;
