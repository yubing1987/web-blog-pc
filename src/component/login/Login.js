import React, {Component} from 'react';
import {
    Form
} from 'antd';
import "./Login.css"
import LoginForm from "./LoginForm";

const LoginFormView = Form.create({ name: 'normal_login' })(LoginForm);

class Login extends Component {

    render(){
        return <div className="login-background">
            <div className="login-panel">
            <LoginFormView/>
            </div>
        </div>
    }
}


export default Login;