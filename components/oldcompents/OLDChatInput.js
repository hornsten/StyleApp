
import ReactDOM from "react-dom";
import React from "react";
// import io from 'socket.io-client';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
// var socket = io.connect();
import chathelper from "../app/utils/chathelper.js";

class ChatInput extends React.Component {
    constructor(props) {
        super(props);

        this.updateMessage = this.updateMessage.bind(this);
        this.addMessage = this.addMessage.bind(this);
    }

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
        return (
            <div>

                </div>);
    }
};


const mapStateToProps = (store,ownProps) => {
    return {
        message: store.chatState.message,
        chatuser: store.chatState.chatuser,
        chatmsg: store.chatState.chatmsg,

    }
};

export default connect(mapStateToProps)(ChatInput);

		

	