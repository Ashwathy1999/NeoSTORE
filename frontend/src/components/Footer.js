import React from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate=useNavigate();
  const subscribe=()=>{
    navigate("/thanku");
  }
  return (
    <div>
      <footer>
        <div class="container-fluid navbg">
          <div class="row">
            <div class="col-md-4 footer-column mt-5">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <h4 class="footer-title text-light">About Company</h4>
                </li>
                <li class="nav-item text-light">
                  <a class="nav-link text-white" href="#">
                    NeoSTORE Pvt Ltd.
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white " href="#">
                    <HiOutlineLocationMarker /> Ruby Tower,Dadar, Mumbai-412
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="#">
                    <AiOutlineMail /> admin@neostore.com
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="#">
                    <AiOutlinePhone /> Contact No: 9890438126
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-md-4 footer-column mt-5">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <h4 class="footer-title text-light">Information</h4>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="http://fitnik.tech/public/docs/terms.pdf">
                    Terms and Conditions 
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="#">
                    Gurantee and Return Policy
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="/map">
                    Locate Us
                  </a>
                </li>
              </ul>
            </div>
            <div class="col-md-4 footer-column mt-5">
              <ul class="nav flex-column">
                <li class="nav-item">
                  <h4 class="footer-title text-light">NewsLetter</h4>
                </li>
                <li class="nav-item">
                  <span class="nav-link text-white">
                    Sign Up to get exclusive offer from our favourite brand.
                  </span>
                </li>
                <li class="nav-item">
                  <input type="email" placeholder="Your Email"></input>
                </li>
                <br />
                <li class="nav-item">
                  <button className="btn btn-light" onClick={subscribe}>Subscribe</button>
                </li>
              </ul>
            </div>
          </div>
          <br />
          <br />

          <div className="mb-5">
            <h6 className="text-center text-light ">
              Copyright &copy; 2021 NeoSTORE All rights reserved | Design by Ashwathy
            </h6>
          </div>
        </div>
      </footer>
    </div>
  );
}
