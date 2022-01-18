import React, { useEffect, useState } from "react";
import { getsingleproduct,RatingStar } from "../config/MyService";
import { useLocation } from "react-router";
import ReactImageMagnify from "react-image-magnify";
import { Rating } from 'react-simple-star-rating'
import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";
import "react-multiple-select-dropdown-lite/dist/index.css";
import ReactStars from "react-rating-stars-component";

import { connect } from "react-redux";
import axios from "axios";
// import jwt_decode from 'jwt-decode';
import Footer from "./Footer";
import Header from "./Header";

function ProductDetails(props) {
  const [postdata, setPostdata] = useState([]);
  const [images, setimages] = useState([]);
  const [mainimage, setmainimage] = useState();
  const [uid, setUid] = useState("");
  const [rating, setrating] = useState(0);
  // let location = useLocation();
  const { state } = useLocation();
  const ratingChanged = (rating) => {
    console.log(rating);
  };

  useEffect(() => {
    console.log(state.id);
    getsingleproduct(state.id).then((res) => {
      console.log(res.data);
      setrating(res.data.product.product_rating);
      setPostdata(res.data.product);
      setmainimage(res.data.product.product_image);
      setimages(res.data.image);
    });
  }, []);
  console.log(postdata);

  const addtoCart = (obj) => {
    console.log(obj.name);
    let item = {
      name: obj.product_name,
      price: obj.product_cost,
      _id: obj._id,
      quantity: 1,
      image: obj.product_image,
    };
    if (localStorage.getItem("mycart") !== null) {
      let arr = JSON.parse(localStorage.getItem("mycart"));
      let idArrays = [];
      arr.forEach((data) => {
        idArrays.push(data._id);
      });

      if (idArrays.includes(obj._id)) {
        // arr.forEach;
        alert("Product Already Added");
        // setItemadded(true);
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
      window.location.reload();
    }
  };
  const handleRating = (rate) => {
    let newrating = ((rate / 20 + rating / 20) / 2).toFixed(1);
    let data = { newrating: newrating };

    //setRatings(rate)
    setrating(rate);
    console.log(rate / 20);
    console.log(data);
    RatingStar(state.id, data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        //alert(res.data.msg);
      }
    });
  };

  return (
    <div>
      <Header />

      <div>
        <br />
        <div className="container-fluid">
          <br />
          <br />
          <div className="row">
            <div className="container col-10">
              <div className=" row">
                <div className=" col-md-6">
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Wristwatch by Ted Baker London",
                        isFluidWidth: true,
                        src: mainimage,
                      },
                      largeImage: {
                        src: mainimage,
                        width: 1200,
                        height: 1200,
                      },
                    }}
                  />
                  {/* <img src={mainimage} className="img-fluid" alt="..." height="500px" width="500px" /> */}
                </div>
                <div className="col-md-6">
                  <div className="card1">
                    <h1 className="">{postdata.product_name}</h1>
                    <div className="text-center">
                      {/* <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                        className="card1"
                      /> */}
                      <Rating onClick={handleRating} ratingValue={rating} />
                     
                    </div>
                    {/* <p>{postdata.product_rating}</p><hr /> */}
                    <hr />
                    <br />
                    <h5>
                      Price
                      <h2>
                        <span className="text-danger">
                          {" "}
                          ₹ {postdata.product_cost}
                        </span>
                      </h2>
                      <p>(Inclusive of all taxes)</p>
                    </h5>
                    <h5>About this item:</h5>
                    <p>{postdata.product_desc}</p>
                    <br />
                    <div className="row">
                      <div className="col-md-12">
                        {" "}
                        <a
                          className="btn btn-danger"
                          onClick={() => addtoCart(postdata)}
                        >
                          Add to cart
                        </a>
                      </div>
                      <br />
                      <br />
                      {/* <div className="col-md-12">
                        {" "}
                        <a className="btn btn-secondary ">Rate product</a>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                      {images.map((item) => (
                        <button
                          className="btn img-fluid"
                          width="100px"
                          height="400px"
                          onClick={() => setmainimage(item)}
                        >
                          {" "}
                          <img
                            src={item}
                            width="100px"
                            height="60px"
                            className="img-fluid"
                          />
                        </button>
                      ))}
                    </div>
                    <div className="col-md-6">
                      <div className="row">
                        <h4>Share</h4>
                        <div className="col-md-4 ">
                          <FacebookShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + postdata.product_name}
                            hashtag="#react"
                          >
                            <FacebookIcon
                              logofillColor="white"
                              round={true}
                            ></FacebookIcon>
                          </FacebookShareButton>
                        </div>
                        <div className="col-md-4">
                          <WhatsappShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + postdata.product_name}
                            hashtag="#react"
                          >
                            <WhatsappIcon
                              logofillColor="white"
                              round={true}
                            ></WhatsappIcon>
                          </WhatsappShareButton>
                        </div>
                        <div className="col-md-4">
                          <TwitterShareButton
                            url="https://www.amazon.in/"
                            title={"Checkout " + postdata.product_name}
                            hashtag="#react"
                          >
                            <TwitterIcon
                              logofillColor="white"
                              round={true}
                            ></TwitterIcon>
                          </TwitterShareButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <br />
              </div>
            </div>
            <hr />
          </div>
        </div>
        <br />
        <br />
        <Footer />
      </div>
    </div>
  );
}

export default ProductDetails;
