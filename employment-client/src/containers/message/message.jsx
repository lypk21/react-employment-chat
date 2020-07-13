import React, {Component} from "react";
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'


const Item = List.Item
const Brief = Item.Brief

class Message extends Component {

    getLastMsgs = (chatMsgs,meId) => {
        //1. get last msg base on chat_id and place on lastMsgObjs container, each item is {chat_id: msgObj }

        //init lastMsgObjs container
        const lastMsgObjs = {}

        //loop chatMsgs
        chatMsgs.forEach((chatMsg) => {
            //each chatMsg add unReadCount
            if(meId === chatMsg.to && !chatMsg.read) {
                chatMsg.unReadCount = 1
            } else {
                chatMsg.unReadCount = 0
            }

            const chat_id = chatMsg.chat_id
            if(!lastMsgObjs[chat_id]) {
                //if container has this chat_id, directly input
                lastMsgObjs[chat_id] = chatMsg
            } else {
                //each loop add to item unReadCount
                const unReadCount = lastMsgObjs[chat_id].unReadCount + chatMsg.unReadCount

                //if container already has this chat_id and is earlier than chatMsg， replace it
                if(chatMsg.create_time > lastMsgObjs[chat_id].create_time) {
                    lastMsgObjs[chat_id] = chatMsg
                }

                //keep each loop number of unReadCount, together is total number
                lastMsgObjs[chat_id].unReadCount = unReadCount
            }
        })

        //2.change lastMsgObjs to array, in order to sort by create time
        const lastMsgArr = Object.values(lastMsgObjs)

        //3.sort by create time
        lastMsgArr.sort((m1,m2) => {
            // m1 - m2 < 0, m1 before m2, m1 - m2 = 0, not change, m1 > m2, m2 before m1
            return m1.create_time - m2.create_time > 0
        })

        return lastMsgArr
    }




    render() {
        const {user} = this.props
        // users = [_id: {}]
        const {users,chatMsgs} = this.props.chat

        //get last msgs array
        const lastMsgs = this.getLastMsgs(chatMsgs,user._id)

        return(
            <List style={{marginBottom:50,marginTop:50}}>
                {
                    lastMsgs.map((lastMsg) => {

                        const targetId = user._id === lastMsg.to ? lastMsg.from : lastMsg.to
                        const targetUser = users[targetId]

                        return (
                            <QueueAnim type='left' delay={50}>
                                <Item
                                    key={lastMsg._id}
                                    extra={<Badge text={lastMsg.unReadCount}/>}
                                    thumb={targetUser.avatar ? require(`../../assets/img/avatars/${targetUser.avatar}.png`) : null}
                                    arrow='horizontal'
                                    onClick={() => this.props.history.push(`/chat/${targetId}`)}
                                >
                                    {lastMsg.content}
                                    <Brief>{targetUser.username}</Brief>
                                </Item>
                            </QueueAnim>

                            )
                    })
                }

            </List>
        )
    }
}

//connect redux to get all login user relative chat messages. these chat messages are received once the user login.
//handle these chat messages and filter out the last chat message and the target user
export default connect(
    state => ({user:state.user,chat:state.chat})
)(Message)
