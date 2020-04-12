import React, {Component} from "react";
import {
    Button,
    List,
    InputItem,
    WhiteSpace,
    WingBlank,
    Radio,
    NavBar
} from 'antd-mobile'

import Logo from "../../components/logo/logo";

const ListItem = List.Item
export default class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }

    login = () => {
        console.log(this.state)
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        const {type} = this.state
        return(
            <div>
                <NavBar>Employment Recruitment Login</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem onChange={val => this.handleChange('username',val)}>Usernam:</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={val => this.handleChange('password',val)}>Password:</InputItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.login}>Login</Button>
                        <WhiteSpace />
                        <Button onClick={this.toRegister}>create account?</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}