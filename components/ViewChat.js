
import ReactDOM from "react-dom";
import React from "react";

import ChatSection from "./ChatSection.js";
import Users from "./Users.js";
import Rooms from "./Rooms.js";
import helper from "../app/utils/helper.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';



class ViewChat extends React.Component {
    constructor(props) {
        super(props);

        // Functions must be bound manually with ES6 classes or Another way is to bind them inline, where you use them 
        this.handleData = this.handleUserData.bind(this);

    }
   componentDidMount(){
       //// need to put client side sockets in here 
        // example : http://danialk.github.io/blog/2013/06/16/reactjs-and-socket-dot-io-chat-application/
        // get data for passing to then component on load
        helper.getUserList().then((response) => {
            this.handleUserData(response)
        })    
    }
    handleUserData(response){
        console.log(typeof response, "response")
        store.dispatch({ 
            type: 'USER_LIST',
            users: response.data
        })
    }

    render() {
        return (<div className="row">
                        <div className="col-xs-4 col-s-2 col-md-2">
                            <Rooms />
                        </div>
                        <div className="col-xs-8 col-s-8 col-md-8">
                            <ChatSection />
                        </div>
                        <div className="col-s-2 col-s-2 col-md-2">
                            <Users users={this.props.users}/>
                        </div> 
                    </div>);
    }
};

const mapStateToProps = (store,ownProps) => {
    return {
        users: store.chatState.users,
    
    }
};

// const mapStateToProps = (state) => {
//     return {
//         fileList: state.fileList
//     };
// };
// module.exports = Search;
export default connect(mapStateToProps)(ViewChat);

// export default ViewChat;