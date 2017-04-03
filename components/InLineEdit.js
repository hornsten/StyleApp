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

      store.dispatch({
        type: 'UPDATE_INSPIRATION',
        inspiration: 'click to add style inspiration'
      })


      store.dispatch({
        type: 'UPDATE_DESIGNER',
        designer: 'click to fav designers'
      })


    }
    componentWillMount(){
       helper.getStyleMotto(store,""); 
       helper.getBlurb(store,"");
       helper.getInspiration(store,""); 
       helper.getDesigner(store,"");
      //  helper.getBlurb(store,"");
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
        if (data.inspiration){
            helper.setInspiration(data.inspiration,store); 
              store.dispatch({
                type: 'UPDATE_INSPIRATION',
                inspiration: data.inspiration
              })

         } 
         if (data.designer){
            helper.setDesigner(data.designer, store);
                 store.dispatch({
                  type: 'UPDATE_DESIGNERS',
                  designer: data.designer
                })
         }
    }


    customValidateText(text) {
      return (text.length > 0 && text.length < 64);
    }

    render() {

        if (this.props.stylemotto){
          var styleMotto = <div className="row"><div className="col-md-2"><strong>Style Motto: </strong> </div>
            <div className="col-md-8">
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
         
            </div>
            </div>
        }

         if (this.props.blurb){
          var styleBlurb = <div className="row"><div className="col-md-2"><strong>Style Vision: </strong> </div>
            <div className="col-md-8">
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
              /><FaEdit className="icon" />
         
            </div>
            </div>
        }
        if (this.props.inspiration){
          var inspireMotto = <div className="row"><div className="col-md-2"><strong>Style Inspiration: </strong></div>
            <div className="col-md-8">
            <Edit
              validate={this.customValidateText}
              activeClassName="editing"
              text={this.props.inspiration}
              paramName="inspiration"
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
          </div>

            </div>
        }

if (this.props.designer){
          var designerMotto = <div className="row"><div className="col-md-2"><strong>Favorite Designers: </strong></div>
          <div className="col-md-8">
            <Edit
              validate={this.customValidateText}
              activeClassName="editing"
              text={this.props.designer}
              paramName="designer"
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
            </div>
            </div>
            
        }

        return (<div>
          {styleMotto}
          <br />
           {styleBlurb} 
             <br />
           {designerMotto}
             <br />
            {inspireMotto}
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
      inspiration: store.userState.inspiration,
      designer: store.userState.designer,
    }
};


export default connect(mapStateToProps)(InLineEdit);
