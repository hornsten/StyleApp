import React, { Component } from 'react';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import { Link } from 'react-router';
import chathelper from "../app/utils/chathelper.js";
import FaCommentO from 'react-icons/lib/fa/comment-o';
import FaUser from 'react-icons/lib/fa/user';
import FaUserPlus from 'react-icons/lib/fa/user-plus';
import FaLeanpub from 'react-icons/lib/fa/leanpub';
import FaLightbulbO from 'react-icons/lib/fa/lightbulb-o';
import FaUnlock from 'react-icons/lib/fa/unlock';
import FaLock from 'react-icons/lib/fa/lock';
import FaFacebook from 'react-icons/lib/fa/facebook';

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
        var isloggedin = this.props.loggedin; 
        //   <a className="nav-button log-out-button show" href= "#" onClick={() => this.handleLogout()}> Log Out</a>

            if (isloggedin){
 // need to put link to logout part....
                   loginStatus =  <ul className="nav navbar-nav text-md-center justify-content-md-between">
                   
                   <li id="brand">Style App</li>
                   <li className="nav-item">
                        <Link to='/' onClick={() => this.handleLogout()}><FaLock className="icon"/> Log Out</Link>
                    </li>
                    <li className="nav-item">
                       <Link to='/closet'><FaLightbulbO className="icon" /> Create</Link>
                    </li>
                    <li className="nav-item">
                       <Link to='/home'><FaLightbulbO className="icon" /> Temp home link</Link>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><FaLeanpub className="icon" /> My Magazine</a>
                    </li>
                    <li className="nav-item">
                        <Link to='/profile'><FaUser className="icon" /> My Profile</Link>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <FaCommentO className="icon" /> Chat</a>
                        <div className="dropdown-menu" aria-labelledby="dropdown01">
                            <ul>
                            <li><Link to='/group' onClick={this.handleGroupClick.bind(this)}><FaUserPlus className="icon" /> Group Chat</Link></li>
                            <li><Link to='/private' onClick={this.handlePrvtClick.bind(this)}><FaUser className="icon" /> Private Chat</Link></li>
                            </ul>
                        </div>
                    </li>
                    </ul>
            
            } else {
                loginStatus = (<ul className="nav navbar-nav text-md-center justify-content-md-between">
                     <li id="brand">Style App</li>
                    <li className={`nav user-photo  ${user && user.facebook && user.facebook.photo && 'show'}`}
            style={user && user.facebook && user.facebook.photo && {backgroundImage: `url(${user.facebook.photo})`}}>

            <a href = "/auth/facebook"><FaFacebook className="icon"/> Login with Facebook</a>
            </li></ul>)
           


            }


if (isloggedin){
   var loggedInUser = <ul className="nav navbar-nav navbar-right">
        <li className="navbar-link"><FaUnlock className='icon'/>
                    
                  Logged in: {user}
        
        </li>
    </ul>
}

        return(

            <div>
                <div>
                    <div id="myNavbar" className="navbar navbar-inverse top_nav">
                    
                            {loginStatus}
                             {loggedInUser}
                    </div>
                </div>
                   
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
        userid: store.userState.userid,
        loggedin: store.userState.loggedin,

    }
};


export default connect(mapStateToProps)(NavBar);

