import React from "react";
import ReactRouter from "react-router";
import IndexRoute from "react-router";
import ChatMain from "../components/ChatMain.js";
import Main from "../components/Main.js"
import {Router, Route, hashHistory, browserHistory} from "react-router";
import GroupChat from "../components/GroupChat.js";
import PrivateChat from "../components/PrivateChat.js";
import NavBar from "../components/NavBar.js";
import ClosetPicker from "../components/ClosetPicker.js";
import Profile from "../components/Profile.js";

// e.g. sample
// var routes = (s
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
    <Router history={browserHistory}>
        <Route path="/" component={Main} >
            <Route IndexRoute path="/" component={NavBar} />
            <Route path="/chat" component={ChatMain} >
                <Route path='/group' component={GroupChat} />
                <Route path='/private' component={PrivateChat} />
            </Route>
            <Route path='/closet' component={ClosetPicker} />
             <Route path='/profile' component={Profile} />
        </Route>
    </Router>
)

export default routes;