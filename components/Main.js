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
             
                  <div className="container">

                    <div className="masthead">
                       <div className="col-md-10"><NavBar user= {this.props.username} /></div>
                       
                    </div>


                    <div className="jumbotron">
                        <h1>Main Header</h1>
                        
                    </div>

                    <div className="row main-content">
                        
                        Maybe put table of results in here
                        
                    </div>

                    
                    <footer className="footer">
                        <p>&copy; Company 2017</p>
                    </footer>

                    </div> 
            </div>

        )
    }
}

const mapStateToProps = (store,ownProps) => {
    return {
        username: store.userState.username,
    }
};


export default connect(mapStateToProps)(Main);
