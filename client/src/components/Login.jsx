import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Login = props => {
    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" })
    const [error, setError] = useState({})
    const history = useHistory();
    const {toggleUpdate, setToggleUpdate} = props

    const handleChange = e => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", loginInfo, { withCredentials: true })
            .then(res => {
                // console.log(res)
                if (res.data.msg === "success!") {
                    setToggleUpdate(!toggleUpdate)
                    history.push("/home")
                } else {
                    setError(res.data)
                }
            })
            .catch(err => console.log(err))
    }

    // useEffect(() => {
    //     axios.get('http://localhost:8000/api/users/loggedInUser', { withCredentials: true })
    //         .then(res => console.log(res.data))
    //         .catch(err => console.log(err))
    // }, [])

    return (
        <div className="container w-50">
            <h3>Login</h3>
            {error.invalidAttempt ? <p className="text-danger text-center">{error.invalidAttempt}</p> : ""}
            <form onSubmit={login} className="mt-4 container w-25">
                <div className="d-flex justify-content-center mb-3">
                    <label htmlFor="email" className="col-sm-5 col-form-label">Email: </label>
                    <input onChange={handleChange} type="text" className="form-control col-sm-7" id="email" name="email" value={loginInfo.email} />
                </div>
                <div className="d-flex justify-content-center mb-3 align-items-center">
                    <label htmlFor="password" className="col-sm-5 col-form-label">Password: </label>
                    <input onChange={handleChange} type="password" className="form-control col-sm-7" id="password" name="password" value={loginInfo.password} />
                </div>
                <div className="d-flex justify-content-center"><input className="button blue-button" type="submit" value="Login" /></div>
            </form>
        </div>
    );
};


export default Login;