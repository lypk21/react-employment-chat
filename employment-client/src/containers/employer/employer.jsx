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

export default connect(
    state => ({userList:state.userList}),
    {getUserList}
)(Employer)