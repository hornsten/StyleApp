import React from "react";
import ReactRouter from "react-router";
import IndexRoute from "react-router";
import Main from "../components/Main.js";
import {Router, Route, hashHistory} from "react-router";

import ViewChat from "../components/ViewChat.js";

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
        <Route path="/chat/view" component={ViewChat} />
    </Router>
)

export default routes;