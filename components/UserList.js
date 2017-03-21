
import ReactDOM from "react-dom";
import React from "react";


class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.users){
            var currentusername =  this.props.username;
            var connecteduser = "";
            var component=this;
            var currentroom = this.props.currentroom;
            
            var resultComponents = this.props.users.map(function(result) {
            // console.log("userlist curretn room", this.props.currentroom)
            
                if ((result.username === currentroom) || (result.username === currentusername)) {
                        connecteduser = result.username;
                } else {
                        // hyperlink not dsipalying properlyx
                        connecteduser = <div className="room-list-other" onClick={() => component.props.switchRoom(result.username, 'Private')}> {result.username} </div>
                    
                }
                return <div className="row results" key={result._id}>
                    <div className="col-md-4 text-center">{connecteduser}</div>
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