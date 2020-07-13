import React, {Component} from "react";
import PropTypes from 'prop-types'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Header = Card.Header
const Body = Card.Body

class UserList extends Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {
        const {userList} = this.props
        return(
            <WingBlank style={{marginBottom:50,marginTop:50}}>
                {
                    userList.map((user) => (
                        <div key={user._id}>
                            <WhiteSpace />
                                <Card onClick={() => {this.props.history.push(`/chat/${user._id}`)}}>
                                    <Header
                                        thumb={user.avatar ? require(`../../assets/img/avatars/${user.avatar}.png`) : null}
                                        extra={user.username}
                                    />
                                    <Body>
                                        <div>
                                            Role: {user.role}
                                        </div>
                                        {user.company ? <div>Company: {user.company}</div> : null}
                                        {user.salary ? <div>Salary: {user.salary}</div> : null}
                                        <div>Info: {user.info}</div>
                                    </Body>
                                </Card>
                        </div>
                    ))
                }
            </WingBlank>
        )
    }
}

export default withRouter(UserList)
