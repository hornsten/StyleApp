
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


class ChatSection extends React.Component {
    constructor(props) {
        super(props);

        // this.updatechat = this.updatechat.bind(this);
        chathelper.updatechat_listener(store);
        chathelper.connected_users(store);
        chathelper.server_messages(store);
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
        // tell server to execute 'sendchat' and send along one paramete
        chathelper.sendchat(message);
    }
    updateMessage(e){
        store.dispatch({ 
            type: 'ADD_MESSAGE',
            message: e.target.value
        })

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
                    <hr />
                    <div className="row">
                        <div>
                            Server Messages here - maybe a banner or a popup?
                            {this.props.server}
                        </div>
                    </div>

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

                                <input type="text" value={this.props.message}  onChange={this.updateMessage}  className="form-control"  />
                                <button type="button" onClick={() => this.addMessage(this.props.message)}>Add Message</button>
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
    }
};

export default connect(mapStateToProps)(ChatSection);
// export default ChatSection;