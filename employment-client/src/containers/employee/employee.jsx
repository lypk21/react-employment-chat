import React, {Component} from "react";
import {connect} from 'react-redux'

import UserList from '../../components/user-list/user-list'
import {getUserList} from '../../redux/actions'

class Employee extends Component {

    componentDidMount() {
        this.props.getUserList('employer')
    }

    render() {
        const {userList} = this.props
        return(
            <UserList userList={userList} />
        )
    }
}

//connect with redux to get users list according to login user type, for example
//if login user is employee, he/she can only see employers list, chose who to chat.
export default  connect(
    state => ({userList:state.userList}),
    {getUserList}
)(Employee)
