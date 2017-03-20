
import ReactDOM from "react-dom";
import React from "react";
import { Link } from 'react-router';
import LaunchChat from "./LaunchChat.js";
import GroupChat from "./GroupChat.js";
import PrivateChat from "./PrivateChat.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";



// notes the below structure replaced by {this.props.children}
// <div className="container">
        // <LaunchChat />
        // <ViewChat />
//  </div>
class ChatMain extends React.Component {    
    constructor(props) {
        super(props);

        // Functions must be bound manually with ES6 classes or Another way is to bind them inline, where you use them 
        // this.handleUserData = this.handleUserData.bind(this);
        this.handleClick = this.handleClick.bind(this);
      

    }
    handleClick() {
        // dispatches updates to redux store to update the state 
        //*** put all sockets in separate helper file  ***/
        // socket.emit('adduser', username);
        chathelper.startchat(this.props.username, store);
    }
// <li><Link to={`/chat/view`} activeClassName="active">Launch Chat</Link></li>
    render() {
        // var chatType = "";
        // if (this.props.chatselected === "Group"){
        //         chatType = <GroupChat />
            

        // } else if (this.props.chatselected === "Private"){
        //        chatType =  <PrivateChat />

        // } else {
        //        chatType =  <div></div>
        // }
        
        return (<div className="container">
                    <div>
                    <ul>
                        <li><Link to='/group' onClick={this.handleClick.bind(this)}>Group Chat</Link></li>
                        <li><Link to='/private' onClick={this.handleClick.bind(this)}>Private Chat</Link></li>
                    </ul>
                    </div>
                    <LaunchChat />
                    {this.props.children}
                    
                </div>);
    }
};

const mapStateToProps = (store,ownProps) => {

    return {
        username: store.chatState.username,

    }
};

export default connect(mapStateToProps)(ChatMain);