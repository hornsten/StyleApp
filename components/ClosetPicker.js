import React, { Component } from "react";
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import Clothesbin from './Clothesbin';
import Image from './Image';
import ItemTypes from './ItemTypes';
import ClosetItems from "./ClosetItems.js";

var html2canvas = require('html2canvas');


@DragDropContext(HTML5Backend)
class ClosetPicker extends React.Component {
   constructor(props) {
      super(props);
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
       { id: '201393774', type: ItemTypes.BOTTOM,src:'../assets/img/bottom_201393774.png' },
        { id: '201234566', type: ItemTypes.BOTTOM,src:'../assets/img/bottom_201234566.png' },
        { id: '199987425', type: ItemTypes.TOP, src:'../assets/img/top_199987425.png' },
        { id: '201591292', type: ItemTypes.DRESS, src: '../assets/img/dress_201591292.png' },
        { id: '567ec3a81fe', type: ItemTypes.BAG, src: '../assets/img/bag_567ec3a81fe.png' },
        { id: '203456789', type: ItemTypes.ACCESSORY, src: '../assets/img/watch_203456789.png' },
        { id: '683904dea', type: ItemTypes.FLAIR, src: '../assets/img/flair_683904dea.png' },
        { id: '202012027', type: ItemTypes.SHOES, src: '../assets/img/shoes_202012027.png' },
      ],
      droppedImageIds: [],
    };
  }

isDropped(imageId) {
    return this.state.droppedImageIds.indexOf(imageId) > -1;
  }


 handleClick(e) {
e.preventDefault();
 html2canvas(document.getElementsByClassName('clothes-items'), {
      background: '#fff',
      onrendered: function (canvas) {
                    var img = canvas.toDataURL("image/png")
                    window.open(img);
        }
    });

};


   render() {
       
    // let {dashboard, dispatch} = this.props;
    //   let {sideNavExpanded, onDisplay, closetItems} = dashboard;
      
    //   let clothesImages = Object.keys(closetItems).map((imgKey,index)=> {

    //       return <img id={imgKey} key={imgKey} src={closetItems[imgKey].src}/>
    //   })

const { images, clothesbins } = this.state; 
      return (
         <section className="container-fluid closet-container">
        
            <div id='clothesSet' className="col-md-7 closet-block rel"> 

        <div className="clothes-items backdrop paris" style={{ overflow: 'hidden', clear: 'both' }}>
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
             <div className="col-md-5 closet-block">
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
</section>
      )
   }
   handleDrop(index, item) {
    const { id } = item;

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

export default ClosetPicker;
