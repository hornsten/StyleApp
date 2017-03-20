
import ReactDOM from "react-dom";
import React from "react";


class RoomList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var component = this;
         var currentroom = this.props.currentroom;
        if (this.props.rooms){
                var room = ""; // to be set as a prp this.props.currentroom
                var currentroom = this.props.currentroom;
                var resultComponents = this.props.rooms.map(function(result) {
                // dont hyperlink current room
                if (result.room === currentroom) {
                    room = result.room;
                } else {
                    // hyperlink not dsipalying properlyx
                    room = <div className="room-list-other" onClick={() => component.props.switchRoom(result.room)}> {result.room} </div>
                    console.log(room);
            }
                return <div className="row results" key={result._id}>
                    <div className="col-md-4 text-center">{room}</div>
                </div>
            })
        }
       
// <a href="/chat/{{resultComponents}}" onclick="switchRoom(\'{resultComponents}\')"> {resultComponents} </a><
        return (<div>
                    <div className="col-sm-12">
                        <div className="row results">{resultComponents}</div>
                    </div>  
                </div>) 
            }
};

export default RoomList;