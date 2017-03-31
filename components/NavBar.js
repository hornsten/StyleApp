import React, {Component} from 'react';
import {connect} from 'react-redux';
import store from './Redux/redux.js';
import {Link} from 'react-router';
import chathelper from "../app/utils/chathelper.js";
import FaCommentO from 'react-icons/lib/fa/comment-o';
import FaUser from 'react-icons/lib/fa/user';
import FaUserPlus from 'react-icons/lib/fa/user-plus';
import FaLeanpub from 'react-icons/lib/fa/leanpub';
import FaLightbulbO from 'react-icons/lib/fa/lightbulb-o';
import FaUnlock from 'react-icons/lib/fa/unlock';
import FaLock from 'react-icons/lib/fa/lock';
import FaFacebook from 'react-icons/lib/fa/facebook';

class NavBar extends Component {
    constructor(props) {
        super(props);
        // Functions must be bound manually with ES6 classes or Another way is to bind
        // them inline, where you use them
        this.handleGroupClick = this
            .handleGroupClick
            .bind(this);
        this.handlePrvtClick = this
            .handlePrvtClick
            .bind(this);
    }
    handleGroupClick() {
        // dispatches updates to redux store to update the state
        if (this.props.username) {
            chathelper.startchat(this.props.username, store);
        }
    }
    handlePrvtClick() {
        // dispatches updates to redux store to update the state
        if (this.props.username) {
            chathelper.startprvtchat(this.props.username, store);
        }
    }
    handleLogout() {
        // do something with FB auth  ----
        store.dispatch({type: "IS_LOGGED_IN", loggedin: false})
    }
    render() {
        console.log(this.props.loggedin);
        console.log(this.props.username);
        const loggedin = this.props.loggedin;
        const user = this.props.username;
        var loginStatus = "";
        var component = this;
        // hardcoding for now this.props.loggedin = true;
        var isloggedin = this.props.loggedin;

        if (isloggedin) {
            var loggedInUser =  {user};
            // need to put link to logout part....
            loginStatus = <div>
                <ul className="nav navbar-nav">
                    <li>
                        <Link to='/closet'><FaLightbulbO className="icon"/>
                            Create</Link>
                    </li>
                    <li>
                        <Link to='/profile'><FaLightbulbO className="icon"/>
                            Profile</Link>
                    </li>
                    <li>
                        <Link
                            to='/private'
                            onClick={this
                            .handlePrvtClick
                            .bind(this)}><FaUser className="icon"/>
                            Style Consultation</Link>
                    </li>
                    <li>
                        <Link
                            to='/group'
                            onClick={this
                            .handleGroupClick
                            .bind(this)}><FaUserPlus className="icon"/>
                            Collaborate
                        </Link>
                    </li>
                </ul>
                {/*this is the logged in/logged out part*/}
                <ul className="nav navbar-nav navbar-right">

                    <li className="dropdown">
                        <a
                            href="#"
                            className="dropdown-toggle"
                            data-toggle="dropdown"
                            role="button"
                            aria-haspopup="true"
                            aria-expanded="false">{user}
                            <span className="caret"></span>
                        </a>
                        <ul className="dropdown-menu">

                            <li>
                                <Link to='/profile'><FaUser className="icon"/>My Profile</Link>
                            </li>
                            <li>
                                <a href="#">Something else here</a>
                            </li>
                            <li role="separator" className="divider"></li>
                            <li>
                                <Link to='/' onClick={() => this.handleLogout()}><FaLock className="icon"/>Log Out</Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        } else {

            loginStatus = <div>
                <ul className="nav navbar-nav navbar-right">

                    <li
                        className={`nav user-photo ${user && user.facebook && user.facebook.photo && 'show'}`}
                        style={user && user.facebook && user.facebook.photo && {
                        backgroundImage: `url(${user.facebook.photo})`
                    }}>

                        <a href="/auth/facebook"><FaFacebook className="icon"/>
                            Login with Facebook</a>
                    </li>

                </ul>

            </div>
        }

        return (

            <div id="myNavbar" className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1"
                            aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <Link to='/' id="brand" className="navbar-brand"> Style App</Link>
                       
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                        {loginStatus}

                    </div>

                </div>
            </div>

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
