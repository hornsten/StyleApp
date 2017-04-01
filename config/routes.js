import React from "react";
import ReactRouter from "react-router";
import IndexRoute from "react-router";
import Main from "../components/Main.js"
import {Router, Route, hashHistory, browserHistory} from "react-router";
import GroupChat from "../components/GroupChat.js";
import PrivateChat from "../components/PrivateChat.js";
import ClosetPicker from "../components/ClosetPicker.js";
import Profile from "../components/Profile.js";
import RoomSummary from "../components/RoomSummary.js";
import Home from "../components/Home.js";


var routes = (
    <Router history={browserHistory}>
        <Route component={Main} >
                <Route path='/' component={Home} />
                <Route path='/group' component={RoomSummary} />
                <Route path='/private' component={PrivateChat} />
                <Route path='/closet' component={ClosetPicker} />
                <Route path='/profile' component={Profile} />
                <Route path='/group/:room' component={GroupChat} />
        </Route>
    </Router>
)

export default routes;