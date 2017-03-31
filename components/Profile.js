
import ReactDOM from "react-dom";  ////This needed to be imported
import React, { Component } from "react";
import FaCamera from 'react-icons/lib/fa/camera';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import InLineEdit from './InLineEdit';
import helper from "../app/utils/helper.js";
const noImage = 'http://www.vistagardentampa.org/assets/empty_avatar.jpg'
import {Modal, Dialog, Button} from 'react-bootstrap';
import ReactModal from 'react-modal';
import Magazine from './Magazine';

const initialEditorState = {
            fnameOpen: false,
            hnameOpen: false,
            motoOpen: false,
            blubOpen: false
         }


class Profile extends React.Component {
      constructor(props) {
      super(props);
        this.state = Object.assign({}, props, {editor: initialEditorState});
      this.uploadFile = this.uploadFile.bind(this);
      this.state = {
      data: [],
      showModal: false,
      showModal2: false
    };
    helper.getProfileImage(store, "");
}



  handleClick(e) {
      e.preventDefault();
  }

  uploadFile(e) {     
      helper.uploadToProfile(e, this.props.dispatch);   
  }

  addSearch(e, message) {
        // tell server to execute 'sendchat' and send along one paramete
        console.log("serach", this.props.searchUseid);
        if (e.keyCode == 13) {
            var trimMessage = message.trim();
            helper.searchMagazinesUserid(store, trimMessage, this.props.userid);
            store.dispatch({ 
                type: 'ADD_SEARCH_USERID',
                searchUserid: ""
            })
        }
    }

    updateSearch(e){

        console.log(e.target.value, "search")
        store.dispatch({ 
            type: 'ADD_SEARCH_USERID',
            searchUserid: e.target.value
        })
       

    }

  

    
     render(){
      const self = this;
      let {
         profile_image,
         firstName,
         lastName,
         moto,
         blurb,
         showModal,
         editOn,
         showModal2,
         editor
      } = this.state;

      let editClicked = () => {
        self.setState({editOn: true})
      }
      console.log(this)
      // let avatarSRC =  this.props.profile_image ? noImage : profile_image;

          return(
              <div>         
                  <div className="jumbotron sharp">     
                        <div className="row">
                            <div className="col-xs-2">
                            <img className='thumbnail' src={this.props.profile_image} style={{width: 180, height: 200}}/>
                            <FaCamera className="icon"/>
                            <input ref={ref => this.inputEntry = ref} type="file" id="siofu_input" label='Upload'
                                    name="file" ref="file" onChange={(e) => this.uploadFile(e)}/><br /> 
                                      
                            </div>
                            <div className="col-xs-10">                                        
                                  <ul>      
                                    <h3>{this.props.username}</h3>
                                      <li><h3 className='username'>passionista123</h3></li>    
                                      {/*<li>style motto: {}</li>
                                      <li>blurb:{}</li>*/}
                                      <InLineEdit />
                                      {/*<li><button onClick={this.handleClick} className="btn btn-default btn-pink outline round btn-lg">edit</button></li>*/}
                                  </ul>
                            </div>  
                        </div> 
                  </div>
                  
                  {/*Search Bar*/}
                  <p>Search for Keywords:</p>
                  <input type="text" value={this.props.searchUserid}  onChange={this.updateSearch}  className="form-control"   onKeyUp={(e) => this.addSearch(e, this.props.searchUserid)} ref={input => this.textInput = input} />
                  <Magazine />
              </div>)
      }
}

const mapStateToProps = (store,ownProps) => {
    return {

      userid: store.chatState.userid,
      loggedin: store.userState.loggedin,
        users: store.chatState.users,
        username: store.userState.username,
        profile_image: store.userState.profile_image,
        stylemotto: store.userState.stylemotto,
        blurb: store.userState.blurb,
        searchUserid: store.mainState.searchUserid,
    }
};


export default connect(mapStateToProps)(Profile);

