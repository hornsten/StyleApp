
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
        store.dispatch({ 
            type: 'SINGLE_IMAGE_MODAL',
            singleImageModal: false
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
        store.dispatch({ 
            type: 'SINGLE_IMAGE_MODAL',
            singleImageModal: false
        })

    }
    render() {
        var component = this;
        var modal = "";
        if (this.props.profileModal){
                modal = <ImageModal />
        }

        if (this.props.allmagazines){

            var resultComponents = this.props.allmagazines.map(function(result, index) {     
                        return <div className="results" key={result._id} className="pull-left  style-story">
                            <div>
                                
                                    <div className="thumbnail">
                                        <div><strong><h4 className="text-center">{result.magazine_profile[0].facebook.firstName}  {result.magazine_profile[0].facebook.lastName}</h4></strong></div> 
                                        <div><em><p className="text-center">{result.magazine_profile[0].stylemotto}</p></em></div>
                                    <br />
                                        <img src={result.src} onClick={(e) => component.handleClick(e, result.magazine_profile[0].facebook.id)}/>
                                        <div className="text-center"> {result.description}</div> 
                                        {modal}
                                    </div>
                                </div>
                        </div>
             })
        }
       
// <a href="/chat/{{resultComponents}}" onclick="switchRoom(\'{resultComponents}\')"> {resultComponents} </a><
        return (<div>
                    <div className="col-xs-12 magazines"><h2 className="text-center"><strong>Recent Style Stories</strong></h2>
                   <p className="text-center"><em>Click Image to View Stylist Profile</em></p>
                       <br />
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
        singleImageModal: store.mainState.singleImageModal,
        
    }

}

export default connect(mapStateToProps)(AllMagazines);

