import React, { Component } from 'react';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import NavBar from './NavBar';
import helper from "../app/utils/helper.js";


class Main extends Component{
    constructor(props){
        super(props);
        // this.state = {}; //setting initial default state
    }
    componentDidMount(){
        //get user details
        helper.getUserDetails(store);
    }
    render(){
        return(
            <div>
             
                       <NavBar  />
                       
                    
                  <div className="container">

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
