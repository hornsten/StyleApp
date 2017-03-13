
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
                <div className="well">
                    <ul id="messages"></ul>
                    <Chat />
                </div>
            </div>);
  }
});

module.exports = Main;