import React, { useState, useEffect, useRef } from 'react'
import { Card, TextField, FormControl ,CardContent, Button, Alert} from '@mui/material'
import { Link } from 'react-router-dom'
import { Navigate } from "react-router";
import axios from 'axios'
import CryptoJS  from 'crypto-js';
import ReCAPTCHA from 'react-google-recaptcha';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import SocialButton from './SocialButton';

export default function Login() {
    const [data,setData]= useState([]);
    const [flag,setflag]= useState(0);
    const [captcha, setcaptcha] = useState(0)
    const [error,seterror]= useState('')
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    useEffect(()=>{
        axios.get('http://localhost:3001/user')
        .then(res=>{
            setData(res.data)
        })
    },[])

    const checkdata=()=>{
        console.log(data)
        let email=emailRef.current.value;
        let password=passwordRef.current.value;
        data.forEach(ele=>{
            let bytes  = CryptoJS.AES.decrypt(ele.Pass, 'secret key 123');
            let decryptpass = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            if(email===ele.Email && password===decryptpass){
                if(captcha){
                    setflag(1);
                localStorage.setItem('user',JSON.stringify(ele));
                console.log("successsss")
                }
               else{
                   alert("Please Verify captcha")
               }
            }
        })
        if(!flag){
            seterror("Email or Password does not match")
        }
    }
    const verify=()=>{
        setcaptcha(1);
    }

    const handleSocialLogin = (user) => {
        console.log(user);
        let userlogin= data.find(x=>x.Email===user._profile.email)
        let userIndex = data.indexOf(userlogin)
        console.log(userlogin)
        console.log(userIndex)

        if(userIndex +1){
            localStorage.setItem('user',JSON.stringify(data[userIndex]));
            setflag(1);
        }
        else{
            let formData = {
                fName: user._profile.firstName,
                lName: user._profile.lastName,
                uName: user._profile.id,
                Email: user._profile.email,
                Pass: 'socialLogin',
                budget:0,
                expenses:[]
              };
              axios.post(`http://localhost:3001/user`,formData)
            localStorage.setItem('user',JSON.stringify(formData));
              setflag(1);
        }
        // data.forEach(ele=>{
           
        //     if(user._profile.email===ele.Email && 'socialLogin'===ele.Pass){
        //         localStorage.setItem('user',JSON.stringify(ele));
        //         console.log("successsss")      
        //         setflag(1);          
        //     }
           
        // })
        // if(localStorage.getItem('user')!=undefined){
        //     console.log("new User")
        //     let formData = {
        //         fName: user._profile.firstName,
        //         lName: user._profile.lastName,
        //         uName: user._profile.id,
        //         Email: user._profile.email,
        //         Pass: 'socialLogin',
        //         budget:0,
        //         expenses:[]
        //       };
        //       axios.post(`http://localhost:3001/user`,formData)
        //     localStorage.setItem('user',JSON.stringify(formData));
        //       setflag(1);
        // }      
      };
      
      const handleSocialLoginFailure = (err) => {
        console.error(err);
      };

    return (
        <div>
            <h1 style={{"color":'darkblue'}} className="text-center mt-3">Welcome Back</h1>
            <p className="mt-2 text-center">Don't have an account? <Link className="mt-5 pt-4" to="/registration">Sign Up</Link></p>
            {!flag?
            <Card sx={{ width:'55ch' ,mx:"auto",my:'0.5rem'}}> 
                        <CardContent>       
                            <h1 style={{"color":'darkblue', textAlign: 'center'}}>Login Page</h1>
                            {error.length > 1 && <Alert severity="warning">{error}</Alert>}

                            <FormControl sx={{m:1, width:'50ch'}}>
                                <TextField
                                    id="email"
                                    inputRef={emailRef}
                                    label="Email"/>
                                <TextField
                                    className="mt-3"
                                    id="password"
                                    inputRef={passwordRef}
                                    type="password"
                                    label="Password"/> 
                            <br/> 
                            <ReCAPTCHA
                                sitekey="6LdfthwdAAAAAMiSOmrQnUUQ_QCkd8yTnp5l9wGz"
                                onChange={verify}
                            />
                                <Button variant="contained" className="mt-3" onClick={checkdata}>Login</Button>
                                <p className="mt-2 text-center">or</p>

                                <SocialButton
                                style={{background:"lightblue"}}
                                provider="facebook"
                                appId="2171649733000264"
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure} 
                                className="mb-3">
                                <FacebookIcon style={{color:"blue", fontSize:35}}/>
                                Continue With facabook
                                </SocialButton>

                                <SocialButton 
                                provider="google"
                                appId="420321224046-je2rf4df9mqcua73ve0usqqvrsoqvdi5.apps.googleusercontent.com" 
                                onLoginSuccess={handleSocialLogin}
                                onLoginFailure={handleSocialLoginFailure}
                                style={{color:"red"}}><GoogleIcon style={{color:"red", fontSize:35}} /> 
                                Continue With Google
                                </SocialButton>
                            </FormControl>
                        </CardContent>
                    </Card>
                    : 
                    <Navigate to="/home"></Navigate> }
        </div>
    )
}