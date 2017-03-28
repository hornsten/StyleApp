import React, { Component } from "react";



class Home extends React.Component {
      constructor(props) {
      super(props);
   
}

 handleClick(e) {
    e.preventDefault();
 }



     render(){
          return(
        
    <div className="jumbotron sharp"> 
    <div className="row">
       <div className="col-xs-3">
       <h1>Style App</h1>
       <p>Share your style with your friends!</p>
       </div>
       <div className="col-xs-9">
      
        <video id="video-background" autoPlay loop width="auto" height="400">
             <source src="../assets/img/style_video.m4v" type="video/mp4"></source>
        </video>
        </div>
        </div>
    </div>
 

          )
      }
}

export default Home;