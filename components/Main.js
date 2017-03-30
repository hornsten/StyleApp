import React, { Component } from 'react';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import Navbar from './Navbar';
import helper from "../app/utils/helper.js";
import chathelper from "../app/utils/chathelper.js";
import ChatModal from  './ChatModal';

class Main extends Component{
    constructor(props){
        super(props);
        // this.state = {}; //setting initial default state
        // listens for private chat requests
        chathelper.private_message(store);
    }
    componentDidMount(){
        //get user details
        helper.getUserDetails(store);
    }
    render(){
        return(
            <div>
             
                       
                       <NavBar  />
                        <ChatModal />
                    
                  <div className="container-fluid">

                    {this.props.children}

                    <div className="row main-content">
                        
                        {/*Maybe put table of results in here*/}
                        
                    
            </div>
                    </div>
                        <div className="footer">    
                             <div className="container">
                                 <p className="text-muted">&copy; Company 2017</p>
                            </div>
                        </div>
                    </div> 
        )
    }
}

// const mapStateToProps = (store,ownProps) => {
//     return {
//         username: store.userState.username,
//     }
// };


export default Main;
