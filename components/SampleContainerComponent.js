import React from "react";
import ReactDOM from "react-dom";
import APIKey from '../config/APIKEY.js';
import Results from "./Results.js";
import helper from"../app/utils/helper.js";
import Saved from "./Saved.js";
import {connect } from 'react-redux';
import store from './redux.js';

// https://daveceddia.com/react-es5-createclass-vs-es6-classes/
// class InputControlES6 extends React.Component {
//   constructor(props) {
//     super(props);

//     // Set up initial state
//     this.state = {
//       text: props.initialValue || 'placeholder'
//     };

//     // Functions must be bound manually with ES6 classes or Another way is to bind them inline, where you use them 
//     this.handleChange = this.handleChange.bind(this);
//   }

class Search extends React.Component {

    constructor(props) {
        super(props);

        // Functions must be bound manually with ES6 classes or Another way is to bind them inline, where you use them 
        this.handleData = this.handleData.bind(this);
        this.updateTopic = this.updateTopic.bind(this);
        this.updateStartDate = this.updateStartDate.bind(this);
        this.updateEndDate = this.updateEndDate.bind(this);
        this.handleClick  = this.handleClick.bind(this);
        this.handleSavedData  = this.handleSavedData.bind(this);


    }
   
    // getInitialState: function() {
    //     return {
    //         topic: "",
    //         startdate: "",
    //         enddate: "",
    //         results: [],
    //         saved: []
    //     }
    // },
    handleData(result){
        // sets state of results and resets input fields
        if (result !== undefined){

            // this.setState({
            // topic: "",
            // startdate: "",
            // enddate: "",
            // results: result
            // });
            store.dispatch(    {
                type: 'SEARCH_RESULTS',
                results: result
                        });
        } else {
            console.log(" in ehere")
            // this.setState({
            //     topic: "",
            //     startdate: "",
            //     enddate: "",
            //     results: []
            // });
            store.dispatch({ 
            //     type: 'SEARCH_TOPIC',
            //     topic: ""
            // }, { 
            //     type: 'SEARCH_STARTDATE',
            //     startdate: ""
            // }, { 
            //     type: 'SEARCH_ENDDATE',
            //     enddate: ""
            // }, {
                
                type: 'SEARCH_RESULTS',
                results: []
            });  
        }
    }

    updateTopic(e) {
    //     this.setState({
    //     topic: e.target.value
    // })
        store.dispatch({ 
            type: 'SEARCH_TOPIC',
            topic: e.target.value
        })
    }

    updateStartDate(e) {
        // this.setState({
        // startdate: e.target.value
        // })
        store.dispatch({ 
            type: 'SEARCH_STARTDATE',
            startdate: e.target.value
        })
    }

    updateEndDate(e) {
        // this.setState({
        // enddate: e.target.value
        // })
        store.dispatch({ 
            type: 'SEARCH_ENDDATE',
            enddate: e.target.value
        })
    }

    // This function will respond to the user input
    // change anything that was state to props
    handleClick() {
        // gets article data from express server
        if ((this.props.topic !== "") && (this.props.startdate !== "") && (this.props.enddate !== "")){
            if ((this.props.startdate.length === 8 ) || (this.props.enddate.length === 8 )) {
                var searchQuery = "/search/"+this.props.topic+"/"+this.props.startdate+"/"+this.props.enddate;
                // use ESX6 Syntax to maintain 'this' context
                helper.runQuery(searchQuery).then((response) => {
                    this.handleData(response.docs)
                })
            }

        } 

    }

    handleSavedData(result){
        // this.setState({
        //     saved: result,
        // })
        console.log(result, "result")
        store.dispatch({ 
            type: 'SEARCH_SAVED',
            saved: result
        })
    }

    componentDidMount(){
        // get data for passing to then component on load
        helper.querySaved().then((response) => {
            this.handleSavedData(response)
        })    
    }

    render() {

        return (<div>
                    <div className="panel panel-default">
                        <div className="panel-heading text-center"><h4>Search</h4></div>
                        <div className="panel-body">
                            <div className="form-group">
                                <label htmlFor="topic">Topic</label>
                                <input type="text"  className="form-control" onChange={this.updateTopic}  maxLength="70" id="topic" name="topic" required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="start-date">Start Date (YYYYMMDD)</label>
                                <input type="text" value={this.props.startdate}  onChange={this.updateStartDate}  maxLength="8" className="form-control" id="startdate" name="startyear" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="end-date">End Year (YYYYMMDD)</label>
                                <input type="text" value={this.props.enddate} onChange={this.updateEndDate} name="quantity" maxLength="8" className="form-control" id="enddate" name="endyear" />
                            </div>
                        <button onClick={this.handleClick} type="submit" className="btn btn-default btn-primary">Search</button>
                        </div>
                    </div>
                    <div>
                        <Results results={this.props.results} handleSavedData={this.handleSavedData}/>
                        <Saved saved={this.props.saved} handleSavedData={this.handleSavedData}/>
                        

                    </div>
                </div>
                 
      );
    }
}

// anything that was state now becomes props

const mapStateToProps = (store,ownProps) => {
    return {
        saved: store.searchState.saved,
        topic:  store.searchState.topic,
        startdate: store.searchState.startdate,
        enddate: store.searchState.enddate,
        results: store.searchState.results
    }
};

// const mapStateToProps = (state) => {
//     return {
//         fileList: state.fileList
//     };
// };
// module.exports = Search;
export default connect(mapStateToProps)(Search);
