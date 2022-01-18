import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import {HiPencil} from "react-icons/hi"
import MyAccount from './MyAccount';
import { getProfile, updProfile,getSocialProfile } from '../../config/MyService';
import axios from 'axios';
import '../../App.css';
import Header from '../Header';
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);


export default function Profile() {
    let [user, setUser] = useState([]);
    // const [file, setFile] = useState("");
    const [showInvoice, setShowInvoice] = useState(false)
    let [password, setPassword] = useState('');
    let [fname, setFname] = useState('');
    let [lname, setLname] = useState('');
    let [mobile, setMobile] = useState('');
    let [address, setAddress] = useState('');
    let [email, setEmail] = useState('');


    useEffect(() => {
        getProfile(localStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    let data = res.data.user;
                    setUser(data);
                    setEmail(data.email);
                    setFname(data.fname);
                    setMobile(data.mobile);
                }
            })
    }, [])
    useEffect(() => {
        getSocialProfile(localStorage.getItem('user'))
            .then(res => {
                if (res.data.user) {
                    console.log(res.data.user);
                    let data = res.data.user;
                    setUser(data);
                    setEmail(data.email);
                    setFname(data.fname);
                    setMobile(data.mobile);
                }
            })
    }, [])


    const updateProfile = (id) => {
        let data = {
            fname: fname, lname: lname, email: email, mobile: mobile
        };
        console.log(data)
        updProfile(id, data)
            .then(res => {
                if (res.data.err) {
                    alert(res.data.err);
                }
                else {
                    alert(res.data.msg);
                    window.location.reload();
                }
            })
    }

    // const onFormSubmit = (e) => {
    //     e.preventDefault();
    //     const formData = new FormData();

    //     formData.append('file', document.getElementById('files').files[0]);
    //     formData.append('email', email)
    //     const config = {
    //         headers: {
    //             'content-type': 'multipart/form-data'
    //         }
    //     };
    //     axios.post("http://localhost:8899/api/neostore/upload", formData, config)
    //         .then((res) => {
    //             console.log(res.data)
    //             alert("The file is successfully uploaded");
    //         })
    // }

    // const onChange=(e)=> {
    //     setFile({file:e.target.files});
    // }
    const handleSubmit = (e) => {
        // Prevent page reload on form submit
        e.preventDefault()
    }
    return (
        <div>
            <Header/><br />
      <br />
            <div className="container"><br/>
            <h1 className='text-left'>My Account</h1>
            <hr />
            <div className="row  ">

                <div className='col-md-6'>

                    <MyAccount />

                </div>
                <div className='col-md-6'>
                    {!showInvoice && (
                        <>
                            <div className='card1'>
                                <h2>Profile</h2>
                                <hr />
                                <Card.Body className='container'  >
                                    {/* <Card.Text>FirstName:&nbsp;   <span>{user.fname}   </span></Card.Text>
                                    <Card.Text>   <span>LastName:&nbsp;{user.lname} </span> </Card.Text>
                                    <Card.Text><span> Email:&nbsp;{user.email}</span></Card.Text>
                                    <Card.Text><span> Gender:&nbsp;{user.gender}</span></Card.Text>
                                    <Card.Text>Mobile:&nbsp; {user.mobile}</Card.Text> */}
                                    <table className='table table-borderless' >
                                        <tr>
                                        <th>First Name : </th>
                                        <td>&nbsp;&nbsp;{user.fname}</td>
                                        </tr><br/>
                                        <tr>
                                        <th>Last Name : </th>
                                        <td>&nbsp;&nbsp;{user.lname}</td>
                                        </tr><br/>
                                        <tr>
                                        <th>Email ID : </th>
                                        <td>&nbsp;&nbsp;{user.email}</td>
                                        </tr><br/>
                                        <tr>
                                        <th>Gender : </th>
                                        <td>&nbsp;&nbsp;{user.gender}</td>
                                        </tr><br/>
                                        <tr>
                                        <th>Mobile no : </th>
                                        <td>&nbsp;&nbsp;{user.mobile}</td>
                                        </tr><br/>
                                        
                                    </table>
                                    <hr />
                                    <button className="btn btn-outline-dark"onClick={() => setShowInvoice(true)}><HiPencil/>  Edit</button>
                                </Card.Body>
                            </div>
                        </>
                    )}
                    {showInvoice && (
                        <div className="m-1">

                            <div className='card1'>
                                <h2 className="text-center pt-3 p-3">Update Profile </h2>
                                <Form >
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">
                                            <b>First Name</b>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" placeholder="Enter Name" name="fname" defaultValue={user.fname} onChange={(e) => { setFname(e.target.value) }}
                                            />
                                            {fname != '' && fname.length < 4 && <span className="text-danger">Enter Name correctly</span>}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">
                                            <b>Last Name</b>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" placeholder="Enter Name" name="lname" defaultValue={user.lname} onChange={(e) => { setLname(e.target.value) }}
                                            />
                                            {lname != '' && lname.length < 4 && <span className="text-danger">Enter Name correctly</span>}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">
                                            <b>Email</b>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" placeholder="Enter Email" name="email" defaultValue={user.email} onChange={(e) => { setEmail(e.target.value) }} />
                                            {email != '' && !regForEmail.test(email)
                                                && <span className="text-danger">Enter email  correctly</span>}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm="3">
                                            <b>  Mobile</b>
                                        </Form.Label>
                                        <Col sm="8">
                                            <Form.Control type="text" placeholder="Enter mobile number" name="mobile" defaultValue={user.mobile} onChange={(e) => { setMobile(e.target.value) }} />
                                            {mobile != '' && mobile.length !== 10 && <span className="text-danger">Enter Mobile number correctly</span>}
                                        </Col>
                                    </Form.Group>


                                    <Button variant="dark" onClick={() => updateProfile(user._id)} className="mt-3">Update</Button>&nbsp;
                                    <Button variant="danger" onClick={() => setShowInvoice(false)} className="mt-3 ml-3">Close</Button>
                                </Form>
                            </div>
                        </div>
                    )}
                </div>

            </div>

        </div></div>
    )
}
