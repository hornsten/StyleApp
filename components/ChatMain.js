import ReactDOM from "react-dom";
import React from "react";
import { Link } from 'react-router';
import LaunchChat from "./LaunchChat.js";
import GroupChat from "./GroupChat.js";
import PrivateChat from "./PrivateChat.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";

class ChatMain extends React.Component {    
    constructor(props) {
        super(props);
        // Functions must be bound manually with ES6 classes or Another way is to bind them inline, where you use them 
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handlePrvtClick = this.handlePrvtClick.bind(this);
        chathelper.handle_connection(store, this.props.username);
    }
    handleGroupClick() {
        // dispatches updates to redux store to update the state 
        if (this.props.username){
             chathelper.startchat(this.props.username, store);
        }
    }
    handlePrvtClick() {
        // dispatches updates to redux store to update the state 
        if (this.props.username){
            chathelper.startprvtchat(this.props.username, store);
        }
    }
    render() {
        return (<div className="container">
                    <div>
                    <ul>
                        <li><Link to='/group' onClick={this.handleGroupClick.bind(this)}>Group Chat</Link></li>
                        <li><Link to='/private' onClick={this.handlePrvtClick.bind(this)}>Private Chat</Link></li>
                    </ul>
                    </div>
                    {this.props.children}
                    
                </div>);
    }
};

const mapStateToProps = (store,ownProps) => {
    
    return {
        username: store.userState.username,
        connected: store.chatState.connected,
    }
};

export default connect(mapStateToProps)(ChatMain);