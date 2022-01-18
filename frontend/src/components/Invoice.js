import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Card,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import jwt_decode from "jwt-decode";
import { getinvoice } from "../config/MyService";
import ReactToPdf from "react-to-pdf";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { sendMail } from "../config/MyService";
import { SiMinutemailer } from "react-icons/si";
import { MdSaveAlt } from "react-icons/md";
import { useLocation } from "react-router";
import { GiShoppingCart } from "react-icons/gi";

const ref = React.createRef();

export default function Invoice() {
  const [temp, settemp] = useState([]);
  const navigate = useNavigate();
  const { state } = useLocation();
  let invoiceno = Math.random().toFixed(6).split('.')[1];

  // console.log(state);
  // console.log(state.orderno);

  // useEffect(() => {
  //   getinvoice(state.orderno).then((res) => {
  //     if (res.data.orderdetail) {
  //       console.log(res.data.orderdetail);
  //       let data1 = res.data.orderdetail;
  //       settemp(data1);
  //       console.log([data1]);
  //       console.log(temp);
  //     } else {
  //       console.log(res.data.err);
  //     }
  //   });
  // }, []);

  useEffect(() => {

    if (localStorage.getItem('_token') != undefined) {
        let token = localStorage.getItem('_token');
        let decode = jwt_decode(token);
        console.log(decode)
        // setUid(decode.uid)
        getinvoice(state.orderno).then((res) => {
          if (res.data.orderdetail) {
            console.log(res.data.orderdetail);
            let data1 = res.data.orderdetail;
            settemp(data1);
            console.log([data1]);
            console.log(temp);
          } else {
            console.log(res.data.err);
          }
        });
    }
    else {
        navigate("/login")
    }
}, [])

  console.log(state);

  const generatePdf = () => {
    const input = document.getElementById("divToPrint");
    console.log(input);
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const pdf = new jsPDF();
      const img = canvas.toDataURL(
        "https://play-lh.googleusercontent.com/UsvigGKehARil6qKKLlqhBrFUnzJEQ2UNIGC2UVaExuMx1NKWefGUojGbo3GyORzv-k"
      );
      pdf.addImage(img, "JPEG", 0, 0);
      pdf.save("Invoice.pdf");
    });
  };

  const sendmail = () => {
    const input = document.getElementById("divToPrint");
    console.log(input);
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const pdf = new jsPDF();
      const img = canvas.toDataURL(
        "https://play-lh.googleusercontent.com/UsvigGKehARil6qKKLlqhBrFUnzJEQ2UNIGC2UVaExuMx1NKWefGUojGbo3GyORzv-k"
      );
      pdf.addImage(img, "JPEG", 0, 0);
      const filedata = pdf.output("blob");
      console.log(filedata);
      let formData = new FormData();
      formData.append("file", filedata, "samplefile");
      console.log("calling");
      sendMail(formData).then((res) => {
        console.log(res);
        console.log("in response");
      });
      console.log("call finished");
    });
  };

  return (
    <div>
      <Container
        fluid
        style={{
          height: "auto",
        }}
      >
        <br />
        <Card
          style={{
            padding: "30px",
            maxWidth: "800px",
            margin: "20px auto",
            height: "auto",
          }}
          ref={ref}
          id="divToPrint"
        >
          <div>
            <Row>
              <Col md={6}>
                <div>
                  <h1>
                    <GiShoppingCart size="60px" style={{ color: "red" }} />
                    Neo<span style={{ color: "red" }}>Store</span>
                  </h1>
                </div>
              </Col>
              <Col md={6}>
                <h4>Invoice Number:</h4>
                <h4 className="bg-dark text-white">{invoiceno}</h4>
              </Col>
            </Row>
            <hr />
          </div>
          <div>
            <Row>
              <Col md={6}>
                <p>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "gray",
                    }}
                  >
                    FROM
                  </span>
                  <br />
                  <span style={{ fontWeight: "bold" }}>Neostore</span>
                  <br />
                  neostore@gmail.com
                  <br />
                  020-2345676
                </p>
                <br />

                {/* <span
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  BILL TO
                </span> */}
                <br />
              </Col>
              <Col md={6}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  STATUS
                </span>
                <br />
                <span
                  style={{
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  Paid
                </span>
              </Col>
            </Row>

            {/* <Row> */}
              {/* <Col md={12}> */}
                {temp.map((value, index) => {
                  return (
                    <tr key={index}>
                      <span
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  BILL TO
                </span>
                      <p className="bg-light">{value.email}</p>
                      <Table bordered hover size="md">
                        <thead>
                          <tr className="bg-dark text-white">
                            <th>Sr.No</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {temp[index].items.map((val, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {/* <img
                                    src={val.product_image}
                                    style={{ width: "100px", height: "100px" }}
                                  />
                                  <br /> */}
                                  {val.product_name}
                                </td>
                                <td>{val.quantity}</td>
                                <td>Rs.{val.product_cost}</td>
                                <td>Rs. {val.quantity * val.product_cost}</td>
                              </tr>
                            );
                          })}
                          <br />
                          <br />

                          <h5>Shipping address:</h5>
                          <p>
                            {value.selectaddr.address},{value.selectaddr.city},
                            {value.selectaddr.pincode}
                          </p>
                        </tbody>
                      </Table>
                      <Table striped>
                        <tbody>
                          <tr>
                            <td>
                              <h5>Grand Total: Rs. {value.total}</h5>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </tr>
                  );
                })}
              {/* </Col> */}
            {/* </Row> */}
          </div>
          <br />
          <hr />
          <div>
            <p>
              Thanks for shopping with Neo
              <span style={{ color: "red" }}>Store</span>
            </p>
            <p>Visit Again ! &#128578;</p>
          </div>
        </Card>
        <br />
        <Container>
          <div className="text-center">
            <Button variant="primary" onClick={() => generatePdf()}>
              Save PDF <MdSaveAlt />
            </Button>
            &nbsp; &nbsp;&nbsp; &nbsp;
            {/* <Button variant="primary" onClick={() => sendmail()}>
              Send to Email <SiMinutemailer />
            </Button> */}
          </div><br/>
        </Container>
      </Container>
    </div>
  );
}
