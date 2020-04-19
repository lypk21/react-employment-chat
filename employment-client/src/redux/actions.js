/*
n actions creators including asyn and syn ajax request
 */
import {reqLogin, reqRegister, reqUpdate, reqUser,reqUserList,reqMsgList,reqReadMsgs} from '../api/index'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG,MSG_READ} from './action-types'

import io from 'socket.io-client'

//success login and register auth action
const authSuccess = (user)=> ({type: AUTH_SUCCESS, data:user})

//error message action
const errorMessage = (msg) => ({type:ERROR_MSG, data:msg})

//syn actions
const receiveUser = (user) => ({type:RECEIVE_USER, data:user})

const receiveUserList = (users) => ({type:RECEIVE_USER_LIST, data:users})

export const resetUser = (msg) => ({type:RESET_USER,data:msg})

const receiveMsgList = ({users,chatMsgs,user_id}) => ({type: RECEIVE_MSG_LIST, data: {users,chatMsgs,user_id}})

const receiveMsg = (chatMsg,user_id) => ({type:RECEIVE_MSG,data:{chatMsg,user_id}})

const readMsg = ({from,to,count}) => ({type:MSG_READ, data:{from,to,count}})

//asyn actions
export const register = (user) => {
    const {username,password,password2,type} = user
    //front end form data validation
    if(!username) {
       return errorMessage('username is required')
    }
    if(!password) {
        return errorMessage('password is required')
    }

    if(password !== password2) {
        return errorMessage('two passwords are not the same')
    }

    return async dispatch => {
        //send register asyn request
        const response = await reqRegister({username,password,password2,type})
        const result = response.data
        if(result.code === 0) {

            //once login, get msgList
            getMsgList(dispatch,result.data._id)

            //dispatch success action
            dispatch(authSuccess(result.data))
        } else {
            //dispatch error action
            dispatch(errorMessage(result.msg))
        }
    }
}

export const login = (user) => {
    const {username, password} = user

    if(!username) {
        return errorMessage('username is required')
    }
    if(!password) {
        return errorMessage('password is required')
    }

    return async dispatch => {
        const response = await reqLogin(user)
        const result = response.data
        if(result.code === 0) {
            //once login, get msgList
            getMsgList(dispatch,result.data._id)

            dispatch(authSuccess(result.data)) //result.data is user
        } else {
            dispatch(errorMessage(result.msg))
        }
    }
}

export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdate(user)
        const result = response.data
        if(result.code === 0) {
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

//auto login
export const getUser = () => {
    return async  dispatch => {
        const response = await reqUser()
        const result = response.data
        if(result.code === 0) {
            //once login, get msgList
            getMsgList(dispatch,result.data._id)

            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

export const getUserList = (type) => {

    return async dispatch => {
        const response =  await reqUserList(type)
        const result = response.data
        if(result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}

//create a singleton instance for io
function initIO(dispatch,user_id) {
    if(!io.socket) {
        io.socket = io('ws://localhost:4000')
        io.socket.on('receiveMsg',function (data) {
            console.log('From server: ',data)
            //receive msg and dispatch action to update chatMsgs
            if(data.from === user_id || data.to === user_id ) {
                //only msg related to me, update my chatMsgs
                dispatch(receiveMsg(data,user_id))
            }
        })
    }
}

//receive msglist {users,chatMsgs}, when user once login
async  function getMsgList(dispatch,user_id) {
    //init socket once user login
    initIO(dispatch,user_id)

    const response = await reqMsgList()
    const result = response.data
    const {users,chatMsgs} = result.data
    if(result.code === 0) {
        dispatch(receiveMsgList({users,chatMsgs,user_id}))
    }
}

export const sendMsg = (({from,to,content}) => {
    return dispatch => {
        io.socket.emit('sendMsg',{from,to,content})
    }
})

export const readMsgs = (from,to) => {
    return async  (dispatch) => {
        const response = await reqReadMsgs(from)
        const result = response.data
        const count = result.data
        dispatch(readMsg({from,to,count}))
    }

}


