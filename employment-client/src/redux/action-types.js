/*
define action const types
 */

export const AUTH_SUCCESS = 'auth_success' //login or register success

export const ERROR_MSG = 'error_msg'   //error message return

export const RECEIVE_USER = 'receive_user' //update user successfully

export const RESET_USER = 'reset_user' // update user unsuccessfully

export const RECEIVE_USER_LIST = 'receive_user_list' //receive user list

export const RECEIVE_MSG_LIST = 'receive_msg_list' //receive users and chatMsgs {users:{},chatMsgs:[]}

export const RECEIVE_MSG = 'receive_msg'  //receive one msg

export const MSG_READ = 'msg_read'  // read msgs for some one