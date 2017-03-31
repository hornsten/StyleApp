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
      this.handlestylemotto = this.handlestylemotto.bind(this);
      this.handleblurb = this.handleblurb.bind(this);
      this.state = {
          message1: 'enter stylemotto',
        message2: 'enter blurb'
      }
    }

    dataChanged(data) {
        // data = { description: "New validated text comes here" }
        // Update your model from here
        console.log(data)
         this.setState({...data})
    }

handlestylemotto(e){
   helper.getStyleMotto(e, store);   
}

handleblurb(e){
  helper.getBlurb(e, store);
}



    customValidateText(text) {
      return (text.length > 0 && text.length < 64);
    }

    render() {
        return (<div>

<ul><li>style motto : 
            <Edit
              validate={this.customValidateText}
              activeClassName="editing"
              text={this.state.message1}
              paramName="message"
              change={this.handlestylemotto}
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
              text={this.state.message2}
              paramName="message"
              change={this.handleblurb}
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
