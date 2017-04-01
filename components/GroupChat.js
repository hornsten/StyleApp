
import ReactDOM from "react-dom";
import React from "react";
import ChatModal from  './ChatModal';
import GroupChatSection from "./GroupChatSection.js";
import NonActiveUserList from "./NonActiveUserList.js";
import Rooms from "./Rooms.js";
import helper from "../app/utils/helper.js";
import chathelper from "../app/utils/chathelper.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import {Modal, Dialog, Button} from 'react-bootstrap';
import ClosetItems from "./ClosetItems.js";

class GroupChat extends React.Component {
    constructor(props) {
        super(props);

        chathelper.switchRoom(this.props.params.room, "Group", store);

    }

    privateChat(chatuser){
       chathelper.privateChat(chatuser, store);
    }


    ondragstart(e){
    
        // e.target.src gives the url of the file but I only want the file username
        // so this should be put in the id field and grabbed from there
        e.dataTransfer.setData('text/plain-text', e.target.src );

        this.className = 'hover'; 
        return false;
    }

    render() {
    
        return (<div className="row">
                         <ChatModal />
                        <div className="col-xs-8 col-s-6 col-md-6">
                            <GroupChatSection currentroom={this.props.currentroom} username={this.props.username}/>
                        </div>
                        <ClosetItems/>
                        <div className="user-list">
                            <strong>Connected Stylistas</strong>
                            <NonActiveUserList users={this.props.users} />
                                    
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

