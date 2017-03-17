
import ReactDOM from "react-dom";
import React from "react";


class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
       console.log("props", this.props.users)
        if (this.props.users){
        var resultComponents = this.props.users.map(function(result) {
            return <div className="row results" key={result._id}>
                <div className="col-md-4 text-center">{result.username}</div>
            </div>
        });
        }
        return (<div>
                    <div className="col-sm-12">
                        <div className="row results"><div>{resultComponents}</div></div>
                    </div>  
                </div>) 
            }
};

export default UserList;