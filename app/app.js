
// Include the Main React Dependencies
var React = require("react");
var ReactDOM = require("react-dom");
var routes = require("../config/routes.js").default;
import store from '../components/Redux/redux.js'
import {Provider} from 'react-redux'

// This file should not need to be changed
ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById("app"));



