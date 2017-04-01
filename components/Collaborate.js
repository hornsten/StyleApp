
import ReactDOM from "react-dom";
import React from "react";
import helper from "../app/utils/helper.js";
import {Well} from 'react-bootstrap';
import {connect } from 'react-redux';
import store from './Redux/redux.js'

class Collaborate extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount(){
        helper.getRoomList().then((response) => {
             console.log(response);
            this.handleRoomData(response)
        })              
    }
    handleRoomData(response){
        // dispatches updates to redux store to update the state 
        store.dispatch({ 
            type: 'ROOM_LIST',
            rooms: response.data
        })
    }
    render() {
return(<div>TEST</div>)
      
       
// <a href="/chat/{{resultComponents}}" onclick="switchRoom(\'{resultComponents}\')"> {resultComponents} </a><
        return (<div>
                   <div className="col-md-12">
                        <div className="row results">{resultComponents}</div>
                    </div>
                </div>) 
            }
};

export default Collaborate;