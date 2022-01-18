import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  InputGroup,
  Modal,
  FloatingLabel,
  Card,
} from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FaUserAlt, FaRegAddressCard, FaList } from "react-icons/fa";
import { MdOutlineCompareArrows, MdModeEdit, MdDelete } from "react-icons/md";
import {BiSelectMultiple} from "react-icons/bi";
import { useLocation } from "react-router-dom";
import MyAccount from "./MyAccount";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";


import {
  getaddresses,
  // getProfile,
  addAddress,
  deleteAddr,
  editAddress,
  cardaddress,
} from "../../config/MyService";
import Header from "../Header";

export default function Address() {
  const [errors, setError] = useState({
    err_oldpass: "",
    err_npass: "",
    err_cpass: "",
    err_fname: "",
    err_lname: "",
    err_mobile: "",
    err_address: "",
    err_pincode: "",
    err_city: "",
    err_state: "",
    err_country: "",
  });
  const [user, setUser] = useState([]);
  const [showadd, setShowadd] = useState(false);
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state1, setState1] = useState("");
  const [country, setCountry] = useState("");
  const [show, setShow] = useState(false);
  const [Address_id, setAddress_id] = useState("");
  const [status, setStatus] = useState(false);
  const [getAddress, setGetAddress] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();


  useEffect(() => {

    if (localStorage.getItem('_token') != undefined) {
        let token = localStorage.getItem('_token');
        let decode = jwt_decode(token);
        console.log(decode)
        getaddresses(localStorage.getItem("user")).then((res) => {
            console.log(res.data.address);
            setGetAddress(res.data.address);
            console.log(getAddress);
            })
    }
    else {
        navigate("/login")
    }
}, [show, status])

  const Addnewaddress = (e) => {
    e.preventDefault();
    console.log("Add Address");
    let email = localStorage.getItem("user");
    let data = {
      email: email,
      address: address,
      pincode: pincode,
      city: city,
      state: state1,
      country: country,
    };
    console.log(data);
    addAddress(data).then((res) => {
      console.log(res.data);
    });
    setShow(false);
    // window.location.reload();
  };

  const editadd = (event, addr) => {
    event.preventDefault();
    console.log(addr);
    console.log("edit  address clicked");
    setAddress(addr.address);
    setPincode(addr.pincode);
    setCity(addr.city);
    setState1(addr.state1);
    setCountry(addr.country);
    setAddress_id(addr.Address_id);
    setShowadd(true);
    console.log(showadd);
  };

  const Addaddress = (e) => {
    e.preventDefault();
    let update = true;
    console.log("Add Address");
    let email = localStorage.getItem("user");
    let data = {
      Address_id: Address_id,
      email: email,
      address: address,
      pincode: pincode,
      city: city,
      state: state1,
      country: country,
      update: update,
    };
    console.log(data);
    editAddress(data).then((res) => {
      console.log(res.data);
    });

    setShowadd(false);
    window.location.reload();
  };

  const deleteAdd = (e, addr) => {
    e.preventDefault();
    console.log(addr);
    let email = localStorage.getItem("user");
    deleteAddr(email, addr).then((res) => {
      console.log(res.data);
      setStatus(true);
    });
    setStatus(false);
  };

  const selectadd = (e, addr) => {
    e.preventDefault();
    console.log(addr);
    let usersaddress={
        email : localStorage.getItem("user"),
        selectaddr : addr,
        orderno : state.orderno
        
    }
    // let email = localStorage.getItem("user");
    cardaddress(usersaddress)
      .then((res) => {
        console.log(res.data)
        alert("Order placed Successfully")
        localStorage.removeItem("mycart");
        navigate("/products")
        
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Header/><br />
      <br />
      <Container fluid className="card4">
        <Container>
        <h1 className='text-left'>My Account</h1>
          <hr />
          <Row>
            <Col lg={6}>
              <MyAccount />
            </Col>
            <Col lg={6}>
              <div className="card1">
                <section>
                  <Row className="pt-2">
                    <h2>Addresses</h2>
                    <div style={{ textAlign: "right" }}>
                      
                    </div>
                  </Row>
                  <hr className="mr-3" />
                </section>

                <section>
                  {getAddress.map((addr) => (
                    <Row>
                      <div className="card2">
                        <h6>
                        {/* <BiSelectMultiple size="20px" onClick={(e) => {
                               selectadd(e, addr);  
                            }}/>&nbsp; */}

                          {addr.address}, {addr.state}
                        </h6>
                        <h6>
                          {addr.city} ,{addr.pincode}
                        </h6>
                        <h6>{addr.country}</h6>
                        <div>
                          <Button
                            onClick={(e) => {
                              editadd(e, addr);
                            }}
                            variant="secondary"
                          >
                            Edit <MdModeEdit size="20px" />
                            
                          </Button>
                          {/* <Button
                            onClick={(e) => {
                              deleteAdd(e, addr);
                            }}
                            variant="danger"
                            style={{ marginLeft: "10px" }}
                          >
                            <MdDelete size="20px"/>
                            
                          </Button> */}
                          <br/><br/><hr/>
                          {/* <button className="btn btn-outline-dark"
                            onClick={(e) => {
                              selectadd(e, addr);
                            }}
                            variant="danger"
                            style={{ marginLeft: "10px" }}
                          >
                            <MdDelete className="text-danger"/>&nbsp;
                            Select address
                          </button> */}
                        </div>
                        

                      </div>
                      
                     
                      {showadd ? (
                        <Modal show={showadd} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Edit Your Account Details</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <h6>Edit Your Account</h6>
                              <FloatingLabel label="Address" className="mb-3">
                                <Form.Control
                                  as="textarea"
                                  placeholder="Address"
                                  name="address"
                                  id="address"
                                  value={address}
                                  onChange={(e) => {
                                    setAddress(e.target.value);
                                  }}
                                />
                                <Form.Text id="passwordHelpBlock" muted>
                                  Max 100 char
                                </Form.Text>
                                <span style={{ color: "red" }}>
                                  {errors.err_address}
                                </span>
                              </FloatingLabel>

                              <Row>
                                <Col sm={6} md={6} lg={6}>
                                  <Form.Group className="mb-3">
                                    <Form.Control
                                      type="number"
                                      name="pincode"
                                      placeholder="Pincode"
                                      value={pincode}
                                      onChange={(e) => {
                                        setPincode(e.target.value);
                                      }}
                                      className="form-control"
                                      size="20"
                                    />
                                    <span style={{ color: "red" }}>
                                      {errors.err_pincode}
                                    </span>
                                  </Form.Group>
                                </Col>
                                <Col sm={6} md={6} lg={6}>
                                  {" "}
                                  <Form.Group className="mb-3">
                                    <Form.Control
                                      type="text"
                                      name="city"
                                      placeholder="City"
                                      value={city}
                                      onChange={(e) => {
                                        setCity(e.target.value);
                                      }}
                                      className="form-control"
                                      size="20"
                                    />
                                    <span style={{ color: "red" }}>
                                      {errors.err_city}
                                    </span>
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Form.Group className="mb-3">
                                <Form.Control
                                  type="text"
                                  name="state"
                                  placeholder="State"
                                  value={state1}
                                  onChange={(e) => {
                                    setState1(e.target.value);
                                  }}
                                  className="form-control"
                                  size="20"
                                />
                                <span style={{ color: "red" }}>
                                  {errors.err_state}
                                </span>
                              </Form.Group>
                              <Form.Group className="mb-3">
                                <Form.Control
                                  type="text"
                                  name="country"
                                  placeholder="Country"
                                  value={country}
                                  onChange={(e) => {
                                    setCountry(e.target.value);
                                  }}
                                  className="form-control"
                                  size="20"
                                />
                                <span style={{ color: "red" }}>
                                  {errors.err_country}
                                </span>
                              </Form.Group>

                              <div style={{ textAlign: "center" }}>
                                <Button
                                  variant="primary"
                                  type="submit"
                                  onClick={Addaddress}
                                >
                                  Submit
                                </Button>
                              </div>
                            </Form>
                          </Modal.Body>
                        </Modal>
                      ) : (
                        ""
                      )}
                    </Row>
                  ))}
                </section>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Address Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <FloatingLabel label="Address" className="mb-3">
                        <Form.Control
                          as="textarea"
                          placeholder="Address"
                          name="address"
                          id="address"
                          onChange={(e) => {
                            setAddress(e.target.value);
                          }}
                        />
                        <Form.Text id="passwordHelpBlock" muted>
                          Max 100 char
                        </Form.Text>
                        {
                          <span style={{ color: "red" }}>
                            {errors.err_address}
                          </span>
                        }
                      </FloatingLabel>

                      <Row>
                        <Col sm={6} md={6} lg={6}>
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="number"
                              name="pincode"
                              placeholder="Pincode"
                              onChange={(e) => {
                                setPincode(e.target.value);
                              }}
                              className="form-control"
                              size="20"
                            />
                            {
                              <span style={{ color: "red" }}>
                                {errors.err_pincode}
                              </span>
                            }
                          </Form.Group>
                        </Col>
                        <Col sm={6} md={6} lg={6}>
                          {" "}
                          <Form.Group className="mb-3">
                            <Form.Control
                              type="text"
                              name="city"
                              placeholder="City"
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                              className="form-control"
                              size="20"
                            />
                            {
                              <span style={{ color: "red" }}>
                                {errors.err_city}
                              </span>
                            }
                          </Form.Group>
                        </Col>
                      </Row>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          name="state1"
                          placeholder="State"
                          onChange={(e) => {
                            setState1(e.target.value);
                          }}
                          className="form-control"
                          size="20"
                        />
                        {
                          <span style={{ color: "red" }}>
                            {errors.err_state}
                          </span>
                        }
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="text"
                          name="country"
                          placeholder="Country"
                          onChange={(e) => {
                            setCountry(e.target.value);
                          }}
                          className="form-control"
                          size="20"
                        />
                        {
                          <span style={{ color: "red" }}>
                            {errors.err_country}
                          </span>
                        }
                      </Form.Group>

                      <div style={{ textAlign: "center" }}>
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={Addnewaddress}
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                  </Modal.Body>
                </Modal>
                <Button
                        variant="danger"
                        size="sm"
                        onClick={handleShow}
                        className="ml-5"
                      >
                        Add Address
                      </Button>
              </div>
              
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

