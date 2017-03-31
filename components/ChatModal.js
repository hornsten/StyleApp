
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import {Modal, Dialog, Button} from 'react-bootstrap';
// import chathelper from "../app/utils/chathelper.js";

class ChatModal extends React.Component {
    constructor(props) {
        super(props);
  
    }
    closeModal(){
        store.dispatch({ 
            type: 'PRIVATE_MODAL',
            showChatModal: false
        })
    }
    render() {
        console.log("in chat modale **** loggedin", this.props.loggedin);
        console.log("show modal  chat", this.props.showChatModal);
         console.log("privatemessage private chat", this.props.privatemessage);
         console.log("looking for showChatModal in ChatModal", store.getState())
        // var displayModal  = ""
         // verify user is logged in
         var isloggedin = this.props.loggedin;
         if (isloggedin){
            // if there is a chat message
            if (this.props.showChatModal){
                 var displayModal  = <div id="snackbar"  onClick={this.closeModal} className="show"><strong> {this.props.privatemessage} </strong>would like a style consultation.</div>
            }
                

                
        }

    
    

        return (<div>
                    {displayModal}
                </div>) 
            }
};

const mapStateToProps = (store,ownProps) => {
    return {
        privateChatWaiting:  store.chatState.privateChatWaiting,
        showChatModal: store.chatState.showChatModal,
        privatemessage:  store.chatState.privatemessage,
        loggedin: store.userState.loggedin,
    }
};


export default connect(mapStateToProps)(ChatModal);

