import React, {Component} from "react";
import {Button} from 'antd-mobile'

export default class NotFound extends Component {
    render() {
        return(
            <div>
                <h2>Sorry, page not found</h2>
                <Button type='primary' onClick={() => this.props.history.replace('/')}>Return to Home</Button>
            </div>
        )
    }
}