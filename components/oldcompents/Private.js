import ReactDOM from "react-dom";
import React from "react";
import helper from"../app/utils/helper.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';

// e.g. do the below instead of set state when required
// this maps to the redux.js file
// store.dispatch({ 
//     type: 'SEARCH_TOPIC',
//     topic: ""
// });

class Name extends React.Component{
    constructor(props){
        super(props);
    }
    render() {
        return (<div className="col-md-4">
                    <form className="well chatTo" action="">
                        Name<input autoComplete="off" id="chatToName"/>
                        <a href='/private/chat/user'><button>Start Chat</button></a>
                    </form>
                    <div>
                    {this.props.children}
                    </div>
                </div>);
    }
};

// anything that was state now becomes props
// there will be NO state properties in this file - they are set in the redux store and mapped to properties in this file below:
// var mapStateToProps = function(store,ownProps){
//     return {
//         test: store.testState.test,
//     }
// };
export default Name;
// export default connect(mapStateToProps)(Search);

// ref: https://css-tricks.com/learning-react-container-components/