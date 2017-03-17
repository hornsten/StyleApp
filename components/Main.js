
import ReactDOM from "react-dom";
import React from "react";
import { Link } from 'react-router';
// import LaunchChat from "./LaunchChat.js";
import ViewChat from "./ViewChat.js";


// notes the below structure replaced by {this.props.children}
// <div className="container">
        // <LaunchChat />
        // <ViewChat />
//  </div>
class Main extends React.Component {

    render() {
        return (<div className="container">
                    <ul>
                        <li><Link to={`/chat/view`} activeClassName="active">Launch Chat</Link></li>
                    </ul>
                </div>);
    }
};

export default Main;