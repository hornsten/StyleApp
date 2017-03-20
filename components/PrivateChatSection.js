
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
    addPrvtMessage(message) {
        //*** put all sockets in separate helper file  ***/
        // tell server to execute 'sendchat' and send along one parameter
        // socket.emit('sendchat', message);
        chathelper.sendprvtchat(this.props.currentroom, message);
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
       console.log("this.props.chat", this.props.chat);
    //    var chatdisplay = "";
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
       // only make visible if there is a connected user - for now its username but later make it connected...if (this.props.connected)
       if ( this.props.username ){
           var headerText = <div><div className="row text-center"><div className="col-xs-12 col-md-12"><strong>Welcome {this.props.username}!</strong></div></div><div className="row text-center"><div className="col-xs-12 col-md-12">You are in the <strong>{this.props.currentroom} </strong>Room!</div></div></div>
            //   headerText += <div className="col-xs-6 col-md-3">You are in the {this.props.currentroom} Room</div>
            var chatDislay = <div>
                    <div className="row">
                        <div>
                            {headerText}
                        </div>
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

                                <input type="text" value={this.props.message}  onChange={this.updateMessage}  className="form-control"  />
                                <button type="button" onClick={() => this.addPrvtMessage(this.props.message)}>Add Message</button>
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