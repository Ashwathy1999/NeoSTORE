import React,{useState,useEffect} from "react";
import { Carousel } from "react-bootstrap";
import Footer from "./Footer";
import Header from "./Header";
import {MdOutlineAddShoppingCart} from 'react-icons/md'
import { getPopularpost } from "../config/MyService";

export default function Dashboard() {
  const [postdata, setPostdata] = useState([])
//   useEffect(()=>{
      
//     if(localStorage.getItem('_token')!=undefined){
//         let token=localStorage.getItem('_token');
//         let decode=jwt_decode(token);
//         console.log(decode)
//         setUid(decode.uid)
//         getPost()
//         .then(res=>{
//             console.log("hey....................");
//             if(res.data.err==0){
//                 setPostdata(res.product.product);
//             }
//         })
//     }
//  },[])
  // console.log(postdata)

  useEffect(() => {
    getPopularpost()
      .then(res => {
        console.log(res.data);
        // if (res.data.err == 0) {
        //   setPostdata(res.data.product);
        // }
        setPostdata(res.data.product);
      })

  }, [])
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
        window.location.reload()
      }
    } else {
      let arr = [];
      arr.push(item);
      localStorage.setItem("mycart", JSON.stringify(arr));
      alert("Product Added to Cart");
      window.location.reload();
    }
  };

  return (
    <div>
      <Header />

      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/c11.jpeg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/c5.jpeg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="images/c13.jpeg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel><br/><br/>

      <h4>Popular Products</h4><br/><br/>

      <div className="container" ><br/>
      {/* {postdata[0].name} */}
     {/* <h2 className="text-white">Hey, {uid} !</h2> */}
      <div className=" row" >
        {postdata.map((val, index) =>
          <div className=" container col-md-6 col-lg-4">
            <div className="card1" >
              <img src={val.product_image} className="card-img-top" alt="..." height="300px" />
              <div className="card-body">
              <h4 className="card-title" style={{color:"blue"}}>{val.product_name}</h4>
                <h5 className="card-text">Rs.{val.product_cost}</h5>
                <a className="btn btncart text-white" style={{"border-radius": "12px"}} 
                // onClick={() =>
                //   props.cart(              {/* <h5 className="card-title">{val.product_desc}</h5>      */}

                //     val._id,
                //     val.image,
                //     val.name,
                //     val.price
                //   )}
                onClick={() => addtoCart(val)}
                  ><h5>Add to cart</h5></a>
              </div>
            </div>
          </div>)}

      </div>
      </div>

      <Footer />
    </div>
  );
}
