import React, { useState } from "react";
import { BsTwitter, BsFacebook } from "react-icons/bs";
import { AiOutlineGoogle } from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import Header from "./Header";
import Footer from "./Footer";
import { fetchData, login } from "../config/MyService";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import SocialButton from "./SocialButton";
import { addUser } from "../config/MyService";
// const jwt = require("jsonwebtoken");
// const jwtSecret = "wewr32vsdfgswfwr2343ert";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
  });
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const navigate = useNavigate();
  const postRegis = (event) => {
    event.preventDefault();
    login(state).then((res) => {
      console.log(res.data.msg);
      if (res.data.err == 0) {
        localStorage.setItem("_token", res.data.token);
        // localStorage.setItem("userdetails", state.email);
        localStorage.setItem("user", state.email);
        navigate("/");
      }
      if (res.data.err == 1) {
        console.log(res.data);
      }
    });
  };

  const handleSocialLogin = (user) => {
    console.log(user);
    const token = "socialLLoginToken"
    let data = {
      fname: user._profile.firstName,
      lname: user._profile.lastName,
      mobile: user._profile.id,
      email: user._profile.email,
      password: "socialLogin",
      gender:"Female"
    };
    addUser(data).then((res) => {
      if (res.data.err) {
        alert(res.data.msg);
      } else {
        alert(res.data.msg);
        localStorage.setItem("_Socialtoken", token);
        localStorage.setItem("userdetails", JSON.stringify(data));
        localStorage.setItem("user", JSON.stringify(data.email));
        navigate("/");
        // navigate("/login");
      }
    });
    
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  return (
    <div>
      <Header />
      <div >
        <div className="row">
          <div className="col-md-6 ">
              <img src="https://www.ideagen.com/media/10785/id_web_solutions_incidentmanagementsoftware_features_fully-mobile-solution.svg
" 
              style={{width:"100",height:"600px"}} />
          </div>
          <div className="container col-md-6 cardLogin border">
            <h1 className="text-center">
              Login to Neo<span className="text-danger">STORE</span>
            </h1>
            <br />
            <br />
            <form method="post" onSubmit={postRegis}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email ID"
                  className="form-control"
                  onChange={handler}
                />
              </div>
              <br />
              <br />
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="form-control"
                  onChange={handler}
                />
              </div>
              <br />
              <div className="text-center">
                <input
                  type="submit"
                  value="Login"
                  className="btn btn-dark text-center"
                />
              </div>
            </form>
            --or--
            <br />
            <br />
            <SocialButton
              provider="facebook"
              appId="1526833221022363"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
              className="btnf btn-primary btn-md"
            >
              <ImFacebook size="30px" />
              Login With Facebook
            </SocialButton>
            &nbsp;
            <SocialButton
              provider="google"
              appId="125806190119-4kcen24avngi7namc7o6nuvat6l3lp4c.apps.googleusercontent.com"
              onLoginSuccess={handleSocialLogin}
              onLoginFailure={handleSocialLoginFailure}
              className="btng btn-danger btn-md"
            >
              <AiOutlineGoogle size="30px" />
              Login With Google
            </SocialButton>
            <br />
            <br />
            <div className="container text-center">
              <Link to="/Register">
                <span>Register </span>
              </Link>
              &nbsp;&nbsp;| &nbsp;&nbsp;
              <Link to="/forgot">
                <span> Forgot Password?</span>
              </Link>
            </div>
            {/* <p className="text-center">Click here to <Link to="/Register">Register</Link></p> */}
          </div>
          </div>
        </div>
        {/* <br /> */}
        <Footer />
      </div>
    
  );
}

// https://www.ideagen.com/media/10785/id_web_solutions_incidentmanagementsoftware_features_fully-mobile-solution.svg
// https://i.pinimg.com/736x/13/87/97/1387973b364c4b2f12cec05047bc699a.jpg
