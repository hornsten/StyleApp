var React = require("react");
var ReactRouter = require("react-router");
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var hashHistory =  ReactRouter.hashHistory;
var IndexRoute = require("react-router").IndexRoute;
var Chat = require("../components/Chat.js").default
var Main = require("../components/Main.js").default
var Name = require("../components/Name.js").default
var Menu = require("../components/Menu.js").default
var PrivateChat = require("../components/PrivateChat").default
var Private = require("../components/Private").default
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

//   <Router history={hashHistory}>
//     <Route path="/" component={App}>
//       <Route path="/repos" component={Repos}/>
//       {/* add the new route */}
//       <Route path="/repos/:userName/:repoName" component={Repo}/>
//       <Route path="/about" component={About}/>
//     </Route>
//   </Router>

var routes = (
    <Router history={hashHistory}>
        <Route path="/" component={Main} /> 
    </Router>
)

export default routes;