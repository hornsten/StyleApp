
import ReactDOM from "react-dom";
import React from "react";
import UserList from "./UserList.js";

class Users extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        // console.log("propse in users", this.props.users);
        return (<div className="user-list">
                    <strong>USERS</strong>
                        <UserList users={this.props.users}/>
                        <div id="users"></div>
                </div>);
    }
};

export default Users;