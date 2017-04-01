import React, { Component, PropTypes } from 'react';
import ReactDOM from "react-dom";
import Image from './Image';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import helper from "../app/utils/helper.js";

class Tops extends React.Component {
  
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        // get images for each section
        helper.getImages(store, "top");
       
    }
    render() {
        var topResults = "";

        if (this.props.top){
        topResults = this.props.top.map((result, index) =>
            <Image
            id={result.imageid}
            src={result.src}
            type={result.type}
            isDropped={this.props.isDropped(result.src)}
            key={result.type+'_'+index}
            />,
        )
        }

        return  (<div className="row">
                    <li>Tops</li>
                    {topResults}
                </div>)

     }
}



const mapStateToProps = (store,ownProps) => {

    return {
        top: store.closetState.top, 
    }

};

export default connect(mapStateToProps)(Tops);