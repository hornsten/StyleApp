import React, { Component } from "react";
import update from 'react/lib/update';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import { Link } from 'react-router';
import chathelper from "../app/utils/chathelper.js";

class ProfilePage extends React.Component {
   constructor(props) {
      super(props);
    
  }


   render() {

      return (
         <section className="container-fluid">
    <div className="jumbotron" id='bio-tron'>
        <div className='row'>
         
            <div className='col-sm-2'>
                <a href="#" id='profile-pic' className="thumbnail">
                 <img src="../img/makeup.jpg" alt="fashionator"></img>
                </a>
            </div>
            <div className='col-sm-10'>
                <h1 className='username'>The Fashionator</h1>
                <h3 className='motto'>If the shoe fits, buy it!</h3>
                <p className='blurb'>A little bit about me and my style...I am a fashionista!</p>
            </div>
       
        </div>
    </div>

       <div className='row'>
           <div className='col-sm-4'>
                <a href="#" className="thumbnail">
                 <img src="../img/makeup.jpg" alt="fashionator"></img>
                </a>
            </div>
            <div className='col-sm-4'>
                <a href="#" className="thumbnail">
                 <img src="../img/makeup.jpg" alt="fashionator"></img>
                </a>
            </div>
            <div className='col-sm-4'>
                <a href="#" className="thumbnail">
                 <img src="../img/makeup.jpg" alt="fashionator"></img>
                </a>
            </div>
           </div>
</section>
      )
   }

}

export default ProfilePage;
