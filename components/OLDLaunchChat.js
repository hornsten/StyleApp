
import ReactDOM from "react-dom";
import React from "react";

class LaunchChat extends React.Component {

    render() {
        return (<div className="row text-center" id="usernameinput">
                    <div className="col-md-12">
                    <strong>USERNAME</strong>
                    <input id="username" />
                    <input type="button" id="datasend" value="send" />
                    </div>
                </div>);
    }
};

export default LaunchChat;