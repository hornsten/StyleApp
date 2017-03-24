
import ReactDOM from "react-dom";
import React from "react";

import GroupChatSection from "./GroupChatSection.js";
import Users from "./Users.js";
import Rooms from "./Rooms.js";
import helper from "../app/utils/helper.js";
import chathelper from "../app/utils/chathelper.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import ClosetItems from "./ClosetItems.js";

class GroupChat extends React.Component {
    constructor(props) {
        super(props);

        // Functions must be bound manually with ES6 classes or Another way is to bind them inline, where you use them 
        // this.handleUserData = this.handleUserData.bind(this);
        this.handleRoomData = this.handleRoomData.bind(this);
        this.switchRoom = this.switchRoom.bind(this);

    }
   componentDidMount(){
        helper.getRoomList().then((response) => {
            this.handleRoomData(response)
        })      
    }

    handleRoomData(response){
        // dispatches updates to redux store to update the state 
        store.dispatch({ 
            type: 'ROOM_LIST',
            rooms: response.data
        })
    }
    switchRoom(newroom, chattype){
       chathelper.switchRoom(newroom, chattype, store);
    }
    privateChat(chatuser){
       chathelper.privateChat(chatuser, store);
    }
    dragStart(event){
//         event.preventDefault();
//         // e.dataTransfer.setData('file'); 
//         var files = event.dataTransfer.files;
//         console.log(files);
// //   var file = event.dataTransfer.mozGetDataAt("application/x-moz-file", 0);
//   console.log(file);
//   // dt.mozSetDataAt("image/png", stream, 0);
// dt.mozSetDataAt("application/x-moz-file", file, 0);
// // dt.setData("text/uri-list", imageurl);
// dt.setData("text/plain", imageurl);

    }
    render() {
    
        return (<div className="row">
                        <div className="col-xs-4 col-s-2 col-md-2">
                            <Rooms rooms={this.props.rooms} currentroom={this.props.currentroom} switchRoom={this.switchRoom}/>
                        </div>
                        <div className="col-xs-8 col-s-6 col-md-6">
                            <GroupChatSection currentroom={this.props.currentroom} username={this.props.username}/>
                        </div>
                        <div className="col-s-2 col-s-4 col-md-4">
                            <img src="assets/img/github.png"  />
                        </div> 
                    </div>);
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


export default connect(mapStateToProps)(GroupChat);

