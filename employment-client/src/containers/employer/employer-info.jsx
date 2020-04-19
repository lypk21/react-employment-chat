import React, {Component} from "react";
import {InputItem,TextareaItem,NavBar,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import AvatarSelector from "../../components/avatar-selector/avatar-selector";
import {updateUser} from '../../redux/actions'

class EmployerInfo extends Component {

    state = {
        avatar: '',
        role: '',
        salary: '',
        info: ''
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
            if(type === 'employer') path = '/employer'
            else path = '/employee'
            return <Redirect to={path} />
        }
        return(
            <div>
                <NavBar>Employer Info Input</NavBar>
                <AvatarSelector setAvatar={this.setAvatar}/>
                <InputItem placeholder='input position' onChange={val => {this.handleChange('role',val)}}>Position:</InputItem>
                <InputItem placeholder='input company name' onChange={val => {this.handleChange('company',val)}}>Company:</InputItem>
                <InputItem placeholder='input Salary' onChange={val => {this.handleChange('salary',val)}}>Salary:</InputItem>
                <TextareaItem placeholder='input role description' onChange={val => {this.handleChange('info',val)}} title='Role Desc' rows={3}></TextareaItem>
                <Button type='primary' onClick={this.save}>Save</Button>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user}),
    {updateUser}
)(EmployerInfo)