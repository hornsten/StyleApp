
import ReactDOM from "react-dom";
import React from "react";
import Chat from "./Chat.js";
import CurrentUserAndRoom from "./CurrentUserAndRoom.js";
import ChatInput from "./ChatInput.js";


class ChatSection extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
                    <div className="row">
                        <CurrentUserAndRoom currentroom={this.props.currentroom} username={this.props.username}/>
                    </div>
                    <hr />
                    <div className="row">
                        <Chat />
                    </div>
                    <div className="row">
                        <ChatInput />
                    </div>
                </div>);
    }
};

export default ChatSection;