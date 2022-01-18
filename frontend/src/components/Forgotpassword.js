import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { Email } from "../config/MyService";
import Otp from "./Otp";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Forgotpassword() {
  const [flag, setFlag] = useState(0);
  let [email, setEmail] = useState("");
  const navigate = useNavigate();
  // const handler = (event) => {
  //   const { name, value } = event.target;
  //   setEmail({ ...state, [name]: value });
  // };
  const back = () => {
    navigate("/login");
  };
  const sendotp = () => {
    let data = {
      email: email,
    };
    Email(data).then((res) => {
      if (res.data.err) {
        alert(res.data.msg);
      } else {
        alert(res.data.msg);
        navigate("/otp");
      }
    });
  };

  return (
    <div>
      {/* <h6 className="text-danger">
          <AiOutlineInfoCircle size="20px" /> &nbsp;Verification Code has sent
          to your registered mail ID
        </h6> */}
      <br />
      {flag == 0 ? (
        <div className="container col-md-6  cardLogin border">
          <h2>Reset Password</h2>
          <hr />
          <br />
          <form method="post">
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
            <br />
            <br />

            <div className="text-center">
              <input
                value="Send OTP"
                onClick={sendotp}
                className="btn btn-primary text-center"
              />
              &nbsp;&nbsp;&nbsp;
              <input
                value="Back "
                onClick={back}
                className="btn btn-dark text-center"
              />
            </div>
          </form>
        </div>
      ) : (
        <Otp />
      )}
    </div>
  );
}
