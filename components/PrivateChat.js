
import ReactDOM from "react-dom";
import React from "react";

import PrivateChatSection from "./PrivateChatSection.js";
import Users from "./Users.js";
import Rooms from "./Rooms.js";
import helper from "../app/utils/helper.js";
import chathelper from "../app/utils/chathelper.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';

class PrivateChat extends React.Component {
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
        console.log("in provate switch room");
       chathelper.switchRoom(newroom, chattype, store);
    }
    privateChat(chatuser){
       chathelper.privateChat(chatuser, store);
    }
    render() {
        // console.log(this.props.rooms, "this.props.rooms");
        return (<div className="row">
                         <div className="col-s-2 col-s-2 col-md-2">
                            <Users users={this.props.users} switchRoom={this.switchRoom} currentuser={this.props.username} currentroom={this.props.currentroom}/>
                        </div> 
                        <div className="col-xs-8 col-s-8 col-md-8">
                            <PrivateChatSection currentroom={this.props.currentroom} username={this.props.username}/>
                        </div>
                        <div className="col-xs-4 col-s-2 col-md-2">
                            <Rooms rooms={this.props.rooms} switchRoom={this.switchRoom} currentroom={this.props.currentroom} />
                        </div>
                    </div>);
        }
    };

const mapStateToProps = (store,ownProps) => {
    return {
        users: store.chatState.users,
        rooms: store.chatState.rooms,
        currentroom: store.chatState.currentroom,
        username: store.chatState.username,

    }
};


export default connect(mapStateToProps)(PrivateChat);

