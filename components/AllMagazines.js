
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import helper from "../app/utils/helper.js";
import {Link} from 'react-router';
import ImageModal from "./ImageModal"

class AllMagazines extends React.Component {
    constructor(props) {
        super(props);
        // this.handleClick = this.handlesClick.bind(this);
    }
    componentDidMount(){
        //    helper.getMagazines(store, this.props.userid);
        helper.getAllMagazines(store);
        // set modal to false initially
        store.dispatch({ 
            type: 'PROFILE_MODAL',
            profileModal: false
        })
    }
   
    handleClick(e, userid){
        //  the userid to display modal or something
        console.log(userid);
        // launch the modal
        store.dispatch({ 
            type: 'PROFILE_MODAL',
            profileModal: true
        })
         store.dispatch({ 
            type: 'UPDATE_PROFILE_ID',
            profileuserid: userid
        })


    }
    render() {
        var component = this;
        console.log("all magazines", this.props.allmagazines);
        var modal = "";
        if (this.props.profileModal){
                modal = <ImageModal />
        }
        if (this.props.allmagazines){

            
          
                var resultComponents = this.props.allmagazines.map(function(result) {
                
                return <div className="results" key={result._id}>
                    <div className="col-sm-6 col-md-4">
                        <div className="thumbnail">
                            <img src={result.src} />
                            <div><strong>Style Item Description</strong> {result.description}</div> 
                            <div><strong>Name</strong> {result.magazine_profile[0].facebook.firstName}  {result.magazine_profile[0].facebook.lastName}</div> 
                            <div><strong>Stylist Style Motto</strong> {result.magazine_profile[0].stylemotto}</div> 
                            <div><strong>About Stylist</strong> {result.magazine_profile[0].blurb}</div>
                            
                            {/*  put button that opens profile of user  ref by id  {result.magazine_profile[0].facebook.id}*/} 
                            <button  className="btn btn-link" onClick={(e) => component.handleClick(e, result.magazine_profile[0].facebook.id)} >View Profile</button> 
                            {/*  pass in userid of current into modal component, launch when button clicked}*/} 
                            {modal}
                        </div>
                    </div>
                </div>
            })
        }
       
// <a href="/chat/{{resultComponents}}" onclick="switchRoom(\'{resultComponents}\')"> {resultComponents} </a><
        return (<div>
                    <div className="col-xs-12 magazines"><h1>Latest Magazines</h1>
                        <div className="row results">{resultComponents}</div>
                    </div>  
                </div>) 
            }
};


const mapStateToProps = (store,ownProps) => {

    return {
        userid: store.chatState.userid,
        allmagazines: store.mainState.allmagazines,
        profileModal: store.mainState.profileModal,
        profileuserid: store.mainState.profileuserid,
    }

}

export default connect(mapStateToProps)(AllMagazines);