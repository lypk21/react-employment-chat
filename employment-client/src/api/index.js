/*
include multiple api requests
return Promise
 */

import ajax from "./ajax";

//register api
export const reqRegister = (user) => ajax('/api/register',user,'POST')

//login api
export const reqLogin = ({username,password}) => ajax('/api/login',{username,password},'POST')

export const reqUpdate = (user) => ajax('/api/update',user,'POST')

export const reqUser = () => ajax('/api/user')

export const reqUserList = (type) => ajax('/api/userlist',{type})

export const reqMsgList = () => ajax('/api/msglist')

export const reqReadMsgs = (from) => ajax('/api/readmsg',{from},'POST')