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
        //auto login function: when login user close the browser, and then return back, auto login function help user redirect to proper page without login again.
        /*
         1. cookies has user_id ?  yes but not login(redux has no user id), send ajax (componentDidMount) to get user
         2. no, redirect login page
         3. redux has _id ?  no, return null
         4. yes, switch to different page according user type(employer/employee) and avatar(if empty, force to completed info page)
         5. when user login, if input the home page url, need to switch to matched page
         */

        const user_id = Cookies.get('user_id')
        //no user_id in Cookies, return to login page
        if(!user_id) return <Redirect to='/login' />

        //get user and unreadCount Message from redux
        const {user,unreadCount} = this.props;

        //if no user in redux, stop rendering, at the same time, componentDidMount will send getUser request to server to retrieve user into redux.
        // when redux has user, continue the rendering
        if(!user) return null;

        //if user already login and the input url is home page, need to redirect url according the user type and his avatar
        let path = this.props.location.pathname;
        if(path === '/') {
            const {type,avatar} = user
            path = getRedirectTo(type,avatar)
            return <Redirect to={path} />
        }

        const {navList} = this
        const currentNav = navList.find(nav => (nav.path === path))
        //hide is used for deciding which one of employer or employee page to show in the footer nav
        if(currentNav) {
            if(user.type === 'employer') navList[0].hide = true
            else navList[1].hide = true
        }


        return(
            <div>
                {
                    //header component, show current page title
                    currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null
                }
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

                {
                    //footer component, show nav lists.
                    currentNav ? <NavFooter unreadCount={unreadCount} navList={navList}></NavFooter> : null
                }
            </div>
        )
    }
}

// connect with redux getUser action to retrieve the login user status via Cookie user_id
export default connect(
    state => ({user:state.user,unreadCount:state.chat.unreadCount}),
    {getUser}
)(Main)
