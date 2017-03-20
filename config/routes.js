import React from "react";
import ReactRouter from "react-router";
import IndexRoute from "react-router";
import ChatMain from "../components/ChatMain.js";
import {Router, Route, hashHistory} from "react-router";
import GroupChat from "../components/GroupChat.js";

import PrivateChat from "../components/PrivateChat.js";


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
        <Route IndexRoute path="/" component={ChatMain} >
            <Route path='/group' component={GroupChat} />
            <Route path='/private' component={PrivateChat} />
        </Route>
    </Router>
)

export default routes;