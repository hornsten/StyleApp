
import ReactDOM from "react-dom";
import React from "react";
import { Link } from 'react-router';
import LaunchChat from "./LaunchChat.js";
import ViewChat from "./ViewChat.js";


// notes the below structure replaced by {this.props.children}
// <div className="container">
        // <LaunchChat />
        // <ViewChat />
//  </div>
class ChatMain extends React.Component {
// <li><Link to={`/chat/view`} activeClassName="active">Launch Chat</Link></li>
    render() {
        return (<div className="container">
                
                    <LaunchChat />
                    <ViewChat />
                    
                </div>);
    }
};

export default ChatMain;