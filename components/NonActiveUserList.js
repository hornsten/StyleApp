
import ReactDOM from "react-dom";
import React from "react";


class NonActiveUserList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.users){
     
            var component=this;
    
            var resultComponents = this.props.users.map(function(result) {
            // check to see if this is the current user or a user with which we are already having a prvate chat - if so don;t add hyperlink


            
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

export default NonActiveUserList;