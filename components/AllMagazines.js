
import ReactDOM from "react-dom";
import React from "react";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import helper from "../app/utils/helper.js";
import {Link} from 'react-router';


class AllMagazines extends React.Component {
    constructor(props) {
        super(props);
        // this.handleClick = this.handlesClick.bind(this);
    }
    componentDidMount(){
        //    helper.getMagazines(store, this.props.userid);
        console.log("is this being called at all and when?");
           helper.getAllMagazines(store);
    }
   
    handleClick(e, userid){
        console.log("profile", userid);
        // use the userid to display modal or something


    }
    render() {
        var component = this;
        // console.log('ALL MAGAZINES!!: ',this.props.allmagazines);
        if (this.props.allmagazines){
          
                var resultComponents = this.props.allmagazines.map(function(result) {
                // dont hyperlink current room
                var profileUserid = result.magazine_profile[0].facebook.id;
                
                return <div className="results" key={result._id}>
                    <div className="col-sm-6 col-md-4">
                        <div className="thumbnail">
                        <img src={result.src} />
                        <div><strong>Style Item Desription</strong> {result.description}</div> 
                        <div><strong>Name</strong> {result.magazine_profile[0].facebook.firstName}  {result.magazine_profile[0].facebook.lastName}</div> 
                        <div><strong>Stylist Style Motto</strong> {result.magazine_profile[0].stylemotto}</div> 
                        <div><strong>About Stylist</strong> {result.magazine_profile[0].blurb}</div>
                        
                        {/*  put button that opens profile of user  ref by id  {result.magazine_profile[0].facebook.id}*/} 
                       <button className="btn btn-link" onClick={(e) => component.handleClick(e, profileUserid)} >View Profile</button> 
                       
                        <div className="caption">
        <h3>Thumbnail label</h3>
        <p>...</p>
        <p><button href="#" className="btn btn-link" role="button" >View Profile</button> <a href="#" className="btn btn-link" role="button">Button</a></p>
      </div>
                        </div>
                        </div>
                </div>
            })
        }
       
// <a href="/chat/{{resultComponents}}" onclick="switchRoom(\'{resultComponents}\')"> {resultComponents} </a><
        return (<div>
                    <div className="col-xs-12 magazines"><h1>Latest Magazines</h1>
                        <div className="row results">{resultComponents}</div>
                    </div>  
                </div>) 
            }
};



const mapStateToProps = (store,ownProps) => {

    return {
        userid: store.chatState.userid,
        allmagazines: store.mainState.allmagazines
   
    }

}

export default connect(mapStateToProps)(AllMagazines);