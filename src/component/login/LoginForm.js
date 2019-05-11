import React, {Component} from 'react';
import {
    Form, Icon, Input, Button,
} from 'antd';
import UserApi from "../../server/UserApi";

class LoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                UserApi.login(values["username"], values["password"])
                    .then(() => {
                        let url = this.getBackUrl();
                        if(!!url && url.length > 0){
                            window.location.href = url;
                        }
                    })
                    .catch(() => {})

            }
        });
    };

    getBackUrl(){
        let s = window.location.search;
        if(!!s && s.length > 1){
            s = s.substr(1);
        }
        else{
            return "";
        }
        let list = s.split("&");
        for(let l of list){
            let pl = l.split("=");
            if(pl.length === 2 && pl[0] === "back_url"){
                return pl[1];
            }
        }
        return "";
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

export default LoginForm;