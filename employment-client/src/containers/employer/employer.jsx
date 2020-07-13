import React, {Component} from "react";
import {connect} from 'react-redux'

import {getUserList} from '../../redux/actions'
import UserList from "../../components/user-list/user-list";

class Employer extends Component {

    componentDidMount() {
        this.props.getUserList('employee')
    }

    render() {
        const {userList} = this.props
        return(
            <UserList userList={userList}>
            </UserList>
        )
    }
}

//connect with redux to get users list according to login user type, for example
//if login user is employer, he/she can only see employees list, chose who to chat.
export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(Employer)
