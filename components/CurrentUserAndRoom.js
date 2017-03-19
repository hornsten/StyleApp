
import ReactDOM from "react-dom";
import React from "react";

class CurrentUserAndRoom extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
                <div className="col-md-3"></div>
                <div className="col-xs-6 col-md-3"><div id="current-room"><strong>Current Room</strong>{this.props.currentroom}</div></div>
                <div className="col-xs-6 col-md-3"><div id="current-user"><strong>Current User</strong>{this.props.username}</div></div>
                <div className="col-md-3"></div>
                </div>);
    }
};

export default CurrentUserAndRoom;