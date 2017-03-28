
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import helper from "../app/utils/helper.js";


class Magazine extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
           helper.getMagazines(store, this.props.userid);
    }
    render() {
        var component = this;
        
        if (this.props.magazines){
          
                var resultComponents = this.props.magazines.map(function(result) {
                // dont hyperlink current room
           
                return <div className="row results" key={result._id}>
                    <div className="col-md-4 text-center"><img src={result.src} style={{height:'50%', width: 'auto'}} /></div>
                </div>
            })
        }
       
// <a href="/chat/{{resultComponents}}" onclick="switchRoom(\'{resultComponents}\')"> {resultComponents} </a><
        return (<div>
                    <div className="col-sm-12 magazines"><h1>My Magazines</h1>
                        <div className="row results">{resultComponents}</div>
                    </div>  
                </div>) 
            }
};

const mapStateToProps = (store,ownProps) => {

    return {
        magazines: store.closetState.magazines,
        userid: store.chatState.userid,
   
    }

}

export default connect(mapStateToProps)(Magazine);