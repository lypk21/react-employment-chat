import React, {Component} from "react";
import {connect} from 'react-redux'
import {WhiteSpace,Button,List,Result,Modal} from 'antd-mobile'
import Cookies  from 'js-cookie'

import {resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief


class Personal extends Component {

    handlelogout = () => {
        Modal.alert('Logout','are you sure to quite?',[
            {
                text: 'No',
                onPress: () => {
                    console.log('no')
                }
            },
            {
                text: 'Yes',
                onPress: () => {
                    //clear cookie
                    Cookies.remove('user_id')
                    //reset redux user

                    this.props.resetUser()
                }
            }
        ])
    }

    render() {
        const {username, info, avatar, company, role, salary} = this.props.user
        if(!username) return null;
        return(
            <div style={{marginBottom:50, marginTop:50}}>
                <Result
                    title={username}
                    message={company}
                    img={<img src={require(`../../assets/img/avatars/${avatar}.png`)} style={{width: 50}} alt="header"/>}
                />
                <List renderHeader={() => 'Info'}>
                    <Item multipleLine>
                        <Brief>Role: {role}</Brief>
                        <Brief>Info: {info}</Brief>
                        {salary ? <Brief>salary: {salary}</Brief> : null}
                    </Item>
                </List>
                <WhiteSpace />
                <List>
                    <Button onClick={this.handlelogout}>Logout</Button>
                </List>
            </div>
        )
    }
}
export default connect(
    state => ({user: state.user}),
    {resetUser}
)(Personal)