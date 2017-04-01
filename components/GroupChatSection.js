import ReactDOM from "react-dom";
import React from "react";
import {connect} from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
import io from 'socket.io-client';

var socket = io.connect();

class GroupChatSection extends React.Component {
    constructor(props) {
        super(props);

        chathelper.updatechat_listener(store);
        chathelper.connected_users(store, "group");

    }
    addMessage(e, message) {
        // tell server to execute 'sendchat' and send along one paramete
        if (e.keyCode == 13) {
            chathelper.sendchat(message);
            store.dispatch({type: 'ADD_MESSAGE', message: ""})
        }
    }
    uploadFile(e) {
        chathelper.file_upload(e, "upload");
    }
    updateMessage(e) {
        store.dispatch({type: 'ADD_MESSAGE', message: e.target.value})

    }
    componentDidUpdate() {
        var node = ReactDOM.findDOMNode(this.chat);
        node.scrollTop = node.scrollHeight;
    }
    componentDidMount() {
        this
            .textInput
            .focus();
        store.dispatch({type: 'PRIVATE_MODAL', showModal: false})
        store.dispatch({type: 'PRIVATE_MESSAGE', privatemessage: ""})

        var node = ReactDOM.findDOMNode(this.chat);

        node.scrollTop = node.scrollHeight;

    }

    ondragover(e) {
        this.className = 'hover';
        e.preventDefault && e.preventDefault();
        return false;
    };
    ondragend(e) {
        this.className = '';
        return false;
    };
    ondrop(e) {
        this.className = 'success';
        e.preventDefault && e.preventDefault();
        chathelper.file_upload(e, "dnd");
        return false;
    };
   
    render() {
        var style = {
            width: '100px',
            height: '100px'
        };

        var chatmessage = this.props.chat;
        var component = this;
        if (this.props.chat) {
            if (this.props.chat.length !== 0) {
                var resultComponents = this
                    .props
                    .chat
                    .map(function (result) {
                        if (result.type === "file") {
                            var chatmessage = <img src={result.message} alt="File Not Found" height="150" width="150"/>
                        } else if (result.type === "text") {
                            var chatmessage = <div>{result.message}</div>
                        }

                        var d = new Date(result.created_at);
                        var chiDate = new Date(d.setHours(d.getHours())).toString();
                        var dateObj = new Date(chiDate);
                        var month = dateObj.getUTCMonth() + 1; //months from 1-12
                        var day = dateObj.getUTCDate();
                        var year = dateObj.getUTCFullYear();
                        var hour = dateObj.getHours();
                        var minutes = dateObj.getMinutes();

                        var newdate = month + "/" + day + "/" + year + " " + hour + ":" + minutes;

                        var userChat = "";
                        // for chat bubbles
                        if (result.username === component.props.username){

                                userChat =  <div className="talk-bubble tri-left round btm-left-in">
                            <div className="row">
                                <p className="chat-stuff"><strong>{result.username}</strong> @ {newdate} </p>
                            </div>
                            <div className="row">
                                { chatmessage }
                            </div>
                        </div>

                        } else {
                                userChat =  <div className="talk-bubble tri-right round btm-right-in">
                            <div className="row">
                                <p className="chat-stuff"><strong>{result.username}</strong> @ {newdate} </p>
                            </div>
                            <div className="row">
                                { chatmessage }
                            </div>
                        </div>
                        }





                        return <div>
                            <div className="row results talk-bubble tri-right round btm-left" key={result._id}>

                                <div className="col-md-12">
                                        {userChat}
                                </div>
                            </div>

                        </div>
                    });
            }
        }

        if (this.props.username) {
            var headerText = <div>
                <div className="row text-center">
                    <div className="col-xs-12 col-md-12">
                        <strong>Welcome {this.props.username}!</strong>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="col-xs-12 col-md-12">You are in the
                        <strong>{this.props.currentroom}
                        </strong>Room!</div>
                </div>
            </div>

            var chatDislay = <div>
                <div className="row">
                    <div>
                        {headerText}
                    </div>
                </div>

                <hr/>

                <div className="chatbox row" ref={ref => this.chat = ref}>
                    <div className="col-xs-12 col-md-12">
                        <div className="row">{resultComponents}</div>
                        <div></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">

                
                        <div id='drop-box'>
                            <div
                                ref={ref => this.drop = ref}
                                className="drop"
                                onDrop={(e) => this.ondrop(e)}
                                onDragEnd={(e) => this.ondragend(e).bind(this)}
                                onDragOver={(e) => this.ondragover(e)}>Drop Image Here</div>
                            <p>or</p>
                            <input
                                type="file"
                                id="siofu_input"
                                label='Upload'
                                accept='.png'
                                name="file"
                                ref="file"
                                defaultValue={this.props.file}
                                onChange={this.uploadFile}/><br/>

                                    <input
                            type="text"
                            value={this.props.message}
                            onChange={this.updateMessage}
                            className="form-control"
                            onKeyUp={(e) => this.addMessage(e, this.props.message)}
                            onDrop={this.uploadFile}
                            ref={input => this.textInput = input}/>
                        </div>

                    </div>
           
            </div>
            </div>
        } else {

            var chatDislay = <div className="text-center">Apologies but there is currently no chat connection
                available. Please try again later.</div>

        }

        return (
            <div>

                {chatDislay}

            </div>
        );
    }
};

const mapStateToProps = (store, ownProps) => {

    return {
        message: store.chatState.message,
        file: store.chatState.file,
        chat: store.chatState.chat,
        server: store.chatState.server,
        privatemessage: store.chatState.privatemessage,
        chatWithUser: store.chatState.chatWithUser,
        showModal: store.chatState.showModal,
        privateChatWaiting: store.chatState.privateChatWaiting
    }

};

export default connect(mapStateToProps)(GroupChatSection);
// export default ChatSection;