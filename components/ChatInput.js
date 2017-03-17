
import ReactDOM from "react-dom";
import React from "react";

class ChatInput extends React.Component {

    render() {
        return (<div>
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <input id="data" />
                        <input type="button" id="datasend" value="send" />
                    </div>
                    <div className="col-md-2"></div>
                </div>);
    }
};

export default ChatInput;