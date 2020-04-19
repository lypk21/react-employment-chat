import React, {Component} from "react"
import {Switch, Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {NavBar} from 'antd-mobile'

import EmployerInfo from "../employer/employer-info";
import EmployeeInfo from "../employee/employee-info"
import {getRedirectTo} from '../../utils/index'
import {getUser} from '../../redux/actions'
import NotFound from "../../components/not-found/not-found";
import Employee from "../employee/employee";
import Employer from "../employer/employer";
import Message from "../message/message";
import Personal from "../personal/personal";
import NavFooter from "../../components/nav-footer/nav-footer";
import Chat from "../chat/chat";


class Main extends Component {

    navList = [
        //employee page
        {
            'title': 'Employers List',
            'component': Employee,
            'path': '/employee',
            'icon': 'employee',
            'text': 'employee'
        },
        //employer page
        {
            'title': 'Employees List',
            'component': Employer,
            'path': '/employer',
            'icon': 'employer',
            'text': 'employer'
        },
        //message page
        {
            'title': 'Message List',
            'component': Message,
            'path': '/message',
            'icon': 'message',
            'text': 'message'
        },
        //personal page
        {
            'title': 'Personal',
            'component': Personal,
            'path': '/personal',
            'icon': 'personal',
            'text': 'personal'
        }
    ]

    componentDidMount() {
        const user_id = Cookies.get('user_id')

        const {_id} = this.props.user

        if(user_id && !_id) {
            this.props.getUser()
        }
    }

    render() {
        //auto login function
        /*
         1. cookies has user_id ?  yes but not login(redux has no user id), send ajax (componentDidMount) to get user
         2. no, redirect login page
         3. redux has _id ?  no, return null
         4. yes, switch to different page according user type(employer/employee) and avatar(if empty, force to completed info page)
         5. when user login, if input the home page url, need to switch to matched page
         */

        const user_id = Cookies.get('user_id')
        if(!user_id) return <Redirect to='/login' />

        const {user,unreadCount} = this.props;


        if(!user) return null;

        let path = this.props.location.pathname;
        if(path === '/') {
            const {type,avatar} = user
            path = getRedirectTo(type,avatar)
            return <Redirect to={path} />
        }

        const {navList} = this
        const currentNav = navList.find(nav => (nav.path === path))
        if(currentNav) {
            if(user.type === 'employer') navList[0].hide = true
            else navList[1].hide = true
        }


        return(
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map((nav,index) => (
                            <Route key={index} path={nav.path} component={nav.component}/>
                        ))
                    }
                    <Route path='/employee_info' component={EmployeeInfo} />
                    <Route path='/employer_info' component={EmployerInfo} />
                    <Route path='/chat/:user_id' component={Chat} />
                    <Route component={NotFound} />
                </Switch>

                {currentNav ? <NavFooter unreadCount={unreadCount} navList={navList}></NavFooter> : null}
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user,unreadCount:state.chat.unreadCount}),
    {getUser}
)(Main)