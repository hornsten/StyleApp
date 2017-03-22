import React from "react";
import ReactRouter from "react-router";
import IndexRoute from "react-router";
import ChatMain from "../components/ChatMain.js";
import Container from "../components/Main.js"
import { Router, Route, hashHistory } from 'react-router'; 

import ViewChat from "../components/ViewChat.js";
import LaunchChat from "../components/LaunchChat.js";

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

      <Route path='/' component={Main} />
 
  </Router>
)



/*var routes = (
    <Router history={hashHistory}>
        <IndexRoute component={Container} />
        <Route path='/' component={Container} /> 
        <Route path='/' component={ChatMain} />
        
    </Router>
)*/

export default routes;