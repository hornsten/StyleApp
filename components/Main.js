
import ReactDOM from "react-dom";
import React from "react";
import Chat from "./Chat.js";


class Main extends React.Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (<div>
                    <div className="jumbotron">
                        <div className="page-header">
                        TEST
                        </div>
                    </div>
                    
                    <div class="row">
                        <div className="col-md-4"></div>
                        
                        <div className="col-md-4">{this.props.children}</div>
                        
                        <div className="col-md-4"></div>
                    </div>
                </div>);
    }
};

export default Main;