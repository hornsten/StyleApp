
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
    };
    helper.getProfileImage(store, "");
}



  handleClick(e) {
      e.preventDefault();
  }

  uploadFile(e) {     
      helper.uploadToProfile(e, store);   
  }

  addSearch(e, message) {
        // tell server to execute 'sendchat' and send along one paramete

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


          return(
              <div>         
                  <div className="jumbotron sharp">     
                        <div className="row">
                            <div className="col-xs-6 col-s-6 col-md-3">
                          
                            <img className='thumbnail' src={this.props.profile_image} style={{width: 180, height: 200}}/>
                 
                             
                            
                         
                            
                            <br /> 
                                        
                            </div>
                            <div className="col-xs-6  col-s-6 col-md-9">                                        
                                  <div className="row">
                                    <h3>{this.props.username}</h3>
                                        <br />
                                      {/*<li>style motto: {}</li>
                                      <li>blurb:{}</li>*/}
                                      <InLineEdit />
                                      {/*<li><button onClick={this.handleClick} className="btn btn-default btn-pink outline round btn-lg">edit</button></li>*/}
                                    </div>
                            </div>  
                        </div> 
                         <div className="row">
                           <FaCamera className="icon pull-left"/><input className="camera-icon pull-left" ref={ref => this.inputEntry = ref} type="file"  label='Upload'
                                    name="file" ref="file" onChange={(e) => this.uploadFile(e)}/>
                        </div>
            </div>
                  
                  {/*Search Bar*/}
                
                  <input type="text" placeholder="Search for Keywords" value={this.props.searchUserid}  onChange={this.updateSearch}  className="form-control"   onKeyUp={(e) => this.addSearch(e, this.props.searchUserid)} ref={input => this.textInput = input} />
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
        inspiration: store.userState.inspiration,
        designer: store.userState.designer,
        searchUserid: store.mainState.searchUserid,
    }
};


export default connect(mapStateToProps)(Profile);

