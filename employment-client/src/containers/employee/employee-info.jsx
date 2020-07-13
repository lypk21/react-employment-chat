import React, {Component} from "react";
import {InputItem,TextareaItem,NavBar,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import AvatarSelector from "../../components/avatar-selector/avatar-selector"
import {updateUser} from '../../redux/actions'

class EmployeeInfo extends Component {

    state = {
        avatar:'',
        role:'',
        info:''
    }

    handleChange = (name,val) => {
        this.setState({
            [name]:val
        })
    }
    save = () => {
        this.props.updateUser(this.state)
    }

    setAvatar = (avatar) => {
        this.setState({avatar})
    }
    render() {
        const {avatar,type} = this.props.user
        if(avatar) {
           let path = ''
           if(type === 'employee') path = '/employee'
           else path = '/employer'
            return <Redirect to={path} />
        }

        return(
            <div>
                <NavBar>Employee Info Input</NavBar>
                <AvatarSelector setAvatar={this.setAvatar} />
                <InputItem  placeholder='input applied role' onChange={val => {this.handleChange('role',val)} } >Role:</InputItem>
                <TextareaItem placeholder='input personal introduce' onChange={val => {this.handleChange('info',val)} } title='Introduce' rows={3}></TextareaItem>
                <Button type='primary' onClick={this.save}>Save</Button>
            </div>
        )
    }
}
//for new user, when login, they need to update their profile, once choose avatar, next time login, will pass this part
export default connect(
    state => ({user:state.user}),
    {updateUser}
)(EmployeeInfo)
