
import ReactDOM from "react-dom";
import React from "react";
import Chat from "./Chat.js";
import CurrentUserAndRoom from "./CurrentUserAndRoom.js";
import ChatInput from "./ChatInput.js";


class ChatSection extends React.Component {

    render() {
        return (<div>
                    <div className="row">
                        <CurrentUserAndRoom />
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