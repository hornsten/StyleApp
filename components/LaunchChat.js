
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";

// import io from 'socket.io-client'
// // let socket = io(`http://localhost:8000`)
// var socket = io.connect();

class LaunchChat extends React.Component {
    constructor(props) {
        super(props)
        // Functions must be bound manually with ES6 classes or Another way is to bind them inline, where you use them 
        this.updateUsername = this.updateUsername.bind(this);

    }
    updateUsername(e){
        // dispatches updates to redux store to update the state 
        store.dispatch({ 
            type: 'ADD_USERNAME',
            username: e.target.value
        })
    }
    addUser(username){
        // dispatches updates to redux store to update the state 
        //*** put all sockets in separate helper file  ***/
        // socket.emit('adduser', username);
        chathelper.adduser(username);
    }
    render() {
        return (<div className="row text-center" id="usernameinput">
                    <div className="col-md-12">
                    <strong>USERNAME</strong>
                    <input type="text" value={this.props.username}  onChange={this.updateUsername}  className="form-control"  />
                    <button type="button" onClick={() => this.addUser(this.props.username)}>Add User</button>
                    </div>
                </div>);
    }
};



const mapStateToProps = (store,ownProps) => {
    return {
        username: store.chatState.username,

    }
};

// const mapStateToProps = (state) => {
//     return {
//         fileList: state.fileList
//     };
// };
// module.exports = Search;
export default connect(mapStateToProps)(LaunchChat);
