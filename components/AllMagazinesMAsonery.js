
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import helper from "../app/utils/helper.js";
import {Link} from 'react-router';
import ImageModal from "./ImageModal";
var Masonry = require('react-masonry-component');

var masonryOptions = {
    transitionDuration: 0
};
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

             var childElements = this.props.allmagazines.map(function(result, index) { 
           return (
              
                    <div className="thumbnail col-xs-12 col-sm-4" key={result._id}>
            <div><strong><h4 className="text-center">{result.magazine_profile[0].facebook.firstName}  {result.magazine_profile[0].facebook.lastName}</h4></strong></div> 
                                    <div><em><p className="text-center">{result.magazine_profile[0].stylemotto}</p></em></div>                               
                                        <img src={result.src} onClick={(e) => component.handleClick(e, result.magazine_profile[0].facebook.id)}/>
     {modal}
                       <div className="text-center"> {result.description}</div>     
                    </div>
               
            );
        });

            /*var resultComponents = this.props.allmagazines.map(function(result, index) {     
                        return <div className="results" key={result._id} className="pull-left style-story">
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
             })*/
        }
       
// <a href="/chat/{{resultComponents}}" onclick="switchRoom(\'{resultComponents}\')"> {resultComponents} </a><
        return (
            <div>
        <Masonry
                className={'row results'} // default ''
                elementType={'div'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            >

                {childElements}
            </Masonry>
        
        
       </div>
        
                ) 
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

