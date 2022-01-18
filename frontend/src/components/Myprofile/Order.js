import React from "react";
import { Button, Container, Table, Form, Row, Col } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { getOrderdata } from "../../config/MyService";
import MyAccount from "./MyAccount";
import { useNavigate } from "react-router";
import Header from "../Header";

export default function Order() {
  let [temp, settemp] = useState([]);
  let [items, setitems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrderdata(localStorage.getItem("user")).then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
        let data1 = res.data.user;
        settemp(data1);
        console.log([data1]);
        console.log(temp);
      } else {
        console.log(res.data.err);
      }
    });
  }, []);
  const invoice = (orderno) => {
    navigate("/invoice", {
      state: { orderno: orderno },
    });
  };

  return (
    <div>
      <Header />
      <br />
      <br />
      <div className="container">
      <h1 className='text-left'>My Account</h1>

        <div className="row">
          <div className="col-md-6">
            <MyAccount />
          </div>
          <div className="col-md-6">
           
            <table className="table card1 ">
              <thead></thead>
              <tbody>
                {temp.map((value, index) => {
                  return (
                    <tr key={index}>
                      <h5>
                       <hr/> <span className="text-success">TRANSIT</span> Order no:
                        {value.Orderno}
                      </h5>
                      <p>
                        <span className="text-danger">Date</span>:{value.date}
                      </p>
                      <div className="row  card1">
                        {temp[index].items.map((val) => {
                          return (
                            <div className="row  col-md-4 ">
                              <div className=" ">
                                <img
                                  src={val.product_image}
                                  height="100px"
                                  width="100px"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <tr>
                        <button
                          className="btn btn-danger"
                          style={{marginLeft:"20px"}}
                          onClick={() => invoice(value.Orderno)}
                        >
                          View Invoice
                        </button>
                      </tr>
                      <br />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
