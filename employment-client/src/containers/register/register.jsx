import React, {Component} from "react";
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'

import Logo from '../../components/logo/logo'

const ListItem = List.Item

export default class Register extends Component {

    state = {
        'username': '',
        'password': '',
        'password2': '',
        'type':'employee'
    }

    register = () => {
        console.log(this.state)
    }

    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }

    toLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const {type} = this.state

        return(
            <div>
                <NavBar>Employment Recruitment Register</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem onChange={val => {this.handleChange('username',val)}}>User Name:</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' onChange={val => {this.handleChange('password',val)}}>Password:</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' onChange={val => {this.handleChange('password2',val)}}>Conform:</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>User Type:</span> &nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'employee'} onChange={() => {this.handleChange('type','employee')}}>Employee</Radio>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio checked={type === 'employer'} onChange={() => {this.handleChange('type','employer')}}>Employer</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type='primary' onClick={this.register}>Register</Button>
                        <WhiteSpace />
                        <Button onClick={this.toLogin}>already has account?</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}