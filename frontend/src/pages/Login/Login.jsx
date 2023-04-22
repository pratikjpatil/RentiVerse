import React,{Fragment, useState} from "react";
import Image from "../assets/logo.png";

import "./Login.css";
const Login = () => {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');


  const submissionHandler = (event) => {
    event.preventDefault();
  };
  const usernameInputHandler = (event) => {
    setInput(event.target.value);
  };

  const passwordInputHandler = (event) => {
    setPassword(event.target.value);
  };
  const btnSubmitHandler = (event) => {
    console.log(input);
    console.log(password);
  };


  return (
    <Fragment>
    <div className="container">
      <img src={Image} alt="Logo" className="logo" />
      <div className="card" onSubmit={submissionHandler}>
        <div className="card-content">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Username" onChange={usernameInputHandler}/>
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                onChange={passwordInputHandler}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={btnSubmitHandler}>
              Login
            </button>
          </form>
        </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
