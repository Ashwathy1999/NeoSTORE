import React,{useState} from 'react'
import { Container, Form, Button, Row, Col } from "react-bootstrap";

export default function Address() {

    const [password, setPassword] = useState("");
    const [oldpassword, setOldPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
  
    return (

        <div>
            <div >
                    <div className='cardLogin'>
                        <h2 className="bg-dark text-white">Change Password</h2><hr/>
                        <Form.Group className="mb-3">
                            <Form.Control
                            type="password"
                            placeholder="Enter Old Password"
                            name="oldpassword"
                            id="oldpassword"
                            onChange={(event) => {
                                setOldPassword(event.target.value);
                            }}
                            required
                            />
                            {oldpassword != "" && oldpassword.length < 8 && (
                            <span className="text-danger">Enter password correctly</span>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            id="password"
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                            required
                            />
                            {password != "" && password.length < 8 && (
                            <span className="text-danger">Enter password correctly</span>
                            )}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Control
                            type="password"
                            placeholder="Enter ConfirmPassword"
                            name="confirmpassword"
                            id="confirmpassword"
                            onChange={(event) => {
                                setConfirmpassword(event.target.value);
                            }}
                            required
                            />
                            {confirmpassword != "" && confirmpassword != password && (
                            <span className="text-danger">Passwords doesn't match</span>
                            )}
                        </Form.Group>
                          <button className='btn btn-md btn-dark'>Submit</button>
                      
                    </div>
                </div> 
        </div>
    )
}
