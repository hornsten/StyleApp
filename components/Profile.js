

import React, { Component } from "react";
import FaCamera from 'react-icons/lib/fa/camera';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import InLineEdit from './InLineEdit';
const noImage = 'http://media.washtimes.com.s3.amazonaws.com/media/image/2014/01/04/people-steven-seagaljpeg-06962.jpg'


import ReactModal from 'react-modal';

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
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleOpenModal2 = this.handleOpenModal2.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleCloseModal2 = this.handleCloseModal2.bind(this);
}

 handleClick(e) {
    e.preventDefault();
 }

uploadFile(e) {
  var inputfile = ReactDOM.findDOMNode(this.siofu_input).value;
  // var itemType = ReactDOM.findDOMNode(this.closetItemType).value;
  // console.log(itemType, "itemType");
  // console.log("calling this$$$", e.target.value);
  // Make sure a valid type entered before saving file
  // console.log("this.props.itemtype", this.props.itemtype);
   // Make sure a valid type entered before saving file
  // console.log("itemtype", itemType);
  //reset old error message
  
  if (this.props.item !== "INPUT"){
     helper.uploadToProfile(e, store);   
  } 
}

  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleOpenModal2 () {
    this.setState({ showModal2: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }
  
  handleCloseModal2 () {
    this.setState({ showModal2: false });
  }
  

    
     render(){
       console.log('this.state', this.state)
      const self = this;
      let {
         avatarSrc,
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
      let saveClicked = () => {
        let f = self.refs.fname.value.trim();
        let l = self.refs.lname.value.trim();
        self.setState({editOn: false, firstName: f, lastName: l })
      }
          return(
  <div>         
<InLineEdit />

      <div className="jumbotron sharp">     
            <div className="row">
                      <div className="col-xs-2">
                      <img className='thumbnail' src= {"../assets/img/empty_avatar.jpg"} style={{width: 150, height: 150}}/>
                      
                      <input type="file" id="siofu_input" label='Upload' accept='.png' 
                              name="file" ref="file" onChange={(e) => this.uploadFile(e)}/><br /> 
                      </div>
                      <div className="col-xs-10">                                        
                                      <ul>      
                                        <h3>{this.props.username}</h3>
                                          <li><h3 className='username'>passionista123</h3></li>    
                                          <li>style motto: {}</li>
                                          <li>blurb:{}</li>
                                          <li><FaCamera className="icon"/> Add Photo</li>
                                          <li><button onClick={this.handleClick} className="btn btn-default btn-pink outline round btn-lg">edit</button></li>
                                      </ul>

                      </div>  
            </div> 
      </div>

              {/*<div className="panel panel-default">
               <div className="row">
                 <div className="col-sm-4">
                  <img src={avatarSrc ? avatarSrc : noImage} width="150" height="200"/>
                  </div>
                  <div className="col-sm-8">
                    
                    <div className="half-form">
                     
                
                    <div className={ (editor.fnameOpen || editOn) ?  'hide-elm' : 'name-text' }> {firstName}    </div>
                     
                     <input type="text"  id="abc" className={(editor.fnameOpen || editOn ) ? 'input-names' : 'hide-elm'} ref="fname" placeholder={firstName}/>
                     </div>
                     <div className="half-form">
                       <div className={ (editor.lnameOpen || editOn) ?  'hide-elm' : 'name-text' }>
                         {lastName}
                       </div>
                     <input type="text" className={(editor.lnameOpen || editOn)? 'input-names' : 'hide-elm'} ref="lname" placeholder={lastName}/>
                     </div>
                  </div>
                  <button onClick={editClicked} className={!editOn ? 'btn btn-info' : 'hide-elm'} > Edit </button>
                  <button onClick={saveClicked} className={ editOn ? 'btn btn-success' : 'hide-elm'} >Save </button>

               </div>
            </div>*/}










{/*   div for adding personal style images*/}
                    <div className="row">
                    
                          
                                {/*<button onClick={this.handleOpenModal}>Trigger Modal</button>*/}
                                
                                <img src= {"../assets/img/blkwhite.jpg"} onClick={this.handleOpenModal}
                                 style={{width: 150, height: 150}}/>

                                  <img src= {"../assets/img/pink.jpg"} onClick={this.handleOpenModal2}
                                 style={{width: 150, height: 150}}/>

                                <ReactModal 
                                isOpen={this.state.showModal}
                                contentLabel="Modal Example"
                                
                                style={{
                                    
                                    content: {
                                       
                                        height:750,
                                        width: 750,
                                        top: 100,
                                        left: 400

                                    }
                                  }}
                                >
                                <p>{this.props.username}</p>

                                  <img src= {"../assets/img/blkwhite.jpg"} 
                                 style={{width: 500, height: 500}}/>
                                  <ul>      
                                     <li>style motto: {}</li>
                                    <li>blurb:{}</li>
                                 </ul>

                                <button onClick={this.handleCloseModal}>Close Modal</button>
                                </ReactModal>

{/*second modal*/}
                            <ReactModal 
           isOpen={this.state.showModal2}
           contentLabel="Modal #2 Global Style Override Example"
           style={{
                                    
                                    content: {
                                      
                                        height:750,
                                        width: 750,
                                        top: 100,
                                        left: 400

                                    }
                                  }}
           onRequestClose={this.handleCloseModal2}
        >
          <p>Modal 2 text!</p>

          <img src= {"../assets/img/pink.jpg"} 
                                 style={{width: 500, height: 500}}/>
          <button onClick={this.handleCloseModal2}>Close Modal</button>
        </ReactModal>

                            </div>
                     
        
  </div>
          )
      }
}

const mapStateToProps = (store,ownProps) => {
    return {

      userid: store.userState.userid,
      loggedin: store.userState.loggedin,
        users: store.chatState.users,
        username: store.userState.username,
        profile_image: store.userState.profile_image,
        stylemotto: store.userState.stylemotto,
        blurb: store.userState.blurb
    }
};


export default connect(mapStateToProps)(Profile);

