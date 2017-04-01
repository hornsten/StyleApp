
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import helper from "../app/utils/helper.js";


class MagazineProfile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var component = this;
        console.log('profile mags: ',this.props.profilemagazines);   
        if (this.props.profilemagazines){
          
                var resultComponents = this.props.profilemagazines.map(function(result) {
                // dont hyperlink current room
           
                return <div className="results" key={result._id}>
                    <div className="col-sm-6 col-md-4">
                        <div className="thumbnail">
                        <img src={result.src} />
                        <div className="caption">
                            <p><strong>{result.description}</strong></p>
                        </div>
                    </div>
                  </div>
                </div>
            })
        }
       
// <a href="/chat/{{resultComponents}}" onclick="switchRoom(\'{resultComponents}\')"> {resultComponents} </a><
        return (<div>
                    <div className="col-xs-12 magazines"><h1>Magazines</h1>
                        <div className="row results">{resultComponents}</div>
                    </div>  
                </div>) 
            }
};



const mapStateToProps = (store,ownProps) => {

    return {
        
        userid: store.chatState.userid,
        profilemagazines:store.mainState.profilemagazines
   
    }

}

export default connect(mapStateToProps)(MagazineProfile);