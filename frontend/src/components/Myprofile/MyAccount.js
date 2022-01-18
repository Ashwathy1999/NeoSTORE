import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router";
// import { Outlet } from 'react-router-outlet'
import { Container } from 'react-bootstrap'
import { HiOutlineMenuAlt2 } from 'react-icons/hi'
import { BsArrowLeftRight } from 'react-icons/bs'
import { MdAccountBox, MdLibraryBooks } from 'react-icons/md'
import jwt_decode from "jwt-decode";
import Header from "../Header"
import { getProfile,getSocialProfile, getMulter, getImage, updProfile } from '../../config/MyService';
import axios from 'axios';
import '../../App.css';
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function MyAccount() {
    let [user, setUser] = useState([]);
    // const [file, setFile] = useState("");
    const [showInvoice, setShowInvoice] = useState(false)
    let [password, setPassword] = useState('');
    let [fname, setFname] = useState('');
    let [lname, setLname] = useState('');
    let [mobile, setMobile] = useState('');
    let [address, setAddress] = useState('');
    let [email, setEmail] = useState('');
    const [mainimage, setMainImage] = useState("")
    const [profileImg, setprofileImg] = useState("")
    const [gender, setGender] = useState("")
    const [state, setState] = useState({})
    const navigate = useNavigate();

    useEffect(() => {

        if (localStorage.getItem('_token') != undefined ) {

            let token = localStorage.getItem('_token');
            let decode = jwt_decode(token);
            console.log(decode)
            // setUid(decode.uid)
            getProfile(localStorage.getItem('user'))
                .then(res => {
                    if (res.data.user) {
                        console.log(res.data.user);
                        let data = res.data.user;
                        setUser(data);
                        setEmail(data.email);
                        setFname(data.fname);
                        setMobile(data.mobile);
                        setGender(data.gender);
                    }
                })
        }
        else if(localStorage.getItem('_Socialtoken') == "socialLLoginToken"){
            getSocialProfile(localStorage.getItem('user'))
            .then(res => {
                if (res.data.socialuser) {
                    console.log(res.data.socialuser);
                    let data = res.data.socialuser;
                    setUser(data);
                    setEmail(data.email);
                    setFname(data.fname);
                    setMobile(data.mobile);
                    setGender(data.gender);
                }
                else{
                    console.log("no data coming")
                }
            })
        }
        else {
            navigate("/login")
        }
    }, [])

    // const onSubmit1 = (e) => {
    //     e.preventDefault()
    //     const formData = new FormData()
    //     formData.append('profileImg', profileImg)
    //     getMulter(formData, localStorage.getItem('user')).then(res => {
    //         if (res) {
    //             console.log(res);
    //             getImage1();

    //         }
    //     })

    // }
    // const getImage1 = () => {
    //     let user = localStorage.getItem('user');
    //     getImage(user)
    //         .then(res => {

    //             if (res.data.err == 0) {
    //                 setMainImage(res.data.data.profileImg);

    //             }
    //             else {
    //                 setMainImage("images/pro.jpg")
    //             }
    //         })
    // }
    // const onFileChange = (e) => {
    //     setprofileImg(e.target.files[0])
    // }

    // const handleSubmit = (e) => {

    //     e.preventDefault()
    // }
    return (



        <div>
        {/* <Header/><br/> */}

            <div className=" text-center card1 " ><br/>
                {/* <HiUserCircle className="text-center" size="200px" /> */}
                {/* <img src={mainimage} height="200px" width="200px" className='card1'></img><br /><br /> */}
                <div >
                    {/* <div className="row">
                        <form onSubmit={onSubmit1}>
                            
                            <div className="container text-center" >
                                <div className="form-group   text-center">
                                    <input type="file" onChange={onFileChange} className="form-control sha " />
                                </div>
                                <br />
                                <div className="form-group text-center">
                                    <button className="btn btn-danger sha" type="submit">UPLOAD</button>
                                </div>
                            </div>
                            <br /><br></br>
                        </form>
                    </div> */}
                </div>
                <div>
                    {gender =="Male" ?
                    <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png" height="200" width="200px"/> 
                    : <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359554_1280.png" height="200" width="200px"/>
                    }
                </div><br/>
                <h4 className="text-danger text-center ">{user.fname}&nbsp;{user.lname}</h4><br />
                <div  >
                    <a className='btn sha text-center text-primary' href="/order"><HiOutlineMenuAlt2  /> Order</a><br /><br />
                    <a className='btn sha text-center text-primary' href="/profile"><MdAccountBox /> Profile</a><br /><br />
                    <a className='btn sha text-center text-primary ' href="/address"><MdLibraryBooks /> Address</a><br /><br />
                    <a className='btn  sha text-center text-primary'  href="/changePasssword"><BsArrowLeftRight /> ChangePasssword</a><br /><br />
                </div>
            </div>

        </div>




    )
}

