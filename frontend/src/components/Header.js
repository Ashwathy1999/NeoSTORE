import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Form,
  FormControl,
  NavDropdown,
  Button,
  Nav,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { BiLogIn } from "react-icons/bi";
import { FaUserAlt, FaUserCircle, FaUser } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Navigate, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  const [len, setLen] = useState(0);
  const [flag, setflag] = useState(1);
  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("mycart"));
    if (cartItems) {
      setLen(cartItems.length);
    }
    // if(JSON.parse(localStorage.getItem("user"))== undefined){
    //   setflag(0)
    // }
    // else{
    //   setflag(1)
    // }
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setflag(0);
    // localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div>
      <Navbar className="navbg text-white" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <h1 className="text-white">
              <GiShoppingCart size="60px" style={{ color: "red" }} /> Neo
              <span style={{ color: "red" }}>STORE</span>
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "70px" }}
              navbarScroll
            >
              <Nav.Link href="#action1" className="text-white">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <h5 className="text-white">&nbsp;&nbsp;Home</h5>
                </Link>
              </Nav.Link>
              <Nav.Link href="#action2" className="text-white">
                <Link to="/products" style={{ textDecoration: "none" }}>
                  <h5 className="text-white">Products</h5>
                </Link>
              </Nav.Link>
              <Nav.Link href="#" className="text-white">
                {localStorage.getItem("user") ? (
                  <Link to="/order" style={{ textDecoration: "none" }}>
                    <h5 className="text-white">Orders</h5>
                  </Link>
                ) : (
                  " "
                )}
              </Nav.Link>
            </Nav>
            <Form className="d-flex" style={{ marginRight: "50px" }}>
              {/* <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-light me-3">Search</Button> */}
              <Button variant="">
                <Link to="/cart">
                  <h3
                    className="text-white text-center"
                    style={{
                      fontSize: "20px",
                      // padding: " 0 5px",
                      backgroundColor: "red",
                      verticalAlign: "top",
                      borderRadius: "50px",
                      textDecoration: "none",
                    }}
                  >
                    {len}
                  </h3>
                  <AiOutlineShoppingCart size="30px" className="text-white" />{" "}
                </Link>
              </Button>
              <button className="btn ">
                <FaUser className=" text-light" size="30px" />
              
              {/* <FaUser className=" text-light" size="30px" /> */}
              <NavDropdown  className="text-white">
                <NavDropdown.Item href="#action3">
                  <Link to="/login">
                    {localStorage.getItem("user") ? (
                      " "
                    ) : (
                      <h6 className="text-dark">
                        <BiLogIn size="25px" />&nbsp;&nbsp;Login
                      </h6>
                    )}
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  <Link to="/register">
                    {localStorage.getItem("user") ? (
                      " "
                    ) : (
                      <h6 className="text-dark">
                        <BsPencilSquare size="20px" /> Register
                      </h6>
                    )}
                  </Link>
                </NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  {localStorage.getItem("user") ? (
                    <h6 className="text-dark">
                      <RiLogoutCircleRLine
                        className="text-danger"
                        size="20px"
                        onClick={logout}
                      />{" "}
                      Logout
                    </h6>
                  ) : (
                    " "
                  )}
                </NavDropdown.Item>

                <NavDropdown.Item href="#action4">
                  {localStorage.getItem("user") ? (
                    <h6 className="text-dark">
                      <FaUserCircle
                        className="text-primary"
                        size="20px"
                        onClick={() => {
                          navigate("/account");
                        }}
                      />{" "}
                      Profile
                    </h6>
                  ) : (
                    " "
                  )}
                </NavDropdown.Item>
              </NavDropdown>
              </button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
