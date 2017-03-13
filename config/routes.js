var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory =  ReactRouter.hashHistory;
var IndexRoute = require("react-router").IndexRoute;
var Chat = require("../components/Chat.js").default
var Main = require("../components/Main.js").default

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
        <Route path="/" component={Main} >
            <IndexRoute component={Chat} />
            <Route path='/chat' component={Chat} />
        </Route>
        
            
    </Router>
)

export default routes;