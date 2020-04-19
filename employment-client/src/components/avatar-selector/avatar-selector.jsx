import React, {Component} from "react";
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class AvatarSelector extends Component {
    constructor(props) {
        super(props)
        this.avaterList = []
        for (let i = 0; i < 20; i++) {
            this.avaterList.push({
                'text': 'avatar' + (i + 1),
                'icon': require(`../../assets/img/avatars/avatar${i + 1}.png`)
            })
        }
    }

    state = {
        icon: null
    }

    static propTypes = {
        setAvatar:PropTypes.func.isRequired
    }

    handleClick = ({text,icon}) => {
        this.setState({icon})
        this.props.setAvatar(text)
    }

    render(){
        const {icon} = this.state

        const listHeader = !icon ? 'Please select avatar' : (
            <div>
                The selected avatar:
                <img src={icon} alt=""/>
            </div>
        )


        return (
            <List renderHeader={() => listHeader}>
                <Grid data={this.avaterList} columnNum={5} onClick={this.handleClick}>
                </Grid>
            </List>
        )
    }
}