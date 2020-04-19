import React, {Component} from "react";
import {connect} from 'react-redux'
import {NavBar,List,InputItem,Grid,Icon} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

import {sendMsg,readMsgs} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {

    state = {
        content: '',
        isEmotionShow: false
    }

    handleSend = () => {
        //prepare data
        const from = this.props.user._id
        const to = this.props.match.params.user_id
        const content = this.state.content.trim()

        //send data
        this.props.sendMsg({from,to,content})

        //clear data
        this.setState({content: '', isEmotionShow: false})

    }

    toggleEmotionShow = () => {
        const isEmotionShow = !this.state.isEmotionShow
        this.setState({isEmotionShow})

        if(isEmotionShow) {
            setTimeout(() => {
               window.dispatchEvent(new Event('resize'))
            },0)
        }
    }

    //init emotions icons
    componentWillMount() {
        const emotions = ['🤔','😐','😖','😔','️🤤','😋','😝','😝','😇','🙃','😳','🤗','😚','😙','😪',
    '😴','💀','👽','👻','🤖','💩','🎃','😷','🤕','😵', '🤢','🤠','🤡','👿','👹','👺','😱','😕','🤑','😎',
    '🤓','😟','😭','😢','😢','😓','🙁','😒','🙄','😤','😠','😡','🤐','😶','😲','😯','😑','🤒','🤧','🤥',
    '😬','😧','😛','😈','😜','😣','😩','😫','😨','🙂','😀','😄','😆','😅','😂','🤣','😊','☺','️😌','😉','😏','😍','😘','😗']

        this.emotions = emotions.map((emotion) => ({text:emotion}))
    }


    componentDidMount() {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight)
        },1000)

    }

    componentDidUpdate () {
        setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight)
        },100)
    }

    componentWillUnmount() {

        //when window quite, set my unread msg to read
        const from = this.props.match.params.user_id
        const to = this.props.user._id
        this.props.readMsgs(from,to)
    }

    render() {
        const {user} = this.props
        const {users,chatMsgs} = this.props.chat
        const targetId = this.props.match.params.user_id

        //due to asyn request, the first fresh page will get undefined object.
        const meId = user._id
        if(!users[meId]) {
            return  null;
        }

        const chat_id = [meId,targetId].sort().join('_')
        const msgs = chatMsgs.filter((msg) => chat_id === msg.chat_id)
        const avatar = users[targetId].avatar ? require(`../../assets/img/avatars/${users[targetId].avatar}.png`) : null

        return(
            <div id='chat-page'>
                <NavBar
                        onLeftClick={() => {this.props.history.goBack()}}
                        icon={<Icon type='left'/>}
                        className='sticky-header'>
                    {users[targetId].username}
                </NavBar>
                <List style={{marginTop:50,marginBottom:50}}>
                    {
                        <QueueAnim type='left' delay={100}>
                            {
                                msgs.map((msg) => {
                                    if(msg.from === targetId) {
                                        //target user msgs
                                        return (
                                            <Item key={msg._id}
                                                thumb={avatar}>
                                                {msg.content}
                                            </Item>
                                        )

                                    } else {
                                        //my msgs
                                        return (
                                            <Item key={msg._id}
                                                  extra='me'
                                                  className='chat-me'>
                                                {msg.content}
                                            </Item>
                                        )
                                    }
                                })
                            }
                        </QueueAnim>
                    }
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        placeholder='Please input'
                        value={this.state.content}
                        onChange={val => this.setState({content:val})}
                        onFocus={() => {this.setState({isEmotionShow:false})}}
                        extra={
                            <span>
                                <span onClick={this.toggleEmotionShow} style={{marginRight:5}}>🙂</span>
                                <span onClick={this.handleSend}>Send</span>
                            </span>
                        }
                    ></InputItem>
                    {
                        this.state.isEmotionShow ?
                            <Grid
                                data={this.emotions}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item) => this.setState({content:this.state.content + item.text})}
                            >
                            </Grid>
                            : null
                    }

                </div>
            </div>
        )
    }
}

export default  connect(
    state => ({user:state.user,chat:state.chat}),
    {sendMsg,readMsgs}
)(Chat)