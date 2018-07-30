import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import logo from './css/images/logo.png';
import "./css/Login.css"

export default class LogIn extends React.Component {



    handleSubmit = event => {
        event.preventDefault();
        this.props.history.push(`/user/test`)
    }

    render() {
        return (
            <div className="Login">
                <header className="login-header">
                    <img className="logo"src={logo} alt="DDSLogo"/>
                    <h2 className="title">Duke Data Service</h2>
                </header>
                <form className="login-form" onSubmit={this.handleSubmit}>
                    <input type="text" name="username" placeholder="NetID" />
                    <input type="password" name="password" placeholder="Password" />
                    <Button
                        block
                        className="login-button"
                        bsSize="large"
                        type="submit"
                        onClick={console.log("hello")}
                    >
                        Login
                    </Button>
                    <p>Please log in with your Duke NetID and Password</p>
                </form>
            </div>
        );
    }
}
