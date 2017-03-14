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
                    <form className="well addName" action="">
                        Name<input autoComplete="off" id="name"/>
                        <a href='/chat'><button>Add Name</button></a>
                    </form>
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