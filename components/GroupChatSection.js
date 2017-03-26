
import ReactDOM from "react-dom";
import React from "react";
// // import Chat from "./Chat.js";
// import CurrentUserAndRoom from "./CurrentUserAndRoom.js";
// import ChatInput from "./ChatInput.js";
// import ChatHistory from "./ChatHistory.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
import io from 'socket.io-client';

import {Modal, Dialog, Button} from 'react-bootstrap';
// var fs = require('fs');
// var cloudinary = require('cloudinary');
// var cloudinary_keys = require('./auth/cloudinary_keys');
// cloudinary.config(cloudinary_keys);



// let socket = io(`http://localhost:8000`)
var socket = io.connect();


class GroupChatSection extends React.Component {
    constructor(props) {
        super(props);

        chathelper.updatechat_listener(store);
        chathelper.connected_users(store);
        chathelper.server_messages(store);
        chathelper.private_message(store);

    }
    addMessage(e, message) {
        // tell server to execute 'sendchat' and send along one paramete
        if (e.keyCode == 13) {
            chathelper.sendchat(message);
            store.dispatch({ 
                type: 'ADD_MESSAGE',
                message: ""
            })
        }
    }
    uploadFile(e) {
        // tell server to execute 'sendchat' and send along one paramete
        // if (e.keyCode == 13) {
        //     chathelper.sendchat(message);
        //     store.dispatch({ 
        //         type: 'ADD_MESSAGE',
        //         message: ""
        //     })
        // }
        console.log("calling this$$$", e.target.value);
       
  

        // var uploadelem = this.fileInput.files;
        // console.log("uploadelem", uploadelem);
        chathelper.file_upload(e, "upload");
        
    }
    updateMessage(e){
        store.dispatch({ 
            type: 'ADD_MESSAGE',
            message: e.target.value
        })

    }
    componentDidMount() {
        this.textInput.focus();
        // var uploadelem = this.fileInput.files;
        // console.log("uploadelem", uploadelem);
        // chathelper.file_upload(uploadelem);

        ///***** FOR TESTINg */
        store.dispatch({ 
            type: 'PRIVATE_MODAL',
            showModal: true
        })


        
    }
//    ondragstart(e) { 
//                 this.className = 'hover'; 
//                 e.dataTransfer.setData('text/html', this.innerHTML); 
//                 return false; 
//     }

    ondragover(e) { this.className = 'hover'; e.preventDefault && e.preventDefault();return false; };
    ondragend(e) { this.className = '';  console.log("dragedn", e); return false; };
    ondrop(e) {
            console.log(" is this being called ondrop");
            this.className = 'success';
            e.preventDefault && e.preventDefault();
            chathelper.file_upload(e, "dnd");
            // this.className = '';
            // e.dataTransfer.getData('text/plain-text');
        //    console.log(url, "url");
        //     // now do something with:
        //     var files = e.dataTransfer.files;

        //     // process all File objects
        //     // for (var i = 0, file; file = files[i]; i++) {
        //         console.log( files, "files");
        //     // }

           

            return false;
};
    componentDidUpdate(){
        // scroll to bottom of chat history
        var node = this.refs.chathistory;
        console.log("node",node);
        console.log(node.scrollBottom);
        if (node.length > 0){
          node.scrollTop = -node.scrollHeight;
        }
        //  this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
        // node.scrollTo(0,node.body.scrollHeight);
    }
    closeModal(){
        store.dispatch({ 
            type: 'PRIVATE_MODAL',
            showModal: false
        })
    }

 

    render() {
        var style = {
        width: '100px',
        height: '100px'
        };

       var chatmessage = this.props.chat;
       if (this.props.chat){
           if (this.props.chat.length !== 0){
                var resultComponents = this.props.chat.map(function(result) {
                if (result.type === "file"){
                    var chatmessage = <img src={result.message} alt="File Not Found" height="150" width="150" />
                } else if  (result.type === "text"){
                    console.log("in here", result.type);
                    var chatmessage =  <div className="col-md-8">{result.message}</div>
                }
                return <div className="row results" key={result._id}>
                    <div className="col-md-2"><strong>{result.username}</strong></div> 
                            { chatmessage }
                    <div className="col-md-2"></div>
                </div>
                });
           }
       }
       if (this.props.showModal === true){
            var alertMessage = <Modal.Dialog>
                <Modal.Header>
                <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {this.props.privatemessage}
                </Modal.Body>

                <Modal.Footer>
                <Button onClick={this.closeModal}>Close</Button>
            
                </Modal.Footer>

            </Modal.Dialog>
    }
       // only make visible if there is a connected user - for now its username but later make it connected...if (this.props.connected)
       if ( this.props.username ){
           var headerText = <div><div className="row text-center"><div className="col-xs-12 col-md-12"><strong>Welcome {this.props.username}!</strong></div></div><div className="row text-center"><div className="col-xs-12 col-md-12">You are in the <strong>{this.props.currentroom} </strong>Room!</div></div></div>

            var chatDislay = <div>
                    <div className="row">
                        <div>
                            {headerText}
                        </div>
                    </div>

                    <hr />
             

                    <div className="chatbox row" ref="chathistory">
                        <div className="col-xs-12 col-md-12">    
                            <div className="row" >{resultComponents}</div>                     
                        <div>
                    </div>
                        </div>
                    </div>
                    <div className="row">
                    <div className="static-modal">
                        {alertMessage}
                    </div>
                        <div className="col-md-2"></div>
                            <div className="col-md-8">
                            <div ref={ref => this.drop = ref} className="drop" onDrop={(e) => this.ondrop(e)} onDragEnd={(e) => this.ondragend(e).bind(this)}  onDragOver={(e) => this.ondragover(e)}> Drop here</div>
                                <input type="file" id="siofu_input" label='Upload' accept='.png' name="file" ref="file" defaultValue={this.props.file} onChange={this.uploadFile} /><br /> 
             
        
                                <input type="text" value={this.props.message}  onChange={this.updateMessage}  className="form-control"   onKeyUp={(e) => this.addMessage(e, this.props.message)} onDrop={this.uploadFile} ref={input => this.textInput = input} />

                                                        
                            </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
       } else {

            var chatDislay = <div className="text-center">Apologies but there is currently no chat connection available. Please try again later.</div>

       }
    
        return (<div>
                  {chatDislay}
                </div>);
    }
};

const mapStateToProps = (store,ownProps) => {

    return {
        message: store.chatState.message,
        file: store.chatState.file,
        chat: store.chatState.chat,
        server: store.chatState.server,
        privatemessage: store.chatState.privatemessage,
        showModal: store.chatState.showModal,

    }

};

export default connect(mapStateToProps)(GroupChatSection);
// export default ChatSection;