
var Chat = require("./Chat.js").default;
var React = require("react");
var ReactDOM = require("react-dom");


var Main = React.createClass({
  render: function () {
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
});

module.exports = Main;