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

      store.dispatch({
        type: 'UPDATE_STYLEMOTTO',
        stylemotto: 'click to add style motto'
      })


      store.dispatch({
        type: 'UPDATE_BLURB',
        blurb: 'click to add style story'
      })


    }
    componentWillMount(){
       helper.getStyleMotto(store,""); 
       helper.getBlurb(store,"");
    }
    dataChanged(data) {

         if (data.stylemotto){
            helper.setStyleMotto(data.stylemotto,store); 
              store.dispatch({
                type: 'UPDATE_STYLEMOTTO',
                stylemotto: data.stylemotto
              })

         } 
         if (data.blurb){
            helper.setBlurb(data.blurb, store);
                 store.dispatch({
                  type: 'UPDATE_BLURB',
                  blurb: data.blurb
                })
         }
    }


    customValidateText(text) {
      return (text.length > 0 && text.length < 64);
    }

    render() {

        if (this.props.stylemotto){
          var styleMotto = <li>style motto : 
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
        }

         if (this.props.blurb){
          var styleBlurb = <li> blurb : 
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
        }
        return (
          <div>
            <ul>
              {styleMotto}
              {styleBlurb}  
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
      blurb: store.userState.blurb,
    }
};


export default connect(mapStateToProps)(InLineEdit);
