
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
   
                   var displayModal  = 
                     <div className="static-modal">
                    <Modal  show={this.props.showChatModal}>
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
                    </div>

                
        }

        console.log("modal", displayModal);
        
    
    

        return (<div className="custom-modal">
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

