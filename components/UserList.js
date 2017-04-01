
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import {Modal, Dialog, Button} from 'react-bootstrap';

class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.users){
            var currentusername =  this.props.currentuser;
            var chatWithUser = this.props.chatWithUser;
            var connecteduser = "";
            var component=this;
            var currentroom = this.props.currentroom;
            var chatWaiting = this.props.privateChatWaiting;

            var resultComponents = this.props.users.map(function(result) {
            // check to see if this is the current user or a user with which we are already having a prvate chat - if so don;t add hyperlink

           
            if (result.username === currentusername){
            
                    connecteduser = <Button bsStyle='default' key={result._id}  className="user-list-other" active>{result.username}</Button>
                    
            }  else if (result.username === chatWithUser){

                  connecteduser = <Button  bsStyle='default' key={result._id} className="user-list-other" active>{result.username}</Button>
            } 
            else if (result.username === chatWaiting){ 

                    connecteduser = <Button  key={result._id} active bsStyle='primary' active className="user-list-other" onClick={() => component.props.switchRoom(result.username, "Private")}><strong className="private-chat-waiting">{result.username}</strong></Button>


            } else {

                    // hyperlink not dsipalying properlyx
                    connecteduser = <Button bsStyle='default' key={result._id} className="user-list-other" onClick={() => component.props.switchRoom(result.username, "Private")}> {result.username} </Button>
                
            }
            return <div>{connecteduser}</div>
        });
    }
    
    

        return (<div>
                    <div className="col-sm-12">
                        <div className="row results"><div>{resultComponents}</div></div>
                    </div>  
                </div>) 
            }
};

const mapStateToProps = (store,ownProps) => {
    return {
        privateChatWaiting:  store.chatState.privateChatWaiting,
    }
};


export default connect(mapStateToProps)(UserList);

