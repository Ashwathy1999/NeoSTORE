import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { authentication,  getaddresses,cardaddress} from "../config/MyService";
import Header from "./Header";
import jwt_decode from "jwt-decode";
import { useLocation } from "react-router";
import {GrRadialSelected} from "react-icons/gr";


export default function Checkout() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [cnumber, setCnumber] = useState(0);
  const [cvv, setCVV] = useState(0);
  const [name, setName] = useState();
  const [getAddress, setGetAddress] = useState([]);


  const [cart, setCart] = useState([]);
  const { state } = useLocation();
  console.log(state);

  console.log(state.orderno);

  let items = [];
  let total = [0];
  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      authentication(localStorage.getItem("_token")).then((res) => {
        if (res.data.err) {
          alert(res.data.msg);
          // console.log(res.data.msg)
        }
      });
    } else {
      alert("Please Login to proceed");
      navigate("/login");
    }
    let cartItems = JSON.parse(localStorage.getItem("mycart"));
    setCart(cartItems);
    console.log(cartItems);
    //
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
    //
    
  }, []);

  const checkout = () => {
    alert("Order placed Successfully")
    localStorage.removeItem("mycart");
    navigate('/order')
    // navigate("/address", {
    //   state: { orderno: state.orderno },
    // });
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
        alert("Address Selected !")
        // localStorage.removeItem("mycart");
        // navigate("/products")
        
    });
  };

  return (
    <>
      <Header />
      <div className="container">
        <br />
        <h2 className="text-center">Check out</h2>
        <br />
        <div className="row">
          <div className="col-md-6 card1">
              <h3 className="bg-dark text-white">Select your delivery address:</h3><br/>
              {getAddress !== [] ?
                  <div>
                  {getAddress.map((addr)=>(
                    <div className="row"> 
                     
                     <input type="checkbox" id="myCheck" size="20px" onChange={(e) => {
                               selectadd(e, addr);  
                            }}/>&nbsp;<h5 for="myCheck">{addr.address},{addr.city} </h5>
                     <h5>{addr.state} ,{addr.pincode}</h5>
                     <h5>{addr.country}</h5><hr/>
                    </div>
                  ))}   </div>
                  :
                  <div>
                   <h1>Please add address</h1>
                  </div>
                  }
          </div>
          <div className="col-md-6">
            <div className="card1">
            <h3 className="bg-dark text-white">Review Bill</h3><br/>
              {/* <hr /> */}
              <table className="text-center">
                <tr className="text-success">
                  <th className="text-center">
                    <h3>Grand Total : </h3>
                  </th>
                  <th>
                    <h1> ₹ {localStorage.getItem("total")}</h1>
                  </th>
                </tr>
                <br />
              </table>
              <br />
              <div className="cardD">
                <h5>Dedit Card Details</h5>
                <br />
                {/* <input type="text" placeholder="Enter Name on Card " className='form-control' name="name" onChange={(e) => { setName(e.target.value) }} />
                        {name != '' && name.length < 5 && <span className="text-danger">Enter Name correctly</span>}<br /> */}
                <input
                  type="number"
                  placeholder="Enter Credit Card "
                  className="form-control"
                  name="cnumber"
                  onChange={(e) => {
                    setCnumber(e.target.value);
                  }}
                />
                {cnumber != "" && cnumber.length < 16 && (
                  <span className="text-danger">
                    Enter Credit Card number correctly
                  </span>
                )}
                <br />
                <input
                  type="number"
                  placeholder="Enter CVV "
                  className="form-control"
                  name="cvv"
                  onChange={(e) => {
                    setCVV(e.target.value);
                  }}
                />
                {cvv != "" && cvv.length < 3 && (
                  <span className="text-danger">
                    Enter CVV number correctly
                  </span>
                )}
                <br />
                <button className="btn btn-dark" onClick={() => checkout()}>
                  Check out
                </button>
              </div>
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
