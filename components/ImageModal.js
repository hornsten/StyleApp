
import ReactDOM from "react-dom";
import React from "react";
import ReactModal from 'react-modal';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import {Modal, Dialog, Button, ButtonToolbar} from 'react-bootstrap';
import MagazineProfile from './MagazineProfile';
import helper from "../app/utils/helper.js";

class ImageModal extends React.Component{

constructor(props){
        super(props);
        helper.getProfileImage(store, this.props.profileuserid);
        helper.getBlurb(store, this.props.profileuserid);
        helper.getStyleMotto(store, this.props.profileuserid);
        helper.getProfileUsername(store, this.props.profileuserid);
        helper.getProfileMagazines(store, this.props.profileuserid);
 }


    closeModal(){
        store.dispatch({ 
            type: 'PROFILE_MODAL',
            profileModal: false
        })
        // reset values
        store.dispatch({ 
            type: 'UPDATE_PROFILE_NAME',
            profileusername: ""
        })
        store.dispatch({ 
            type: 'UPDATE_PROFILE_ID',
            profileuserid: ""
        })
        store.dispatch({ 
            type: 'UPDATE_STYLEMOTTO',
            stylemotto: ""
        })
        store.dispatch({ 
            type: 'UPDATE_BLURB',
            blurb: ""
        })
        store.dispatch({ 
            type: 'UPDATE_PROFILEIMAGE',
            profile_image: ""
        })


    }

    render(){
        console.log("what is in this profileusername?", this.props.profileusername);
        console.log("what is in this profile_image?", this.props.profile_image);
        console.log("what is in this stylemotto?", this.props.stylemotto);
        console.log("what is in this blurb?", this.props.blurb);
        console.log("what is in this blurb profileuserid?", this.props.profileuserid);

        var showProfileModal =


        <Modal className="profile-modal"
          show={this.props.profileModal}
        >
          <Modal.Header>
           
            <div className="col-md-8"><Modal.Title id="contained-modal-title-lg"><h3>{this.props.profileusername}</h3> </Modal.Title></div>
            <div className="col-md-4"><Button onClick={this.closeModal}>Close</Button></div>
          </Modal.Header>
          <Modal.Body>    
              <div>         
                  <div className="jumbotron sharp">     
                        <div className="row">
                            <div className="col-xs-4">
                            <img className='thumbnail' src={this.props.profile_image} style={{width: 180, height: 200}}/>
                                      
                            </div>
                            <div className="col-xs-8">                                        
                                  
                                    <h4>Style Motto:</h4>
                                    <p>{this.props.stylemotto}</p> 
                                    <h4>About:</h4>
                                    <p>{this.props.blurb}</p> 
                                  
                                  
                            </div>  
                        </div> 
                  </div>
                  
                  {/*Search Bar*/}

                  <MagazineProfile />
              </div>
          </Modal.Body>
          <Modal.Footer>
           
          </Modal.Footer>
        </Modal>



    // }

  return ( <div>{showProfileModal}</div> )
    }
}


const mapStateToProps = (store,ownProps) => {

    return {
        profileModal: store.mainState.profileModal,
        profile_image: store.userState.profile_image,
        stylemotto: store.userState.stylemotto,
        blurb: store.userState.blurb,
        searchUserid: store.mainState.searchUserid,
        profileusername: store.mainState.profileusername,
        profilemagazines: store.mainState.profilemagazines,
        profileuserid: store.mainState.profileuserid,
    }

}

export default connect(mapStateToProps)(ImageModal);