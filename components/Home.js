import React, { Component } from "react";
import helper from "../app/utils/helper.js";
import store from './Redux/redux.js';
import ReactDOM from "react-dom";
import AllMagazines from './AllMagazines';
import {Modal, Dialog, Button} from 'react-bootstrap';
import ChatModal from  './ChatModal';
import {connect } from 'react-redux';
import FaSearch from 'react-icons/lib/fa/search';


class Home extends React.Component {
      constructor(props) {
      super(props);
   
}

    addSearch(e, message) {
        // tell server to execute 'sendchat' and send along one paramete
        if (e.keyCode == 13) {
            var trimMessage = message.trim();
            helper.searchMagazines(store, trimMessage);
            store.dispatch({ 
                type: 'ADD_SEARCH',
                search: ""
            })
        }
    }

    updateSearch(e){

        store.dispatch({ 
            type: 'ADD_SEARCH',
            search: e.target.value
        })
       

    }

 handleClick(e) {
    e.preventDefault();
 }

     render(){
          return(
<div>        
    <div id="sharp" className="jumbotron"> 
    <div className="row">
       <div className="col-xs-12 col-sm-6 text-center">
       <h1 id="app-title">Style Genie</h1>
     
       <h4>Upload your wardrobe</h4>
       <h4>Create outfits</h4>
       <h4>Share your style with your friends!</h4> 
     
       </div>
       <div className="col-xs-12 col-sm-6 text-center">
      
        <video id="video-background embed-responsive-item" autoPlay loop width="auto" height="400">
             <source src="../assets/img/Style-Video.m4v" type="video/mp4"></source>
        </video>
        </div>
        </div>
    </div>
       <div className="magazine">  
                 {/* Search bar for magazines*/}
                
                <input type="text" placeholder='Search for Styles using Keywords e.g. Chic' value={this.props.search}  onChange={this.updateSearch}  className="form-control"   onKeyUp={(e) => this.addSearch(e, this.props.search)} ref={input => this.textInput = input} />
  
                  
                  <ul>
                    <AllMagazines />
                  </ul>
              </div> 
</div>
          )
      }
}

const mapStateToProps = (store,ownProps) => {

    return {
        userid: store.chatState.userid,
        search: store.mainState.search,
   
    }

}

export default connect(mapStateToProps)(Home);