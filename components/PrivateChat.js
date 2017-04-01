
import ReactDOM from "react-dom";
import React from "react";
import {Modal, Dialog, Button} from 'react-bootstrap';
import PrivateChatSection from "./PrivateChatSection.js";
import Users from "./Users.js";
import InteractiveClosetPicker from "./InteractiveClosetPicker.js";
import Rooms from "./Rooms.js";
import helper from "../app/utils/helper.js";
import chathelper from "../app/utils/chathelper.js";
import ChatModal from  './ChatModal';
import {connect } from 'react-redux';
import store from './Redux/redux.js';


class PrivateChat extends React.Component {
    constructor(props) {
        super(props);

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
      
       // reset noticification if user clicks on this private chat
        if (newroom === this.props.privateChatWaiting){
                // reset this prop
                store.dispatch({ 
                    type: 'PRIVATE_CHAT_WAITING',
                    privateChatWaiting: ""
                })
        }   
       chathelper.switchRoom(newroom, chattype, store);
     
  
    }

    ondragstart(e){

        // e.target.src gives the url of the file but I only want the file username
        // so this should be put in the id field and grabbed from there
        e.dataTransfer.setData('text/plain-text', e.target.src );

        this.className = 'hover'; 
        return false;
    }


    render() {
      
        return (<div className= "row">
                 
                        <div className="col-xs-12 col-s-4 col-md-4">
                            <div className="border row">
                                <PrivateChatSection currentroom={this.props.currentroom} username={this.props.username}/>
                            </div>
                            <div className="border row">
                                <Users users={this.props.users} switchRoom={this.switchRoom} currentuser={this.props.username} currentroom={this.props.currentroom} chatWithUser={this.props.chatWithUser}/>
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
        chatWithUser: store.chatState.chatWithUser,
        privateChatWaiting: store.chatState.privateChatWaiting,
        

    }
};


export default connect(mapStateToProps)(PrivateChat);

