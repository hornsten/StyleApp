
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

        // Functions must be bound manually with ES6 classes or Another way is to bind them inline, where you use them 
        // this.handleUserData = this.handleUserData.bind(this);
        // this.handleRoomData = this.handleRoomData.bind(this);
        chathelper.switchRoom(this.props.params.room, "Group", store);
        // this.switchRoom = this.switchRoom.bind();

        // this.ondragstart = this.ondragstart.bind(this);

    }
//    componentDidMount(){
//         helper.getRoomList().then((response) => {
//             this.handleRoomData(response)
//         })   
//             // var img = window.refs.dragimg.sgetDOMNode().src;
//             var img = this.refs.drag;
//             // console.log("img", img);
           
           
           
            
//             // doc.allowDrop = function(event) {
//             //    console.log(event, "allowDrop");
//             //     event.preventDefault();
//             // }
           

        
//     }

//     handleRoomData(response){
//         // dispatches updates to redux store to update the state 
//         store.dispatch({ 
//             type: 'ROOM_LIST',
//             rooms: response.data
//         })
//     }
    // switchRoom(newroom, chattype){
    //    chathelper.switchRoom(newroom, chattype, store);
    // }
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
        // console.log(e.target.src, "src");
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

