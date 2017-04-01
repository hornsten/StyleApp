
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
import io from 'socket.io-client'
import {Modal, Dialog, Button} from 'react-bootstrap';
import ChatModal from  './ChatModal';

var socket = io.connect();


class PrivateChatSection extends React.Component {
    constructor(props) {
        super(props);

        chathelper.updatechat_listener(store);
        chathelper.connected_users(store, "private");
        
    }
     uploadFile(e) {

        chathelper.file_upload(e, "upload");
        
    }
    ondragover(e) { this.className = 'hover'; e.preventDefault && e.preventDefault();return false; };
    ondragend(e) { this.className = '';  console.log("dragedn", e); return false; };
    ondrop(e) {

            this.className = 'success';
            e.preventDefault && e.preventDefault();

            chathelper.file_upload(e, "dnd");

            return false;
};

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

    componentDidUpdate() {
        var node = ReactDOM.findDOMNode(this.chat);
        node.scrollTop = node.scrollHeight;
    }
    componentDidMount() {
        this.textInput.focus();
        var node = ReactDOM.findDOMNode(this.chat);
        node.scrollTop = node.scrollHeight;

    }


 
    render() {

       var chatmessage = this.props.chat;
       var component = this;
       if (this.props.chat){
           if (this.props.chat.length !== 0){
                var resultComponents = this.props.chat.map(function(result) {

                if (result.type === "file"){
                     var chatmessage = <img src={result.message} alt="File Not Found" height="150" width="150" />

                } else {
                    var chatmessage =  <div>{result.message}</div>
                }
                

                var d = new Date(result.created_at);
                var chiDate = new Date(d.setHours(d.getHours())).toString();
                var dateObj = new Date(chiDate);
                var month = dateObj.getUTCMonth() + 1; //months from 1-12
                var day = dateObj.getUTCDate();
                var year = dateObj.getUTCFullYear();
                var hour = dateObj.getHours();
                var minutes = dateObj.getMinutes();

                var newdate = month + "/" + day + "/" + year + " " + hour + ":" + minutes;
  
                var userChat = "";
                // for chat bubbles
                if (result.username === component.props.username){


                        userChat =  <div className="row results talk-bubble-pink tri-right round left-top">
                          
                                <p className="talktext"><strong>{result.username}</strong> @ {newdate} </p>
                            
                          
                                <p className="talktext">{ chatmessage }</p>
                            
                        </div>


                } else {
                           userChat =  <div className="row results talk-bubble-grey tri-right round btm-right-in">
                            <div className="row">
                                <p className="talktext chat-stuff"><strong>{result.username}</strong> @ {newdate} </p>
                                <p className="talktext chat-stuff">{ chatmessage }</p>
                            </div>
                        </div>
                }



                return <div><div className="row results" key={result._id}>
                   
                    <div className="col-md-12">
                        {userChat}

                    </div>
                </div>
                </div>
                });

           }

       }
        var alertMessage = "";
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
                    <div className="chatbox row"  ref={ref => this.chat = ref} >
                            <div className="row">{resultComponents}</div>                     
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
        privateChatWaiting: store.chatState.privateChatWaiting,
        showModal: store.chatState.showModal,
    }
};

export default connect(mapStateToProps)(PrivateChatSection);
// export default ChatSection;