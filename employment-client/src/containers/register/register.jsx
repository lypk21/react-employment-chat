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
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'


const ListItem = List.Item

class Register extends Component {

    state = {
        'username': '',
        'password': '',
        'password2': '',
        'type':'employee'
    }

    register = () => {
        this.props.register(this.state)
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
        const {msg,redirectTo} = this.props.user
        //if register success, return to home page
        if(redirectTo) {
            return <Redirect to={redirectTo}/>
        }

        return(
            <div>
                <NavBar>Employment Recruitment Register</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        {msg ? <div className='error-message'>{msg}</div> : null}
                        <InputItem placeholder='input user name' onChange={val => {this.handleChange('username',val)}}>User Name:</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' placeholder='input password' onChange={val => {this.handleChange('password',val)}}>Password:</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' placeholder='confirm password' onChange={val => {this.handleChange('password2',val)}}>Conform:</InputItem>
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

export default connect(
    state => ({user:state.user}),
    {register}
)(Register)