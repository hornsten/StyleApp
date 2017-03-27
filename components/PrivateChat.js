
import ReactDOM from "react-dom";
import React from "react";

import PrivateChatSection from "./PrivateChatSection.js";
import Users from "./Users.js";
import InteractiveClosetPicker from "./InteractiveClosetPicker.js";
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
       chathelper.switchRoom(newroom, chattype, store);
    }
    privateChat(chatuser){
       chathelper.privateChat(chatuser, store);
    }
    ondragstart(e){
        // var imageSrc = ReactDOM.findDOMNode(this.drag)
        // console.log("img", imageSrc);
        // e.dataTransfer.setData('text/uri-list', imageSrc);
   
        // e.dataTransfer.setData('text/uri-list',   e.target.src);
        // /console.log(e.target.result, "result");
        // console.log(result);
        // e.target.src gives the url of the file but I only want the file username
        // so this should be put in the id field and grabbed from there
        e.dataTransfer.setData('text/plain-text', e.target.src );
        console.log(e.target.src, "src");
        // img.dataTransfer.setData('text/plain', 'Drag Me Button');
        this.className = 'hover'; 
        return false;
    }

    //  <div className="col-s-2 col-s-2 col-md-2">
    //                         <Users users={this.props.users} switchRoom={this.switchRoom} currentuser={this.props.username} currentroom={this.props.currentroom}/>
    // //                     </div> 
    // <div className="col-s-2 col-s-2 col-md-2">
    //                        <img id="github.png" ref={ref => this.drag = ref} className="drag" onDragStart={(e) => this.ondragstart(e)}  src="assets/img/github.png" /> Drop here
    //                          <img id="linkedin.png" ref={ref => this.drag = ref} className="drag" onDragStart={(e) => this.ondragstart(e)}  src="assets/img/linkedin.png" /> Drop here

    //                     </div> 
    render() {
        // console.log(this.props.rooms, "this.props.rooms");
        return (<div className="row">
                 
                        
                        <div className="col-xs-12 col-s-4 col-md-4">
                            <div className="row">
                                <PrivateChatSection currentroom={this.props.currentroom} username={this.props.username}/>
                            </div>
                            <div className="row">
                                <Users users={this.props.users} switchRoom={this.switchRoom} currentuser={this.props.username} currentroom={this.props.currentroom}/>
                            </div> 
                        </div>
                        <div className="col-s-12 col-s-8 col-md-8">
                            <InteractiveClosetPicker />
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


export default connect(mapStateToProps)(PrivateChat);

