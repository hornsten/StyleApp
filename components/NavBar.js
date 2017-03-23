import React, { Component } from 'react';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import { Link } from 'react-router';

class NavBar extends Component{
    constructor(props) {
        super(props);
        // Functions must be bound manually with ES6 classes or Another way is to bind them inline, where you use them 
        this.handleGroupClick = this.handleGroupClick.bind(this);
        this.handlePrvtClick = this.handlePrvtClick.bind(this);
    }
    handleGroupClick() {
        // dispatches updates to redux store to update the state 
        if (this.props.username){
             chathelper.startchat(this.props.username, store);
        }
    }
    handlePrvtClick() {
        // dispatches updates to redux store to update the state 
        if (this.props.username){
            chathelper.startprvtchat(this.props.username, store);
        }
    }
    handleLogout(){
        // do something with FB auth  ----
        store.dispatch({type: "IS_LOGGED_IN", loggedin: false})
    }
    render(){
        console.log(this.props.loggedin);
         console.log(this.props.username);
        const loggedin = this.props.loggedin;
        const user = this.props.username;
        var loginStatus = "";
        var component = this;
        // hardcoding for now
        // this.props.loggedin = true;
        var isloggedin = this.props.loggedin; ///this needs to be replace dwith this.props.login
        
            if (isloggedin === false){
            loginStatus = (<ul className="nav navbar-nav text-md-center justify-content-md-between"><li className={`nav user-photo  ${user && user.facebook && user.facebook.photo && 'show'}`}
            style={user && user.facebook && user.facebook.photo && {backgroundImage: `url(${user.facebook.photo})`}}>

            <a href = "/auth/facebook"><i className="fa fa-facebook o-auth-button"></i>Login with facebook</a>
            </li></ul>)
            } else {
            // need to put link to logout part....
                loginStatus =  <ul className="nav navbar-nav text-md-center justify-content-md-between"><li className="nav-item">
                        <a className="nav-button log-out-button show" href= "#" onClick={() => this.handleLogout()}> Log Out</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Create</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">My Magazine</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">My Profile</a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Chat</a>
                        <div className="dropdown-menu" aria-labelledby="dropdown01">
                            <ul>
                            <li><Link to='/group' onClick={this.handleGroupClick.bind(this)}>Group Chat</Link></li>
                            <li><Link to='/private' onClick={this.handlePrvtClick.bind(this)}>Private Chat</Link></li>
                            </ul>
                        </div>
                    </li>
                    </ul>

            }


if (this.props.loggedin === true){
   var loggedInUser = <div className="col-md-4">
        <span className="navbar-text">
                    
                Logged in: {user}
        
        </span>
    </div>
}
        
        
   

        return(

            <div className="container">
                    <div className="col-md-8">
                    <div id="myNavbar" className="collapse navbar-collapse top_nav">
                        <nav className="navbar navbar-light bg-faded rounded mb-3">
                            
                            
                            {loginStatus}

            
                        </nav>
                    </div>
                    </div>
                    {loggedInUser}
                </div>


            /*<nav className="navbar navbar-fixed-top">
                <div className="navbar-header">
                    <span className = "navbar-brand"> Login</span>
                </div>

                <ul className= "nav navbar-nav navbar-right">
                    <li className={`nav user-photo  ${user && user.facebook && user.facebook.photo && 'show'}`}
                    style={user && user.facebook && user.facebook.photo && {backgroundImage: `url(${user.facebook.photo})`}}>
                    </li>

                    <li className="nav-button">
                        {
                            (!user.facebook || !user.facebook.photo)
                            &&
                            <span>
                                Log In &#10161;
                                {
                                    (!user || !user.facebook)
                                    &&
                                    <a href = "/auth/facebook"><i className="fa fa-facebook o-auth-button"></i></a>
                                }
                            </span>
                        }
                        {
                            user 
                            &&
                            <a className="nav-button log-out-button show" href= "#" onClick={this.props.logout}> Log Out</a>
                        }
                    </li>

                </ul>
            </nav>*/
        );
    }
}

const mapStateToProps = (store,ownProps) => {
    return {
        username: store.userState.username,
        loggedin: store.userState.loggedin,

    }
};


export default connect(mapStateToProps)(NavBar);

