
import ReactDOM from "react-dom";
import React from "react";
import Chat from "./Chat.js";
import Name from "./Name.js";
import { Link } from 'react-router';

class Main extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (<div>
                    <div className="row">
                        <div className="col-md-4"></div>
                        
                        <div className="col-md-4">
                            <ul>
                                <li><Link to={`/name`} activeClassName="active">Add User Name </Link></li>
                                <li><Link to={`/chat`} activeClassName="active">Start Chat</Link></li>
                            </ul>
                        </div>
                        
                        <div className="col-md-4"></div>
                    </div>
                </div>);
    }
};

export default Main;