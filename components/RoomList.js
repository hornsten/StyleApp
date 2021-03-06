
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';


class RoomList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var component = this;
        
        if (this.props.rooms){
                var room = ""; // to be set as a prp this.props.currentroom
                var currentroom = this.props.currentroom;
                var resultComponents = this.props.rooms.map(function(result) {
                // dont hyperlink current room
                if (result.room === currentroom) {
                    room = result.room;
                } else {
                    // hyperlink not dsipalying properlyx
                    room = <div className="room-list-other" onClick={() => component.props.switchRoom(result.room, "Group")}> {result.room} </div>

            }
                return <div className="row results" key={result._id}>
                    <div className="col-md-4 text-center">{room}</div>
                </div>
            })
        }
       
        return (<div>
                    <div className="col-sm-12">
                        <div className="row results">{resultComponents}</div>
                    </div>  
                </div>) 
            }
};

export default RoomList;