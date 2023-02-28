import React, { Fragment } from "react";
import Image from "../assets/logo.jpeg";

import "./Login.css";
const Login = () => {
  return (
   <Fragment>
    <img src={Image} alt="Logo" class="logo" />
<div class="card">
  <div class="card-content">
    <h2>Login</h2>
    <form>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Username" />
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="Password" />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</div>

   </Fragment>

  );
};

export default Login;
