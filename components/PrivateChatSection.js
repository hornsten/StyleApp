
import ReactDOM from "react-dom";
import React from "react";
// // import Chat from "./Chat.js";
// import CurrentUserAndRoom from "./CurrentUserAndRoom.js";
// import ChatInput from "./ChatInput.js";
// import ChatHistory from "./ChatHistory.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
import io from 'socket.io-client'
// let socket = io(`http://localhost:8000`)
var socket = io.connect();


class ChatSection extends React.Component {
    constructor(props) {
        super(props);

        // this.updatechat = this.updatechat.bind(this);
        chathelper.updatechat_listener(store);
        chathelper.connected_users(store);
        chathelper.server_messages(store);
        // socket.on('updatechat', (username, data) => {   
        //      console.log("socket", username, data);
        //     this.updatechat(username, data);
        // })
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
        //*****FOR TESTING */


            return false;
};
    // updatechat(username, data){
    //         console.log("callint this udate caht function", username, data);
    //         store.dispatch({ 
    //             type: 'CHAT_USER',
    //             chatuser: username
    //         },
    //         { 
    //             type: 'CHAT_MSG',
    //             chatmsg: data
    //         })
    // }
    // addMessage(message) {
    //     // tell server to execute 'sendchat' and send along one parameter
    //     console.log("am i getting here");
    //     chathelper.sendchat(message);
    // }
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
    updateMessage(e){
        store.dispatch({ 
            type: 'ADD_MESSAGE',
            message: e.target.value
        })
       

    }
    componentDidMount() {
        this.textInput.focus();
        /// *****for testing only!!!
        store.dispatch({ 
            type: 'PRIVATE_MODAL',
            showModal: true
        })
           
    }
    closeModal(){
        store.dispatch({ 
            type: 'PRIVATE_MODAL',
            showModal: false
        })
    }

 
    render() {
    //    console.log("this.props.privatemessage", this.props.privatemessage);
       if (this.props.privatemessage){
            var alertMessage = this.props.privatemessage;
       }
       var chatmessage = this.props.chat;
       if (this.props.chat){
           if (this.props.chat.length !== 0){
                var resultComponents = this.props.chat.map(function(result) {
                    console.log(result.type)
                if (result.type === "file"){
                    var chatmessage = <img src={result.message} alt="File Not Found" />
                    console.log("chatmessage", chatmessage);
                } else {
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
        var alertMessage = "";
        if (this.props.showModal === true){
                    var alertMessage = <Modal dialogClassName="custom-modal" show={this.props.showModal}>
                        <Modal.Header>
                        <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          {this.props.privatemessage}
                        </Modal.Body>

                        <Modal.Footer>
                        <Button onClick={this.closeModal}>Close</Button>
                    
                        </Modal.Footer>

                    </Modal>
       }
        var chattingwith = "";
       if (this.props.chatWithUser){
           var chattingWith = <div className="row text-center">You are chatting with {this.props.chatWithUser}</div>
       }
        var message = <div className="col-xs-12 col-md-12">You are in the <strong> {this.props.currentroom} </strong> chat area.</div>

       // only make visible if there is a connected user - for now its username but later make it connected...if (this.props.connected)
       if ( this.props.username ){
           var headerText = <div><div className="row text-center"><div className="col-xs-12 col-md-12">Welcome <strong>{this.props.username}</strong>!</div>
           </div><div className="row text-center">{message}</div>
           {chattingWith}</div>
            //   headerText += <div className="col-xs-6 col-md-3">You are in the {this.props.currentroom} Room</div>
            var chatDisplay = <div>
                    <div className="row">
                        <div>
                            {headerText}
                        </div>
                    
                    </div>

                    <hr />
            
        

                    <div className="chatbox row">
                        <div className="col-xs-12 col-md-12">    
                            <div className="row">{resultComponents}</div>                     
                        <div>
                    </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-2"></div>
                            <div className="col-md-8">
                                 <div ref={ref => this.drop = ref} className="drop" onDrop={(e) => this.ondrop(e)} onDragEnd={(e) => this.ondragend(e).bind(this)}  onDragOver={(e) => this.ondragover(e)}> Drop here</div>
                                <input type="file" id="siofu_input" label='Upload' accept='.png' name="file" ref="file" defaultValue={this.props.file} onChange={this.uploadFile} /><br /> 
             
        

                                <input type="text" value={this.props.message}  onChange={this.updateMessage}  className="form-control"  onKeyUp={(e) => this.addMessage(e, this.props.message)}  ref={input => this.textInput = input}/>
                            </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
       } else {

            var chatDisplay = <div className="text-center"> You are not logged in or there is a connection issue, please try later.</div>

       }
    
        return (<div>
                  {chatDisplay}
                </div>);
    }
};

const mapStateToProps = (store,ownProps) => {
 
    return {
        message: store.chatState.message,
        chat: store.chatState.chat,
        server: store.chatState.server,
        privatemessage: store.chatState.privatemessage,
        chatWithUser: store.chatState.chatWithUser,
    }
};

export default connect(mapStateToProps)(ChatSection);
// export default ChatSection;