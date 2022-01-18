import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Forgot from './components/Otp';
import Products from './components/Products';
import Thanku from './components/Thanku';
import Otp from './components/Otp';
import Forgotpassword from './components/Forgotpassword';
import MyAccount from './components/Myprofile/MyAccount';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

import Order from './components/Myprofile/Order';
import Address from './components/Myprofile/Address';
import Profile from './components/Myprofile/Profile';
import ChangePasssword from './components/Myprofile/ChangePassword';
import Checkout from './components/Checkout';
import Invoice from './components/Invoice';
import Map from './components/Map';


function App() {
  return (
    <div className="App">
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/otp" element={<Otp/>}/>
        <Route path="/forgot" element={<Forgotpassword/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/products" element={<Products/>} />
        <Route path="/productdetails" element={<ProductDetails/>}/>
        <Route path="/account" element={<MyAccount/>} />
        <Route path="/thanku" element={<Thanku/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/invoice" element={<Invoice/>} />
        <Route path="/map" element={<Map/>} />



        <Route path="/changePasssword" element={<ChangePasssword/>} />
        <Route path="/order" element={<Order/>} />
        <Route path="/address" element={<Address/>} />
        <Route path="/profile" element={<Profile/>} />


      </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
