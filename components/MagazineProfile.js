
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import helper from "../app/utils/helper.js";


class MagazineProfile extends React.Component {
    constructor(props) {
        super(props);
        
    }
    handleImageClick(e, image, description){
        console.log("in here", image, description);
        store.dispatch({ 
            type: 'SINGLE_IMAGE_MODAL',
            singleImageModal: true
        })

        this.setState({largeImage: image, largeDescription: description  } )
        console.log("largeImage in handle click ", this.state.largeImage);
        console.log("singleImageModal in handle click ", this.props.singleImageModal);

    }
    componentDidMount(){
        // reset local props
        this.setState({largeImage: "", largeDescription: ""  } )
        // console.log("largeImage in component did mount", this.state.largeImage);
        // set to false initally
        store.dispatch({ 
            type: 'SINGLE_IMAGE_MODAL',
            singleImageModal: false
        })
    }
    closeImage(){
        // reset to all images
        store.dispatch({ 
            type: 'SINGLE_IMAGE_MODAL',
            singleImageModal: false
        })
        console.log("largeImage in close click ", this.state.largeImage);
        console.log("singleImageModal in close click ", this.props.singleImageModal);

    }
    render() {
        var component = this;
        //   console.log("largeImage in  remder  ", this.state.largeImage);
        // toggle between large image and summary
           console.log("singleImageModal in render!! ", this.props.singleImageModal);
        if (this.props.singleImageModal){
            
             console.log("largeImage in close click ", this.state.largeImage);
           var resultComponents =  
            <div className="results col-md-12">
                    <div className="thumbnail">
                    <img src={this.state.largeImage}   onClick={(e) => component.closeImage()}/>     
                    <br />            
                    <p className="text-center"><strong>{this.state.largeDescription}</strong></p>
                </div>
            </div>

        } else if (!this.props.singleImageModal){
             if (this.props.profilemagazines){
          
                var resultComponents = this.props.profilemagazines.map(function(result) {
                // dont hyperlink current room
           
                return <div className="results" key={result._id}>
                        <div className="col-sm-6 col-md-4 ">
                            <div className="thumbnail">
                            <img src={result.src}   onClick={(e) => component.handleImageClick(e, result.src, result.description)}/>
                            <div className="caption">
                                <p className="text-center"><strong>{result.description}</strong></p>
                            </div>
                          </div>
                        </div>
                    </div>
                })
            }

        }
       
       
// <a href="/chat/{{resultComponents}}" onclick="switchRoom(\'{resultComponents}\')"> {resultComponents} </a><
        return (<div>
                    <div className="col-xs-12 magazines">
                        <br />
                        <h4 className="text-center">Stylist's Magazines</h4>
                        <p className="text-center"><em>Click Image to Toggle View</em></p>
                        <hr />
                        <div className="row results">{resultComponents}</div>
                    </div>  
                </div>) 
            }
};



const mapStateToProps = (store,ownProps) => {

    return {
        
        userid: store.chatState.userid,
        profilemagazines:store.mainState.profilemagazines,
        singleImageModal: store.mainState.singleImageModal,

   
    }

}

export default connect(mapStateToProps)(MagazineProfile);