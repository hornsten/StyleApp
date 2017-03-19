
import ReactDOM from "react-dom";
import React from "react";
import ChatHistory from "./ChatHistory.js";
import chathelper from "../app/utils/chathelper.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import io from 'socket.io-client'
// let socket = io(`http://localhost:8000`)
var socket = io.connect();


class Chat extends React.Component {
    constructor() {
        super();
       
        this.updatechat = this.updatechat.bind(this);
      
        socket.on('updatechat', (username, data) => {   
             console.log("socket", username, data);
            this.updatechat(username, data);
        })
    }
    componentDidMount(){
        // var chatmessage = chathelper.updatechat_listener();
        // console.log("chatmessage",chatmessage );
        // // var chatmessage = chathelper.updatechat_listener();
        // // console.log("chatmessage",chatmessage );
        // if (chatmessage.length > -1){
        //     store.dispatch({ 
        //         type: 'CHAT_USER',
        //         chatuser: chatmessage[0]
        //     },
        //     { 
        //         type: 'CHAT_MSG',
        //         chatmsg: chatmessage[1]
        //     })
        // }
  
    }

    updatechat(username, data){
        console.log("callint this udate caht function", username, data);
        store.dispatch({ 
            type: 'CHAT_USER',
            chatuser: username
        },
        { 
            type: 'CHAT_MSG',
            chatmsg: data
        })
        // return [username, data];
}

    render() {
        return (<div className="col-xs-12 col-md-12">
                    <ChatHistory />
                    <div className="chatbox">
                        <div id="conversation">TEST {this.props.chatuser} {this.props.chatmsg}</div>
                    </div>
                </div>);
    }
};



// const mapStateToProps = (state) => {
//     return {
//         fileList: state.fileList
//     };
// };
// module.exports = Search;

// this part listens for chat messages
// var chatmessage = chathelper.updatechat_listener();

// const mapStateToProps = (store,ownProps) => {
//     return {
//         chatuser: store.chatState.chatuser,
//         chatmsg: store.chatState.chatmsg,
//     }
// };

export default connect(mapStateToProps)(Chat);