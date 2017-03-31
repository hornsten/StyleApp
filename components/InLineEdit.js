import React,  {Component} from 'react';

import Edit from 'react-edit-inline';
import FaEdit from 'react-icons/lib/fa/edit';
import helper from "../app/utils/helper.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';


class InLineEdit extends React.Component {

    constructor(props){
      super(props);
      this.dataChanged = this.dataChanged.bind(this);
      // this.handlestylemotto = this.handlestylemotto.bind(this);
      // this.handleblurb = this.handleblurb.bind(this);

      // if (!this.props.stylemotto){
              store.dispatch({
                type: 'UPDATE_STYLEMOTTO',
                stylemotto: 'enter stylemotto'
              })

      // }
      // if (!this.props.blurb){
              store.dispatch({
                type: 'UPDATE_BLURB',
                blurb: 'enter blurb'
              })
        
      // }
      // this.state = {
      //     blurb: 'enter style motto',
      //   stylemotto: 'enter blurb'
      // }
    }
    componentWillMount(){
       helper.getStyleMotto(store); 
       helper.getBlurb(store);
    }
    dataChanged(data) {
        // data = { description: "New validated text comes here" }
        // Update your model from here
        console.log(data)
         this.setState({...data})
         if (data.stylemotto){
            helper.setStyleMotto(data.stylemotto,store); 
         } else if (data.blurb){
            helper.setBlurb(data.blurb, store);
         }
    }

// handlestylemotto(data){
//   // console.log("e.target", e.target)
//   this.setState({...data})
//    helper.getStyleMotto(data,store);   
// }

// handleblurb(data){
//   this.setState({...data})
//   helper.getBlurb(data, store);
// }



    customValidateText(text) {
      return (text.length > 0 && text.length < 64);
    }

    render() {
        return (<div>

<ul><li>style motto : 
            <Edit
              validate={this.customValidateText}
              activeClassName="editing"
              text={this.props.stylemotto}
              paramName="stylemotto"
              change={this.dataChanged}
              style={{

                minWidth: 150,
                margin: 5,
                padding: 5,
                fontSize: 15,
                outline: 0,
                border: 0
              }}
            /><FaEdit className="icon" />
</li>


            
   
<li> blurb : 
            <Edit
              validate={this.customValidateText}
              activeClassName="editing"
              text={this.props.blurb}
              paramName="blurb"
              change={this.dataChanged}
              style={{

                minWidth: 150,
                margin: 5,
                padding: 5,
                fontSize: 15,
                outline: 0,
                border: 0
              }}
            /><FaEdit className="icon" />
          </li>
          </ul>
        </div>)
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


export default connect(mapStateToProps)(InLineEdit);
