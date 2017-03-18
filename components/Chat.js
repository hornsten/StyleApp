
import ReactDOM from "react-dom";
import React from "react";
import ChatHistory from "./ChatHistory.js";
import chathelper from "../app/utils/chathelper.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';

class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        var chatmessage = chathelper.updatechat_listener();
        console.log("chatmessage",chatmessage );
        if (chatmessage.length > -1){
            store.dispatch({ 
                type: 'CHAT_USER',
                chatuser: chatmessage[0]
            },
            { 
                type: 'CHAT_MSG',
                chatmsg: chatmessage[1]
            })
        }
  
    }


    render() {
        return (<div className="col-xs-12 col-md-12">
                    <ChatHistory />
                    <div className="chatbox">
                        <div id="conversation">{this.props.chatuser} {this.props.chatmsg}</div>
                    </div>
                </div>);
    }
};


const mapStateToProps = (store,ownProps) => {
    return {
        chatuser: store.chatState.chatuser,
        chatmsg: store.chatState.chatmsg,
    }
};

// const mapStateToProps = (state) => {
//     return {
//         fileList: state.fileList
//     };
// };
// module.exports = Search;
export default connect(mapStateToProps)(Chat);