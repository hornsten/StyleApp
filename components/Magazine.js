
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
        console.log('my mags: ',this.props.magazines);   
        if (this.props.magazines){
          
                var resultComponents = this.props.magazines.map(function(result) {
                // dont hyperlink current room
           
                return <div className="results" key={result._id}>
                    <div className="col-xs-12 col-sm-6">
                        <div className="thumbnail">
                        <img style={{width: 100, height: 110}} src={result.src} />
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
                    <div className="col-xs-12 magazines"><h1>My Magazines</h1>
                        <div className="row results">{resultComponents}</div>
                    </div>  
                </div>) 
            }
};



const mapStateToProps = (store,ownProps) => {

    return {
        magazines: store.closetState.magazines,
        userid: store.chatState.userid,
       allmagazines:store.mainState.allmagazines
   
    }

}

export default connect(mapStateToProps)(Magazine);