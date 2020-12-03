import React from "react";
import makeToast from "../Toaster";
import axios from "axios";
import {Link} from "react-router-dom";
import Button from "./components/Button";
import { withRouter } from "react-router-dom";

const LoginPage = (props) => {
    const emailRef = React.createRef();
    const passwordRef = React.createRef();

    const loginUser = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        axios
            .post("http://localhost:8000/user/login", {
                email,
                password,
            })
            .then((response) => {
                makeToast("success", response.data.message);
                localStorage.setItem("CC_Token", response.data.token);
                props.history.push("/dashboard");
                props.setupSocket();
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
            <h1 className="d-flex justify-content-center">Login</h1>
            <div className="cardBody">
                <div className="inputGroup">
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
                name='Login'
                action={loginUser}
                style={`w-100 btn btn-primary mt-2`}></Button>
                <Link className="link" to={"/register"}>
                <Button
                name='Register'
                action={``}
                style={`w-100 btn btn-success mt-2`}></Button>
                </Link>
            </div>
        </div>
    );
};

export default withRouter(LoginPage);