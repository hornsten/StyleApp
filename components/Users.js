
import ReactDOM from "react-dom";
import React from "react";
import UserList from "./UserList.js";

class Users extends React.Component {

    render() {
        return (<div className="user-list">
                    <strong>USERS</strong>
                        <UserList />
                        <div id="users"></div>
                </div>);
    }
};

export default Users;