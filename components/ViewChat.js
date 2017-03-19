
import ReactDOM from "react-dom";
import React from "react";

import ChatSection from "./ChatSection.js";
import Users from "./Users.js";
import Rooms from "./Rooms.js";
import helper from "../app/utils/helper.js";
import chathelper from "../app/utils/chathelper.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
// import io from 'socket.io-client'
// // let socket = io(`http://localhost:8000`)
// var socket = io.connect();

// import io from 'socket.io-client'
// // let socket = io(`http://localhost:8000`)
// var socket = io.connect();

class ViewChat extends React.Component {
    constructor(props) {
        super(props);

        // Functions must be bound manually with ES6 classes or Another way is to bind them inline, where you use them 
        this.handleUserData = this.handleUserData.bind(this);
        this.handleRoomData = this.handleRoomData.bind(this);
        this.switchRoom = this.switchRoom.bind(this);



    }
   componentDidMount(){
       //// need to put client side sockets in here 
        // example : http://danialk.github.io/blog/2013/06/16/reactjs-and-socket-dot-io-chat-application/
        // get data for passing to then component on load
        helper.getUserList().then((response) => {
            this.handleUserData(response)
        })  
        helper.getRoomList().then((response) => {
            this.handleRoomData(response)
        })      


        // socket.on('updatechat', ( username, data) => {   
        //     this.updatechat( username, data)
        // })
  
    }
    handleUserData(response){
        // dispatches updates to redux store to update the state 
        store.dispatch({ 
            type: 'USER_LIST',
            users: response.data
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
    // //*** put all sockets in separate helper file  ***/
    //    socket.emit('switchRoom', newroom);
       chathelper.switchRoom(newroom);
       store.dispatch({ 
            type: 'UPDATE_ROOM',
            currentroom: newroom,
        })
        // console.log("newroom");
        // emit to w4rf4

    }
    render() {
        // console.log(this.props.rooms, "this.props.rooms");
        return (<div className="row">
                        <div className="col-xs-4 col-s-2 col-md-2">
                        CHAT USER {this.props.chatuser}  {this.props.chatmsg}
                            <Rooms rooms={this.props.rooms} currentroom={this.props.currentroom} switchRoom={this.switchRoom}/>
                        </div>
                        <div className="col-xs-8 col-s-8 col-md-8">
                            <ChatSection currentroom={this.props.currentroom} username={this.props.username}/>
                            {this.props.chatuser}  {this.props.chatmsg}
                        </div>
                        <div className="col-s-2 col-s-2 col-md-2">
                            <Users users={this.props.users}/>
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

