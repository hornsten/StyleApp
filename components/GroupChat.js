
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
        // this.ondragstart = this.ondragstart.bind(this);

    }
   componentDidMount(){
        helper.getRoomList().then((response) => {
            this.handleRoomData(response)
        })   
            // var img = window.refs.dragimg.sgetDOMNode().src;
            var img = this.refs.drag;
            console.log("img", img);
           
           
           
            
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
        e.dataTransfer.setData('text/plain-text',e.target.id );
        console.log(e.target.id, "id");
        // img.dataTransfer.setData('text/plain', 'Drag Me Button');
        this.className = 'hover'; 
        return false;
    }
    // ondragover(e) { this.className = 'hover'; return false; };
//     ondragend(e) { this.className = '';  console.log("dragedn", e); return false; };
// //     ondrop(e) {
// //             console.log(" is this being called ondrop");
// //             this.className = 'success';
// //             e.preventDefault && e.preventDefault();
// //             this.className = '';

// //             // now do something with:
// //             var files = e.dataTransfer.files;

// //             // process all File objects
// //             // for (var i = 0, file; file = files[i]; i++) {
// //                 console.log( files, "files");
// //             // }

           

// //             return false;
// };


    render() {
    
        return (<div className="row">
                        <div className="col-xs-4 col-s-2 col-md-2">
                            <Rooms rooms={this.props.rooms} currentroom={this.props.currentroom} switchRoom={this.switchRoom}/>
                        </div>
                        <div className="col-xs-8 col-s-6 col-md-6">
                            <GroupChatSection currentroom={this.props.currentroom} username={this.props.username}/>
                        </div>
                        <div className="col-s-2 col-s-4 col-md-4">
                             <img id="github.png" ref={ref => this.drag = ref} className="drag" onDragStart={(e) => this.ondragstart(e)}  src="assets/img/github.png" /> Drop here
                                <img id="linkedin.png" ref={ref => this.drag = ref} className="drag" onDragStart={(e) => this.ondragstart(e)}  src="assets/img/linkedin.png" /> Drop here

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

