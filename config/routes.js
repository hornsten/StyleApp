var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory =  ReactRouter.hashHistory;
var IndexRoute = require("react-router").IndexRoute;

// e.g. sample
// var routes = (
//     <Router history={hashHistory}>
//         // <Route IndexRoute component={Main}>
//         //     <Route path='/' component={Search}/>
//         //     <Route path='/' component={Results} />
//         //     <Route path='/' component={Saved}/>
//         // </Route>  
//     </Router>
// )

var routes = (
    <Router history={hashHistory}>

    </Router>
)

module.exports = routes;