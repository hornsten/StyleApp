
import ReactDOM from "react-dom";
import React from "react";
import helper from "../app/utils/helper.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import {Link} from 'react-router';
import {Well} from 'react-bootstrap';

class RoomSummary extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        helper.getRoomList().then((response) => {
            console.log(response, "response")
            this.handleRoomData(response)
        })   
            // var img = window.refs.dragimg.sgetDOMNode().src;
            var img = this.refs.drag;
            // console.log("img", img);
           
           
           
            
            // doc.allowDrop = function(event) {
            //    console.log(event, "allowDrop");
            //     event.preventDefault();
            // }
           

        
    }

    handleRoomData(response){
        // dispatches updates to redux store to update the state 
        store.dispatch({ 
            type: 'ROOM_LIST',
            rooms: response.data
        })
        console.log(this.props.rooms);
    }
    render() {
var component = this;

     
        if (this.props.rooms){
                var room = ""; // to be set as a prp this.props.currentroom
                
                var resultComponents = this.props.rooms.map(function(result) {

                  room = <div className="row">
                    
                    <div className="col-md-2 text-center">
                           <img src={result.image} className='group-img'/>
                           <Link to={`/group/${result.room}`}>Enter Room</Link>
                    </div>
                    <div className="col-md-8 text-left">
                        <div className="row group-header">
                            <div><strong>{result.room} </strong></div>
                        </div>
                        <div className="row group-body">{result.description} </div>
                    </div>
                    <div className="col-md-2  text-center"></div>
                    </div>

                return <Well  key={result._id}>
                    <div className="text-center">{room}</div>
              </Well>
            })
        }
       
        return (<div>
                   <div className="col-md-12">
                        <div className="row results">{resultComponents}</div>
                    </div>
                </div>) 
            }

};

const mapStateToProps = (store,ownProps) => {
    return {
        users: store.chatState.users,
        rooms: store.chatState.rooms,
        currentroom: store.chatState.currentroom,
        username: store.userState.username,

    }
};


export default connect(mapStateToProps)(RoomSummary);