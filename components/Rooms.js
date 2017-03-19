
import ReactDOM from "react-dom";
import React from "react";
import RoomList from "./RoomList.js";

class Rooms extends React.Component {

    render() {
        return (<div className="room-list">
                    <strong>ROOMS</strong>
                    <RoomList rooms={this.props.rooms} currentroom={this.props.currentroom} switchRoom={this.props.switchRoom} />
                    <div id="rooms"></div>
                </div>);
    }
};

export default Rooms;