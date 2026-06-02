import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

function Register() {
    var [userName, setUserName] = useState('');
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    var navigate = useNavigate();
    function registerUser(){
        var user = {
            user_name: userName,
            email: email,
            password: password
        }
        axios.post('https://worksheet-product.mashupstack.com/register',user).then(response=>{
            setErrorMessage('');
            navigate('/login');
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            }else{
                setErrorMessage('Failed to connect to api');
            }
        })
    }
    return <div>
        <Navbar/>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h2 className="text-dark fw-bold">Create Account</h2>
                                <p className="text-muted">Sign up to get started</p>
                            </div>
                            {errorMessage?<div className="alert alert-danger d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {errorMessage}
                            </div>:''}
                            <div className="form-floating mb-3">
                                <input type="text"
                                className="form-control"
                                id="userName"
                                placeholder="User Name"
                                value={userName}
                                onInput={(event)=>setUserName(event.target.value)}
                                />
                                <label htmlFor="userName">User Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input type="email"
                                className="form-control"
                                id="email"
                                placeholder="Email"
                                value={email}
                                onInput={(event)=>setEmail(event.target.value)}
                                />
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="form-floating mb-4">
                                <input type="password"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                                value={password}
                                onInput={(event)=>setPassword(event.target.value)}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                            <button className="btn btn-primary w-100 py-3 fw-bold" onClick={registerUser}>
                                <i className="bi bi-person-plus me-2"></i>Register
                            </button>
                            <div className="text-center mt-4">
                                <span className="text-muted">Already have an account? </span>
                                <NavLink to="/login" className="text-decoration-none fw-bold">Login</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Register;
