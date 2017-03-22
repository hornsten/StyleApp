import React, { Component } from 'react';

class NavBar extends Component{
    constructor(){
        super();
    }

    render(){
        const user = this.props.user;

        return(
            <div className="container">
               Navbar here 
               <nav className="navbar navbar-fixed-top">
                <div className="navbar-header">
                    <span className = "navbar-brand"> Login</span>
                </div>
                 <ul className= "nav navbar-nav">
                      <li className={`nav user-photo  ${user && user.facebook && user.facebook.photo && 'show'}`}
                    style={user && user.facebook && user.facebook.photo && {backgroundImage: `url(${user.facebook.photo})`}}>
                    </li>
                    
                    <li className="nav-button">
                        <a href = "/auth/facebook"><i className="fa fa-facebook o-auth-button"></i>Login with facebook</a>
                    </li>

                </ul>
            </nav>
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

export default NavBar;