
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
                                <div id="conversation">YSER {this.props.chatuser}</div>
                                <div >MSG  {this.props.chatmsg}</div>
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
    return {
        message: store.chatState.message,
       
        chatmsg: store.chatState.chatmsg,
         chatuser: store.chatState.chatuser
    }
};

export default connect(mapStateToProps)(ChatSection);
// export default ChatSection;