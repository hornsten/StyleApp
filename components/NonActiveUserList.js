
import ReactDOM from "react-dom";
import React from "react";
import {Modal, Dialog, Button} from 'react-bootstrap';

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
               <Button bsStyle='default' active className="user-list-other text-center">{result.username}</Button> 
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