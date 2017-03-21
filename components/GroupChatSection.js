
import ReactDOM from "react-dom";
import React from "react";
// // import Chat from "./Chat.js";
// import CurrentUserAndRoom from "./CurrentUserAndRoom.js";
// import ChatInput from "./ChatInput.js";
// import ChatHistory from "./ChatHistory.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
import io from 'socket.io-client'
// let socket = io(`http://localhost:8000`)
var socket = io.connect();


class GroupChatSection extends React.Component {
    constructor(props) {
        super(props);

        chathelper.updatechat_listener(store);
        chathelper.connected_users(store);
        chathelper.server_messages(store);
        chathelper.private_message(store);

    }
    addMessage(e, message) {
        // tell server to execute 'sendchat' and send along one paramete
        if (e.keyCode == 13) {
            chathelper.sendchat(message);
        }
    }
    updateMessage(e){
        store.dispatch({ 
            type: 'ADD_MESSAGE',
            message: e.target.value
        })

    }
    componentDidMount() {
        this.textInput.focus();
    }
    render() {

       var chatmessage = this.props.chat;
       if (this.props.chat){
           if (this.props.chat.length !== 0){
                var resultComponents = this.props.chat.map(function(result) {
                return <div className="row results" key={result._id}>
                    <div className="col-md-2"><strong>{result.username}</strong></div> 
                    <div className="col-md-8"> {result.message}</div>
                    <div className="col-md-2"></div>
                </div>
                });

           }

       }
       // only make visible if there is a connected user - for now its username but later make it connected...if (this.props.connected)
       if ( this.props.username ){
           var headerText = <div><div className="row text-center"><div className="col-xs-12 col-md-12"><strong>Welcome {this.props.username}!</strong></div></div><div className="row text-center"><div className="col-xs-12 col-md-12">You are in the <strong>{this.props.currentroom} </strong>Room!</div></div></div>

            var chatDislay = <div>
                    <div className="row">
                        <div>
                            {headerText}
                        </div>
                    </div>
                    <div className="row text-center">
                            Server Messages here - maybe a banner or a popup?
                            {this.props.privatemessage}
                    </div>
                    <hr />
             

                    <div className="chatbox row">
                        <div className="col-xs-12 col-md-12">    
                            <div className="row">{resultComponents}</div>                     
                        <div>
                    </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2"></div>
                            <div className="col-md-8">

                                <input type="text" value={this.props.message}  onChange={this.updateMessage}  className="form-control"   onKeyUp={(e) => this.addMessage(e, this.props.message)}  ref={input => this.textInput = input} />
    
                            </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
       } else {

            var chatDislay = <div className="text-center">Apologies but there is currently no chat connection available. Please try again later.</div>

       }
    
        return (<div>
                  {chatDislay}
                </div>);
    }
};

const mapStateToProps = (store,ownProps) => {
    console.log("message",store.chatState.message);
    console.log("chat", store.chatState.chat);
    return {
        message: store.chatState.message,
        chat: store.chatState.chat,
        server: store.chatState.server,
        privatemessage: store.chatState.privatemessage,
    }

};

export default connect(mapStateToProps)(GroupChatSection);
// export default ChatSection;