import React,{Fragment, useState} from "react";
import Image from "../../assets/logo.png";

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
    <div className="fragment">
    <div className="container-login">
      <img src={Image} alt="Logo" className="logo-login" />
      <div className="card-main-login" onSubmit={submissionHandler}>
        <div className="card-content-login">
          <h2>Login</h2>
          <form>
            <div className="form-group-login-page">
              <input type="text" className="form-control-login-page" placeholder="Username" onChange={usernameInputHandler}/>
            </div>
            <div className="form-group-login-page">
              <input
                type="password"
                className="form-control-login-page"
                placeholder="Password"
                onChange={passwordInputHandler}
              />
            </div>
            <button type="submit" className="btn btn-primary button-login" onClick={btnSubmitHandler}>
              Login
            </button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
