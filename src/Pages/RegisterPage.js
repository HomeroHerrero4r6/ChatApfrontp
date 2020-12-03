import React from "react";
import axios from "axios";
import Button from "./components/Button";
import makeToast from "../Toaster";
import {Link} from "react-router-dom";
const RegisterPage = (props) => {
    const nameRef = React.createRef();
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const registerUser = (props) => {
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios
            .post("http://localhost:8000/user/register", {
                name,
                email,
                password,
            })
            .then((response) => {
                makeToast("success", response.data.message);
                props.history.push("/login");
            })
            .catch((err) => {
                // console.log(err);
                if (
                    err &&
                    err.response &&
                    err.response.data &&
                    err.response.data.message
                )
                    makeToast("error", err.response.data.message);
            });
    };

    return (
        <div className="card">
            <h1 className="d-flex justify-content-center">Registration</h1>
            <div className="cardBody">
                <div className="inputGroup">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your Name"
                        ref={nameRef}
                    />
                </div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="abc@example.com"
                    ref={emailRef}
                />
            </div>
            <div className="inputGroup">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    ref={passwordRef}
                />
            </div>
            <Button
                name='Register'
                action={registerUser}
                style={`btn btn-success`}></Button>
                <Link to={"/login"}>
                <Button
                name='Login'
                action={``}
                style={`w-100 btn btn-primary mt-2`}></Button>
                </Link>
                
        </div>
    );
};

export default RegisterPage;