import React, { Component } from "react";
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import Clothesbin from './Clothesbin';
import Image from './Image';
import ItemTypes from './ItemTypes';
import ClosetItems from "./ClosetItems.js";
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
var html2canvas = require('html2canvas');


@DragDropContext(HTML5Backend)
class ClosetPicker extends React.Component {
   constructor(props) {
      super(props);
      // listener for incoming closet data from socket
      chathelper.updatecloset_listener(store);

    this.state = {
      clothesbins: [
         { accepts: [ItemTypes.TOP], lastDroppedItem: null },
         { accepts: [ItemTypes.BAG], lastDroppedItem: null},
        { accepts: [ItemTypes.ACCESSORY], lastDroppedItem: null },
           { accepts: [ItemTypes.FLAIR], lastDroppedItem: null},
           { accepts: [ItemTypes.SHOES], lastDroppedItem: null},
         { accepts: [ItemTypes.BOTTOM,ItemTypes.DRESS], lastDroppedItem: null }
        
        
      ],
      images: [
       { id: 'bottom_201393774.png', type: ItemTypes.BOTTOM,src:'../assets/img/bottom_201393774.png' },
        { id: 'bottom_201234566.png', type: ItemTypes.BOTTOM,src:'../assets/img/bottom_201234566.png' },
        { id: 'top_199987425.png', type: ItemTypes.TOP, src:'../assets/img/top_199987425.png' },
        { id: 'dress_201591292.png', type: ItemTypes.DRESS, src: '../assets/img/dress_201591292.png' },
        { id: 'bag_567ec3a81fe.png', type: ItemTypes.BAG, src: '../assets/img/bag_567ec3a81fe.png' },
        { id: 'watch_203456789.png', type: ItemTypes.ACCESSORY, src: '../assets/img/watch_203456789.png' },
        { id: 'flair_683904dea.png', type: ItemTypes.FLAIR, src: '../assets/img/flair_683904dea.png' },
        { id: 'shoes_202012027.png', type: ItemTypes.SHOES, src: '../assets/img/shoes_202012027.png' },
      ],
      droppedImageIds: [],
    };
  }

isDropped(imageId) {
    return this.state.droppedImageIds.indexOf(imageId) > -1;
  }

ondragstart(e){
        // var imageSrc = ReactDOM.findDOMNode(this.drag)
        // console.log("img", imageSrc);
        // e.dataTransfer.setData('text/uri-list', imageSrc);
   
        // e.dataTransfer.setData('text/uri-list',   e.target.src);
        // /console.log(e.target.result, "result");
        // console.log(result);
        // e.target.src gives the url of the file but I only want the file username
        // so this should be put in the id field and grabbed from there
        e.dataTransfer.setData('text/plain-text',e.target.id );
        console.log(e.target.id, "id");
        // img.dataTransfer.setData('text/plain', 'Drag Me Button');
        this.className = 'hover'; 
        return false;
    }

 handleClick(e) {
e.preventDefault();
 html2canvas(document.getElementsByClassName('clothes-items'), {
      background: '#fff',
      onrendered: function (canvas) {
                    var img = canvas.toDataURL("image/png");
                    var data = img.replace(/^data:image\/\w+;base64,/, "");
                    console.log(data,"data");
                 
                    chathelper.img_upload(data);
                    // window.open(img);
        }
    });

};


   render() {
       


const { images, clothesbins } = this.state; 
      return (
         <section className="container-fluid closet-container">
         <div className="row">

            <div id='clothesSet' className="col-md-12 closet-block rel"> 

            <div className="clothes-items backdrop mag" style={{ overflow: 'hidden', clear: 'both' }}>
            {clothesbins.map(({ accepts, lastDroppedItem, className }, index) =>
            
                <Clothesbin
                accepts={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={item => this.handleDrop(index, item)}
                key={index}
                />,
            )}
            </div>       
        </div>
         </div>
        <div className="row">

        
            
             <div className="col-md-12 closet-block">
             <div className="clothes-items">
                    <div className="closet-tabs-container">
                        <ul>
                            <li>Shoes</li>
                            <li>Shirts</li>
                            <li>Dresses</li>
                        </ul>
                        <div id="gallery">
                        
                        {/*{clothesImages}*/}
                         <div style={{ overflow: 'hidden', clear: 'both' }}>
                        {images.map(({ id,src, type }, index) =>
                            <Image
                            id={id}
                            src={src}
                            type={type}
                            isDropped={this.isDropped(src)}
                            key={index}
                            />,
                        )}
                        <button onClick={this.handleClick} className="btn btn-primary btn-lg">Save</button>
                    </div>
                 </div>
            </div>
            </div>
   
    </div>
    </div>
</section>
      )
   }
   handleDrop(index, item) {
    const { id } = item;

    var data = item;
    console.log("item", item);
    // add update state
    chathelper.sendclosetpicker(item, store);
    

    this.setState(update(this.state, {
      clothesbins: {
        [index]: {
          lastDroppedItem: {
            $set: item,
          },
        },
      },
      droppedImageIds: id ? {
        $push: [id],
      } : {},
    }));
  }
}


const mapStateToProps = (store,ownProps) => {

    return {
        // message: store.chatState.message,
        // file: store.chatState.file,
        // chat: store.chatState.chat,
        // server: store.chatState.server,
        // privatemessage: store.chatState.privatemessage,
        // showModal: store.chatState.showModal,
        updateClosetPicker: store.chatState.updateClosetPicker,
        updateClosetItems: store.chatState.updateClosetItems,

    }

};

export default connect(mapStateToProps)(ClosetPicker);