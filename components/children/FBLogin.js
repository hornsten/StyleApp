/*// Include React
import React from 'react';
import $ from 'jquery';

var getAuth = require('../auth.js')

class FBLogin extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            auth:false,
            apiWaiting: true
        }
    }

    componentDidMount(){
        getAuth((authenticated) => this.setState({auth:authenticated, apiWaiting:false}));
    }
    render(){

        var signIn;
        if(!this.state.apiWaiting && !this.state.auth){
            signIn = (
                <div>
                <h2>Sign in with Facebook</h2>
                <button href="/auth/facebook" bsStyle="primary">FaceBook Login</button>
                </div>
            ); //sign in ends
        }else if(!this.state.apiWaiting && this.state.auth){
            signIn = (
                <p>You are logged in </p>
            );
        }

        return(
            <div><p>
                {signIn}</p>
            </div>
        );
    }
}

export default FBLogin;*/

var React = require('react');
var ReactDOM = require('react-dom');
var Home = require('./Home.js');
import $ from 'jquery';

var Container = React.createClass({
    getInitialState: function(){
        return{
            isAuthenticated: false,
            user: null
        };
    },

    componentDidMount: function(){
        $.get('/auth', function(res){
            this.setState({
                isAuthenticated: res.isAuthenticated,
                user: res.user
            });
        }.bind(this));
    },

    render: function(){
        var login = (
            <a href="/auth/facebook">
                <button id="login-with-fb">
                    <i className="fa fa-facebook-official" aria-hidden='true'></i>
                    Login With Facebook
                </button>
            </a>
        );


        if(this.state.isAuthenticated){
            login = (
                <Home user={this.state.user} />
            );
        }

        return (
            <div>{login}</div>
        )    
    }

})

module.exports = Container;