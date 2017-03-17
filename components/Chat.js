
import ReactDOM from "react-dom";
import React from "react";
import ChatHistory from "./ChatHistory.js";

class Chat extends React.Component {

    render() {
        return (<div className="col-xs-12 col-md-12">
                    <ChatHistory />
                    <div className="chatbox">
                        <div id="conversation"></div>
                    </div>
                </div>);
    }
};

export default Chat;