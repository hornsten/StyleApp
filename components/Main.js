import React, { Component } from 'react';


import NavBar from './NavBar';

class Main extends Component{
    constructor(){
        super();
        this.state = {}; //setting initial default state
    }

    render(){
        return(
            <div>
               <NavBar user= {this.state.user} />
            </div>
        )
    }
}

export default Main;