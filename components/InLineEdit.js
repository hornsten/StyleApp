import React,  {Component} from 'react';

import Edit from 'react-edit-inline';
import FaEdit from 'react-icons/lib/fa/edit';

import {connect } from 'react-redux';
import store from './Redux/redux.js';


class InLineEdit extends React.Component {

    constructor(props){
      super(props);
      this.dataChanged = this.dataChanged.bind(this);
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

    customValidateText(text) {
      return (text.length > 0 && text.length < 64);
    }

    render() {
        return (<div>


            <Edit
              validate={this.customValidateText}
              activeClassName="editing"
              text={this.state.message1}
              paramName="message"
              change={this.dataChanged}
              style={{

                minWidth: 150,
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 15,
                outline: 0,
                border: 0
              }}
            /><FaEdit className="icon" />



            
   

            <Edit
              validate={this.customValidateText}
              activeClassName="editing"
              text={this.state.message2}
              paramName="message"
              change={this.dataChanged}
              style={{

                minWidth: 150,
                display: 'inline-block',
                margin: 0,
                padding: 0,
                fontSize: 15,
                outline: 0,
                border: 0
              }}
            /><FaEdit className="icon" />
        </div>)
    }
}

export default InLineEdit;
