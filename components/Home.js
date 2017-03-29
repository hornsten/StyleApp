import React, { Component } from "react";
import helper from "../app/utils/helper.js";
import store from './Redux/redux.js';
import ReactDOM from "react-dom";
import Magazine from './Magazine';


class Home extends React.Component {
      constructor(props) {
      super(props);
   
}

 handleClick(e) {
    e.preventDefault();
 }

// componentDidMount(){
//     // get images for each section
//     helper.getMagazines(store, this.props.userid);
    
//     // set to default initially
//     store.dispatch({ 
//       type: 'ITEM_CHANGE',
//       item: "SELECT"
//     })

//     store.dispatch({ 
//       type: 'SUCCESSFUL_SAVE',
//       imagesavedsuccess: false
//     })
//   }

     render(){
          return(
<div>        
    <div className="jumbotron sharp"> 
    <div className="row">
       <div className="col-xs-4">
       <h1>Style App</h1>
       <ul>
       <li><h4>Upload your wardrobe</h4></li>
       <li><h4>Create outfits</h4></li>
       <li><h4>Share your style with your friends!</h4></li>  
       </ul>
       </div>
       <div className="col-xs-8">
      
        <video id="video-background" autoPlay loop width="auto" height="400">
             <source src="../assets/img/style_video.m4v" type="video/mp4"></source>
        </video>
        </div>
        </div>
    </div>
       <div className="magazine">    
                  <ul>
                    <Magazine />
                  </ul>
              </div> 
</div>
          )
      }
}

export default Home;