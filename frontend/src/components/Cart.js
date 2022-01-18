import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Table,
  Form,
  Row,
  Col,
  FormControl,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { AiOutlineDelete } from "react-icons/ai";
import { GrAddCircle, GrSubtractCircle } from "react-icons/gr";
import {FaLongArrowAltRight} from "react-icons/fa"
// import HomeNavbar from "./HomeNavbar";
import axios from "axios";
import Header from "./Header";
import { createOrders } from "../config/MyService";

export default function Cart() {
  let items = [];
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [flag, setflag] = useState(1);
  let total = [0];
  useEffect(() => {
    let cartItems = JSON.parse(localStorage.getItem("mycart"));
    setCart(cartItems);
     
  }, []);
  console.log(cart);

  const onAdd = (product) => {
    const exist = cart.find((item) => item._id === product._id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...exist, quantity: exist.quantity + 1 }
            : item
        )
      );
      localStorage.setItem("mycart", JSON.stringify(cart));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cart.find((item) => item._id === product._id);
    if (exist.quantity === 1) {
      // setCart(cart.filter((item) => item._id !== product._id));
    } else {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
      localStorage.setItem("mycart", JSON.stringify(cart));
    }
  };
  const onDelete = (index) => {
    let lstore = JSON.parse(localStorage.getItem("mycart"));
    lstore.splice(index, 1);
    console.log(lstore);
    let setStore = JSON.stringify(lstore);
    localStorage.setItem("mycart", setStore);
    setCart(lstore);
    window.location.reload(false);
    setflag(0)
  };

  const checkout = () => {
    console.log(cart);

    cart.map((value) => {
      let allorders = {
        product_name: `${value.name}`,
        product_cost: `${value.price}`,
        product_image: `${value.image}`,
        quantity: `${value.quantity} `,
      };
      items.push(allorders);
    });
    let email = localStorage.getItem("user");
    let orderno = Math.random().toFixed(6).split(".")[1];
    let tot = total.reduce((result, number) => result + number);
    localStorage.setItem("total", tot);
    let checkout = {
      email: email,
      items: items,
      orderno: orderno,
      total: total.reduce((result, number) => result + number),
    };
    console.log(checkout);

    createOrders(checkout).then((res) => {
      console.log(res.data);

      navigate("/checkout", {
        state: { orderno: orderno },
      });
    });
  };

  const addtoCart = (obj) => {
    console.log(obj.name);
    let item = {
      name: obj.product_name,
      price: obj.product_cost,
      _id: obj._id,
      quantity: 1,
      image: obj.product_image,
      des: obj.product_desc,
    };
    if (localStorage.getItem("mycart") !== null) {
      let arr = JSON.parse(localStorage.getItem("mycart"));
      let idArrays = [];
      arr.forEach((data) => {
        idArrays.push(data._id);
      });

      if (idArrays.includes(obj._id)) {
        alert("Product Already Added");
      } else {
        arr.push(item);
        localStorage.setItem("mycart", JSON.stringify(arr));
        alert("Product Added to Cart");
        window.location.reload();
      }
    } else {
      let arr = [];
      arr.push(item);
      localStorage.setItem("mycart", JSON.stringify(arr));
      alert("Product Added to Cart");
    }
  };
  return (
    <div>
      <Header />
      <br />
      <br />
      {cart !== null ? 
        <div className="container-fluid col-md-12 col-sm-12 col-lg-12">
          <br />
          <div className="row">
            <div className="col-md-9 col-sm-12">
              <div className="cart">
                <table className="table col-md-12 col-sm-12 col-lg-12">
                  <thead className="bg-dark text-white">
                    <tr>
                      <th>Sr.No</th>
                      <th>Products</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                   
                      { cart.map((value, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                <img
                                  src={value.image}
                                  height="120px"
                                  width="120px"
                                />{" "}
                                <br />
                                <br />
                                {value.name}
                              </td>

                              <td>{value.price}</td>
                              <td>
                                <Row>
                                  <Col>
                                    <GrSubtractCircle
                                      size="20px"
                                      onClick={() => onRemove(value)}
                                    />
                                  </Col>
                                  <Col>
                                    <FormControl
                                      type="text"
                                      disabled
                                      min="1"
                                      max="20"
                                      value={value.quantity}
                                    />
                                  </Col>
                                  <Col>
                                    <GrAddCircle
                                      size="20px"
                                      onClick={() => onAdd(value)}
                                    />
                                  </Col>
                                </Row>
                                {/* </div> */}
                              </td>
                              <td>₹ {value.quantity * value.price}</td>
                              <td>
                                <AiOutlineDelete
                                  color="red"
                                  size="25px"
                                  onClick={() => onDelete(index)}
                                />
                              </td>
                              {console.log(
                                total.push(value.price * value.quantity)
                              )}
                            </tr>
                          );
                        })
                      }
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3">
              <div className="cart">
                <h2 className="bg-dark text-white">Review Order</h2>
                <hr />
                <table bordered width="250px">
                  <tr>
                    <td>Subtotal:</td>
                    <td>
                      ₹ {total.reduce((result, number) => result + number)}
                    </td>
                  </tr>
                  <tr>
                    <td>GST(5%):</td>
                    <td>
                      ₹{" "}
                      {0.05 * total.reduce((result, number) => result + number)}
                    </td>
                  </tr>
                </table>
                <table className="card1" width="200px">
                  <tr>
                    <th>Grand Total:</th>
                    <th>
                      ₹
                      {total.reduce((result, number) => result + number) +
                        0.05 *
                          total.reduce((result, number) => result + number)}
                    </th>
                  </tr>
                </table>
                <br />
                <button className="btn btn-danger" onClick={() => checkout()}>
                  Proceed to Buy
                </button>
              </div>
            </div>
          </div>
          <br />
        </div> :
        <div className="col-md-12 col-sm-12">
        <button
          className="btn btn-danger"
          onClick={() => {
            navigate("/products");
          }}
        >
          Lets go for a shopping <FaLongArrowAltRight size="20px"/>
        </button>
        <br />
        <img src="https://shop.millenniumbooksource.com/static/images/cart1.png" />
      </div>
      }
    </div>
  );
}
