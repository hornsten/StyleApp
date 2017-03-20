
import ReactDOM from "react-dom";
import React from "react";

import ChatSection from "./ChatSection.js";
import Users from "./Users.js";
import Rooms from "./Rooms.js";
import helper from "../app/utils/helper.js";
import chathelper from "../app/utils/chathelper.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';

class ViewChat extends React.Component {
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
    switchRoom(newroom){
       chathelper.switchRoom(newroom, store);
    }
    privateChat(chatuser){
       chathelper.privateChat(chatuser, store);
    }
    render() {
        // console.log(this.props.rooms, "this.props.rooms");
        return (<div className="row">
                        <div className="col-xs-4 col-s-2 col-md-2">
                            <Rooms rooms={this.props.rooms} currentroom={this.props.currentroom} switchRoom={this.switchRoom}/>
                        </div>
                        <div className="col-xs-8 col-s-8 col-md-8">
                            <ChatSection currentroom={this.props.currentroom} username={this.props.username}/>
                        </div>
                        <div className="col-s-2 col-s-2 col-md-2">
                            <Users users={this.props.users} privateChat={this.privateChat}/>
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


export default connect(mapStateToProps)(ViewChat);

