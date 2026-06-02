import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authSlice";
import Navbar from "../Navbar";
import {NavLink, useNavigate} from "react-router-dom";

function Login() {
    var [email, setEmail] = useState('');
    var [password, setPassword] = useState('');
    var [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function attemptLogin() {
        axios.post('https://worksheet-product.mashupstack.com/login',{
            email:email,
            password:password
        }).then(response=>{
            setErrorMessage('')
            var user = {
                email:email,
                token:response.data.token
            }
            dispatch(setUser(user));
            localStorage.setItem('user', JSON.stringify(user));
            navigate("/products");
        }).catch(error=>{
            if(error.response.data.errors){
                setErrorMessage(Object.values(error.response.data.errors).join(''))
            }else if(error.response.data.message){
                setErrorMessage(error.response.data.message)
            }else{
                setErrorMessage('Failed to login user. Please contact admin')
            }
        })
    }
    return (<div>
        <Navbar/>
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-lg border-0 rounded-lg">
                        <div className="card-body p-5">
                            <div className="text-center mb-4">
                                <h2 className="text-dark fw-bold">Welcome Back</h2>
                                <p className="text-muted">Sign in to your account</p>
                            </div>
                            {errorMessage?<div className="alert alert-danger d-flex align-items-center">
                                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                {errorMessage}
                            </div>:''}
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
                            <button className="btn btn-primary w-100 py-3 fw-bold" onClick={attemptLogin}>
                                <i className="bi bi-box-arrow-in-right me-2"></i>Login
                            </button>
                            <div className="text-center mt-4">
                                <span className="text-muted">Don't have an account? </span>
                                <NavLink to="/register" className="text-decoration-none fw-bold">Register</NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}

export default Login;
