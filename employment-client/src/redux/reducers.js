import {combineReducers} from 'redux'
import {AUTH_SUCCESS,ERROR_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG,MSG_READ} from './action-types'
import {getRedirectTo} from '../utils/index'

const initUser = {
    username:'',
    type:'',
    msg:'',
    redirectTo:''
}

const initUserList = []

function user(state = initUser,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            ////after success login or register, get user from server,overwrite state user,and add redirectTo attr
            const {type,avatar} = action.data
            return {...action.data,redirectTo: getRedirectTo(type,avatar)}
        case ERROR_MSG:
            //when login or register error, return the initUser state and overwrite the error msg
            return {...state, msg:action.data}
        case RECEIVE_USER:
            return action.data
        case RESET_USER:
            return {user:initUser,msg: action.data}

        default:
            return state;
    }
}

function userList(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChat = {
    users: {},  // {'_id':{username,avatar}}
    chatMsgs: [],
    unreadCount: 0
}

function chat(state = initChat,action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {users,chatMsgs,user_id} = action.data
            return {
                users,
                chatMsgs,
                unreadCount: chatMsgs.reduce((preTotal,chatMsg) => preTotal + (!chatMsg.read && chatMsg.to === user_id ? 1:0) , 0)
            }
        case RECEIVE_MSG:
            const {chatMsg} = action.data
            return {
                users:state.users,
                chatMsgs: [...state.chatMsgs,chatMsg],
                unreadCount: state.unreadCount + (!chatMsg.read&&chatMsg.to===action.data.user_id?1:0)
            }
        case MSG_READ:
            const {from,to,count} = action.data

            return {
                users:state.users,
                chatMsgs: state.chatMsgs.map((chatMsg) => {
                    if(chatMsg.from === from && chatMsg.to === to && !chatMsg.read) {
                        //unread,set it true,but can not change original state
                        return {...chatMsg,read:true}
                    } else {
                        //already readed
                        return chatMsg
                    }
                }),
                unreadCount: state.unreadCount - count
            }

        default:
            return state
    }
}

export default combineReducers({
   user,userList,chat
})
