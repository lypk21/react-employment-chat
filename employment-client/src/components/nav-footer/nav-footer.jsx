import React, {Component} from "react";
import {TabBar} from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'

//non router component need to get location props
class NavFooter extends Component {

    static propTypes = {
        navList: PropTypes.array.isRequired,
        unreadCount:PropTypes.number.isRequired
    }

    render() {
        const Item = TabBar.Item
        let {navList} = this.props
        navList = navList.filter(nav => !nav.hide)

        const path = this.props.location.pathname

        return(
            <TabBar>
                {
                    navList.map((nav) => (
                        <Item
                            badge={nav.path === '/message' ? this.props.unreadCount:null}
                            title={nav.text}
                            key={nav.path}
                            icon={{uri:require(`./images/${nav.icon}.png`)}}
                            selectedIcon={{uri:require(`./images/${nav.icon}-selected.png`)}}
                            selected={path === nav.path}
                            onPress={() => this.props.history.replace(nav.path)}
                        />
                    ))
                }
            </TabBar>
        )
    }
}

export default withRouter(NavFooter)