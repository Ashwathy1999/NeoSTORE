import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { addUser } from "../config/MyService";
import { BsTwitter, BsFacebook } from "react-icons/bs";
import { AiOutlineGoogle } from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Header from "./Header";
import SocialButton from "./SocialButton";
import Footer from "./Footer";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Register() {
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [mobile, setMobile] = useState("");
  let [email, setEmail] = useState("");
  let [gender, setGender] = useState("");

  let [password, setPassword] = useState("");
  let [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    let data = {
      fname: fname,
      lname: lname,
      mobile: mobile,
      email: email,
      password: password,
      gender : gender,
      // confirmpassword: confirmpassword,
    };
    addUser(data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        navigate("/login");
      }
    });
  };

  const handleSocialLogin = (user) => {
    console.log(user);
    let data = {
      fname: user._profile.firstName,
      lname: user._profile.lastName,
      mobile: user._profile.id,
      email: user._profile.email,
      password: "socialLogin",
    };
    addUser(data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        navigate("/");
      }
    });
    localStorage.setItem("user", JSON.stringify(data));
    // navigate("/");
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  return (
    <div>
      <Header />
      <br />
      <div className="container">
        <SocialButton
          provider="facebook"
          appId="1526833221022363"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          className="btnf btn-primary btn-lg btn-block"
        >
          <ImFacebook size="30px" />
          Login With Facebook
        </SocialButton>
        &nbsp;&nbsp;
        <SocialButton
          provider="google"
          appId="125806190119-4kcen24avngi7namc7o6nuvat6l3lp4c.apps.googleusercontent.com"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
          className="btng btn-danger btn-lg btn-block"
        >
          <AiOutlineGoogle size="30px" />
          Login With Google
        </SocialButton>
        <br />
        <hr />
      </div>

      <Container className="container cardLogin border">
        <h2 className="text-center">
          Register to Neo<span className="text-danger">STORE</span>
        </h2>
        <br />

        <Form className="container">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              name="fname"
              id="fname"
              onChange={(event) => {
                setFname(event.target.value);
              }}
              required
            />
            {fname != "" && fname.length < 4 && (
              <span className="text-danger">Enter firstName correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              name="lname"
              id="lname"
              onChange={(event) => {
                setLname(event.target.value);
              }}
              required
            />
            {lname != "" && lname.length < 4 && (
              <span className="text-danger">Enter lastName correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Enter Mobile Number"
              name="mobile"
              id="mobile"
              onChange={(event) => {
                setMobile(event.target.value);
              }}
              required
            />
            {mobile != "" && mobile.length < 10 && (
              <span className="text-danger">Enter mobile correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            {email != "" && !regForEmail.test(email) && (
              <span className="text-danger">Enter email correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              id="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            {password != "" && password.length < 8 && (
              <span className="text-danger">Enter password correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter ConfirmPassword"
              name="confirmpassword"
              id="confirmpassword"
              onChange={(event) => {
                setConfirmpassword(event.target.value);
              }}
              required
            />
            {confirmpassword != "" && confirmpassword != password && (
              <span className="text-danger">Passwords doesn't match</span>
            )}
          </Form.Group>
          <br />
          <div className="mb-3">
            <label className="pr-2">Gender:</label>
            <input
              type="radio"
              value="Male"
              name="gender"
              className="mt-1 pl-2"
              onChange={(event) => {
                setGender(event.target.value);
              }}            />{" "}
            Male &nbsp;
            <input
              type="radio"
              value="Female"
              name="gender"
              className="mt-1 pl-2"
              onChange={(event) => {
                setGender(event.target.value);
              }}            />{" "}
            Female
            <br />
            <br />
          </div>
          <br />

          <Col className="text-center">
            <Button variant="dark" onClick={register}>
              Register
            </Button>
          </Col>
          <br />
          <br />
          <Col className="text-center">
            <p className=" text-center">
              {" "}
              <Link to="/login">Click here to Login </Link>
            </p>
          </Col>
        </Form>
      </Container>
      <Footer />
    </div>
  );
}
