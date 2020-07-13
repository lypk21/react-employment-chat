import React, {Component} from "react";
import {
    Button,
    List,
    InputItem,
    WhiteSpace,
    WingBlank,
    NavBar
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'
import Logo from "../../components/logo/logo";

class Login extends Component {
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
        this.props.login(this.state)
    }

    toRegister = () => {
        this.props.history.replace('/register')
    }

    render() {
        const {msg,redirectTo} = this.props.user
        if(redirectTo) {
            return <Redirect to={redirectTo} />
        }

        return(
            <div>
                <NavBar>Employment Recruitment Login</NavBar>
                <Logo/>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        {msg ? <div className='error-message'>{msg}</div> : null}
                        <InputItem placeholder='input username' onChange={val => this.handleChange('username',val)}>Username:</InputItem>
                        <WhiteSpace />
                        <InputItem type='password'  placeholder='input password'  onChange={val => this.handleChange('password',val)}>Password:</InputItem>
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
// connect with redux login action,when click Login,pass data to register action.
// inside login action: 1.validate input data.
// 2.call axios api for login in, and store user_id in Cookie of server side.
// 3.dispatch action type to reducers.
// inside reducers, update the user status and return back to login page via store.
// the login page will get latest user status via props and redirect to other page.
export default connect(
    state => ({user:state.user}),
    {login}
)(Login)
