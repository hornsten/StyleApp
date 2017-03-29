
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';

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
            console.log( this.props.users, "in users");
            var chatWaiting = this.props.privateChatWaiting;
            var resultComponents = this.props.users.map(function(result) {
            // check to see if this is the current user or a user with which we are already having a prvate chat - if so don;t add hyperlink

           
            console.log("chatWaiting", chatWaiting);
             console.log("chatWithUser", chatWithUser);
            
            if ((result.username === currentusername) || (result.username === chatWithUser)){
            console.log("in hyperlink area ",  result.username);
   
                    connecteduser = result.username;
            } else if (result.username === chatWaiting){ 
                    // maybe colour or animate!!!
                    connecteduser = <div className="room-list-other" onClick={() => component.props.switchRoom(result.username, "Private")}><strong className="private-chat-waiting">{result.username}</strong></div>


            } else {

                    // hyperlink not dsipalying properlyx
                    connecteduser = <div className="room-list-other" onClick={() => component.props.switchRoom(result.username, "Private")}> {result.username} </div>
                
            }
            return <div className="row results" key={result._id}>
                <div className="col-md-4 text-center">{connecteduser}</div>
            </div>
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

