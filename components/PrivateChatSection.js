
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
    // addMessage(message) {
    //     // tell server to execute 'sendchat' and send along one parameter
    //     console.log("am i getting here");
    //     chathelper.sendchat(message);
    // }
    addMessage(e, message) {
        // tell server to execute 'sendchat' and send along one paramete
        if (e.keyCode == 13) {
            chathelper.sendchat(message);
         
        
            store.dispatch({ 
                type: 'ADD_MESSAGE',
                message: ""
            })
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
    //    console.log("this.props.privatemessage", this.props.privatemessage);
       if (this.props.privatemessage){
            var alertMessage = this.props.privatemessage;
       }
       var chatmessage = this.props.chat;
       if (this.props.chat){
            var resultComponents = this.props.chat.map(function(result) {
            return <div className="row results" key={result._id}>
                <div className="col-md-2"><strong>{result.username}</strong></div> 
                <div className="col-md-8"> {result.message}</div>
                <div className="col-md-2"></div>
            </div>
            // chatdisplay = <div id="conversation"><strong>{chatmessage.username}</strong> {chatmessage.message}</div>
        });
       }
       if (this.props.currentroom === "Private"){
            var message = <div className="col-xs-12 col-md-12">You are in the <strong> {this.props.currentroom} </strong> chat area.</div>
       } else {
           var message = <div className="col-xs-12 col-md-12">You are chatting with <strong> {this.props.currentroom} </strong></div>
       }
       // only make visible if there is a connected user - for now its username but later make it connected...if (this.props.connected)
       if ( this.props.username ){
           var headerText = <div><div className="row text-center"><div className="col-xs-12 col-md-12">Welcome <strong>{this.props.username}</strong>!</div>
           </div><div className="row text-center">{message}</div></div>
            //   headerText += <div className="col-xs-6 col-md-3">You are in the {this.props.currentroom} Room</div>
            var chatDisplay = <div>
                    <div className="row">
                        <div>
                            {headerText}
                        </div>
                    </div>
                    <div className="row text-center">
                           { alertMessage }
                    </div>
                    <hr />
                    <div className="row">
                        <div>
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
                                <input type="text" value={this.props.message}  onChange={this.updateMessage}  className="form-control"  onKeyUp={(e) => this.addMessage(e, this.props.message)}  ref={input => this.textInput = input}/>
                            </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
       } else {

            var chatDisplay = <div className="text-center"> You are not logged in or there is a connection issue, please try later.</div>

       }
    
        return (<div>
                  {chatDisplay}
                </div>);
    }
};

const mapStateToProps = (store,ownProps) => {
 
    return {
        message: store.chatState.message,
        chat: store.chatState.chat,
        server: store.chatState.server,
        privatemessage: store.chatState.privatemessage,
    }
};

export default connect(mapStateToProps)(ChatSection);
// export default ChatSection;