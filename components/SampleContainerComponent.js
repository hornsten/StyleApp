var React = require("react");
var ReactDOM = require("react-dom");
var helper = require("../app/utils/helper.js");

import {connect } from 'react-redux';
import store from './Redux/redux.js'

// e.g. do the below instead of set state when required
// this maps to the redux.js file
// store.dispatch({ 
//     type: 'SEARCH_TOPIC',
//     topic: ""
// });

var Search = React.createClass({
    render: function () {
        return (<div>
                    
                </div>);
    }
});

// anything that was state now becomes props
// there will be NO state properties in this file - they are set in the redux store and mapped to properties in this file below:
const mapStateToProps = function(store){
    return {
        topic: store.searchState.topic,
        startdate: store.searchState.startdate,
        enddate: store.searchState.enddate,
        results: store.searchState.results
    }
};
// module.exports = Search;
export default connect(mapStateToProps)(Search);

// ref: https://css-tricks.com/learning-react-container-components/