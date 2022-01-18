import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { connect } from "react-redux";
import { getPosts } from "../config/MyService";
import { useSelector, useDispatch } from "react-redux";
import { Dropdown, DropdownButton } from "react-bootstrap";
import ProductDetails from "./ProductDetails";
import { BsSearch, BsSortUpAlt, BsSortDown } from "react-icons/bs";
import { FaSquareFull } from "react-icons/fa";
// import MultiSelect from  'react-multiple-select-dropdown-lite'
import "react-multiple-select-dropdown-lite/dist/index.css";
import { Navigate, useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import ReactStars from "react-rating-stars-component";

export default function Products(props) {
  const [postdata, setPostdata] = useState([]);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [showdata, setshowdata] = useState(1);
  const [rating, setRating] = useState(1);

  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postdata.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const navigate = useNavigate();
  // const cart = useSelector((state) => state.cartItems);
  // console.log(cart);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   let prodcount=0;
  //   let resultPerPage =  0;
  //   let prod = []
  //   fetchProductService(currentPage,price)
  //   .then(res =>{
  //     prod= res.data.products
  //     prodcount= res.data.productsCount
  //     resultPerPage= res.data.resultPerPage
  //     setState(prod)
  //     setproductcount(prodcount)
  //     setresultperPage(resultPerPage)

  //   })
  // }, []);

  const ratingChanged = () => {
    const sort_products = postdata;
    sort_products.sort(function (a, b) {
      var nameA = a.product_rating;
      var nameB = b.product_rating;
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }
      return 0;
    });
    setPostdata(sort_products);
  };

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

  const singleitem = (id) => {
    console.log(id);
    navigate("/productdetails", {
      state: { id: id },
    });
  };


  const filterCategory = (catItem) => {
    console.log(data);
    const result = data.filter((curdata) => {
      return curdata.category_id.category_name === catItem;
    });
    setPostdata(result);
  };

  const filterColor = (catItem) => {
    const result = postdata.filter((curdata) => {
      return curdata.color_id.color_name === catItem;
    });
    setPostdata(result);
  };

  const allproduct = () => {
    getPosts().then((res) => {
      console.log(res.data);
      setPostdata(res.data.product);
      setData(res.data.product);
    });
  };
  const increase = () => {
    setshowdata(1);
    setTimeout(() => {
      for (var i = 0; i < postdata.length; i++) {
        for (var j = 0; j < postdata.length - i - 1; j++) {
          if (postdata[j].product_cost < postdata[j + 1].product_cost) {
            var temp = postdata[j];
            postdata[j] = postdata[j + 1];
            postdata[j + 1] = temp;
          }
        }
      }
      setPostdata(postdata);
      setshowdata(0);
    }, 1000);
  };
  const decrease = () => {
    setshowdata(1);
    setTimeout(() => {
      for (var i = 0; i < postdata.length; i++) {
        for (var j = 0; j < postdata.length - i - 1; j++) {
          if (postdata[j].product_cost > postdata[j + 1].product_cost) {
            var temp = postdata[j];
            postdata[j] = postdata[j + 1];
            postdata[j + 1] = temp;
          }
        }
      }
      setPostdata(postdata);
      setshowdata(0);
    }, 1000);
  };

  useEffect(() => {
    // getPosts().then((res) => {
    //   console.log(res.data);
    //   // if (res.data.err == 0) {
    //   //   setPostdata(res.data.product);
    //   // }
    //   setPostdata(res.data.product);
    // });
    allproduct();
  }, []);

  return (
    <div>
      <Header />

      <div>

        <div className="container-fluid">
          <br />

          <br />
          <div className="row">
            <div className="col-md-2 col-lg-2">
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <button
                className="btn btn-dark catbtn"
                onClick={allproduct}
                // style={{ width: "150px" }}
              >
                {" "}
                All Products
              </button>
              <br />
              <br />

              <Dropdown>
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  // style={{ width: "150px" }}
                  className="catbtn"
                >
                  Category
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => filterCategory("Mobile")}
                  >
                    Mobiles
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => filterCategory("Electronics")}
                  >
                    Electronics
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    onClick={() => filterCategory("Fashion")}
                  >
                    Fashion
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => filterCategory("Fresh")}
                  >
                    Fresh
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br />
              <Dropdown>
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  // style={{ width: "150px" }}
                  className="catbtn"

                >
                  Color
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    href="#/action-1"
                    onClick={() => filterColor("Blue")}
                  >
                    <FaSquareFull style={{ color: "blue" }} /> Blue
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => filterColor("Black")}
                  >
                    <FaSquareFull style={{ color: "black" }} /> Black
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    onClick={() => filterColor("Yellow")}
                  >
                    <FaSquareFull style={{ color: "yellow" }} /> Yellow
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => filterColor("Green")}
                  >
                    <FaSquareFull style={{ color: "green" }} /> Green
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    onClick={() => filterColor("Red")}
                  >
                    <FaSquareFull style={{ color: "red" }} /> Red
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <br />
            </div>
            <div className="col-md-10 col-lg-10">
              <div className="row">
                <div className="col-md-10 text-center">
                  <input
                    type="text"
                    class="form-control form-control1"
                    placeholder="Search..."
                    onChange={(event) => {
                      setSearch(event.target.value);
                    }}
                  />
                </div>
               
                <div className="col-md-1 col-lg-1">
                  <button className="btn btn-outline-dark" onClick={increase}>
                    <BsSortUpAlt size="30px" />
                  </button>
                </div>
                <div className="col-md-1 col-lg-1 ">
                  <button className="btn btn-outline-dark" onClick={decrease}>
                    <BsSortDown size="30px" />
                  </button>
                </div>
                </div>
            
              <div className="row">
                {postdata
                  .filter((val) => {
                    if (search == "") {
                      return val;
                    } else if (
                      (val.product_name && val.product_desc)
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .slice(indexOfFirstPost, indexOfLastPost)
                  .map((val, index) => (
                    <div className=" container col-md-6 col-lg-4">
                      <div className="card1">
                        <img
                          src={val.product_image}
                          className="card-img-top"
                          alt=" "
                          onClick={() => singleitem(val._id)}
                        />
                        <div className="card-body text-center">
                          <h4
                            className="card-title"
                            style={{ color: "blue" }}
                            onClick={() => singleitem(val._id)}
                          >
                            {val.product_name}
                          </h4>
                          <h5 className="card-text">Rs.{val.product_cost}</h5>
                          <ReactStars
                            count={5}
                            // onChange={(e) => {
                            //   setRating(e.target.value);
                            // }}
                            size={25}
                            activeColor="#ffd700"
                            className="center "
                            edit={true}
                            isHalf={true}
                            value={val.product_rating}
                          />
                          <a
                            className="btn btncart text-white"
                            style={{ "border-radius": "12px" }}
                            onClick={() => addtoCart(val)}
                          >
                            <h5>Add to cart</h5>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="container bg-light ">
                    {/* <div className="container"> */}
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={postdata.length}
                  paginate={paginate}
                />
              {/* </div> */}
              </div>
              </div>
              {/* <div className="container text-center bg-light ">
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={postdata.length}
                  paginate={paginate}
                />
              </div> */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
// const mapStateToProps = (state) => {
//   return {
//     mycounter: state.count,
//   };
// };

// const mapDispatchTopProps = (dispatch) => {
//   return {
//     cart: function (_id, product_image, product_name, product_cost) {
//       dispatch({
//         type: "CART",
//         payload: {
//           id: _id,
//           product_image: product_image,
//           product_name: product_name,
//           product_cost:product_cost
//         },
//       });
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchTopProps)(Products);
