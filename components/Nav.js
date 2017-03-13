var React = require("react");
var ReactDOM = require("react-dom");
var helper = require("../app/utils/helper.js");

// must use .default on component e.g. var Main = require(./component/Main.js).default

import {connect } from 'react-redux';
import store from './Redux/redux.js'

// e.g. do the below instead of set state when required
// this maps to the redux.js file
// store.dispatch({ 
//     type: 'SEARCH_TOPIC',
//     topic: ""
// });






var Nav = React.createClass({
    render: function () {
        return (<div>
         <Link to='/chat'>Chat</Link>

        </div>);
    }
});

// anything that was state now becomes props
// there will be NO state properties in this file - they are set in the redux store and mapped to properties in this file below:
// var mapStateToProps = function(store,ownProps){
//     return {
//         test: store.testState.test,
//     }
// };
export default Nav;
// export default connect(mapStateToProps)(Search);

// ref: https://css-tricks.com/learning-react-container-components/