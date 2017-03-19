
import ReactDOM from "react-dom";
import React from "react";
// import Chat from "./Chat.js";
import CurrentUserAndRoom from "./CurrentUserAndRoom.js";
// import ChatInput from "./ChatInput.js";
// import ChatHistory from "./ChatHistory.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
import io from 'socket.io-client'
// let socket = io(`http://localhost:8000`)
var socket = io.connect();


class ChatSection extends React.Component {
    constructor(props) {
        super(props);

        // this.updatechat = this.updatechat.bind(this);
        chathelper.updatechat_listener(store);
        chathelper.connected_users(store);
        // socket.on('updatechat', (username, data) => {   
        //      console.log("socket", username, data);
        //     this.updatechat(username, data);
        // })
    }
    // updatechat(username, data){
    //         console.log("callint this udate caht function", username, data);
    //         store.dispatch({ 
    //             type: 'CHAT_USER',
    //             chatuser: username
    //         },
    //         { 
    //             type: 'CHAT_MSG',
    //             chatmsg: data
    //         })
    // }
    addMessage(message) {
        //*** put all sockets in separate helper file  ***/
        // tell server to execute 'sendchat' and send along one parameter
        // socket.emit('sendchat', message);
        chathelper.sendchat(message);
    }
    updateMessage(e){
        store.dispatch({ 
            type: 'ADD_MESSAGE',
            message: e.target.value
        })

    }
    render() {

        // var component = this;
        // if (this.props.chat){
        //         var room = ""; // to be set as a prp this.props.currentroom
        //         var currentroom = this.props.currentroom;
        //         var resultComponents = this.props.rooms.map(function(result) {
        //         // dont hyperlink current room
        //         if (result.room === currentroom) {
        //             room = result.room;
        //         } else {
        //             // hyperlink not dsipalying properlyx
        //             room = <div className="room-list-other" onClick={() => component.props.switchRoom(result.room)}> {result.room} </div>
        //             console.log(room);
        //     }
        //         return <div className="row results" key={result._id}>
        //             <div className="col-md-4 text-center">{room}</div>
        //         </div>
        //     })
        // }
       var chatmessage = this.props.chat;
       var chatdisplay = "";
       if (this.props.chat){
            chatdisplay = <div id="conversation"><strong>{chatmessage.username}</strong> {chatmessage.message}</div>
       }
    
        return (<div>
                    <div className="row">
                        <CurrentUserAndRoom currentroom={this.props.currentroom} username={this.props.username}/>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col-xs-12 col-md-12">
                            History Goes in here -- update when message added
                            <div className="chatbox">
                             need to append data
                                {chatdisplay}
                                <div ></div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2"></div>
                            <div className="col-md-8">

                                <input type="text" value={this.props.message}  onChange={this.updateMessage}  className="form-control"  />
                                <button type="button" onClick={() => this.addMessage(this.props.message)}>Add Message</button>
                            </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>);
    }
};

const mapStateToProps = (store,ownProps) => {
    console.log("message",store.chatState.message);
    console.log("chat", store.chatState.chat);
    return {
        message: store.chatState.message,
        chat: store.chatState.chat,
    }
};

export default connect(mapStateToProps)(ChatSection);
// export default ChatSection;