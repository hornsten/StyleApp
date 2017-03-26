import React, { Component } from "react";
import ReactDOM from "react-dom";
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
import helper from "../app/utils/helper.js";
var html2canvas = require('html2canvas');


@DragDropContext(HTML5Backend)
class ClosetPicker extends React.Component {
   constructor(props) {
      super(props);
      // listener for incoming closet data from socket
      chathelper.updatecloset_listener(store);
      this.uploadFile = this.uploadFile.bind(this);
 
    this.state = {
      clothesbins: [
         { accepts: [ItemTypes.TOP], lastDroppedItem: null },
         { accepts: [ItemTypes.BAG], lastDroppedItem: null},
        { accepts: [ItemTypes.ACCESSORY], lastDroppedItem: null },
           { accepts: [ItemTypes.FLAIR], lastDroppedItem: null},
           { accepts: [ItemTypes.SHOES], lastDroppedItem: null},
         { accepts: [ItemTypes.BOTTOM,ItemTypes.DRESS], lastDroppedItem: null }
        
        
      ],
      droppedImageIds: [],
    };
  }
isDropped(imageId) {
    return this.state.droppedImageIds.indexOf(imageId) > -1;
  }
  componentDidMount(){
    // get images
     helper.getImages(store);
     ReactDOM.findDOMNode(this.inputEntry).value = "";
      // set to default initially
      store.dispatch({ 
        type: 'ITEM_CHANGE',
        item: "SELECT"
      })

      store.dispatch({ 
        type: 'SUCCESSFUL_SAVE',
        imagesavedsuccess: false
      })
  }

uploadFile(e) {
  // var itemType = ReactDOM.findDOMNode(this.closetItemType).value;
  // console.log(itemType, "itemType");
  // console.log("calling this$$$", e.target.value);
  // Make sure a valid type entered before saving file
  console.log("this.props.itemtype", this.props.itemtype);
  //reset old error message
  store.dispatch({ 
  type: 'CLOSET_ERROR',
  closeterror: false
})
  if (this.props.item !== "SELECT"){
     helper.uploadToCloset(e, store);
    
      // RESET DOM
     
  } 
  else {
    // send error message
    store.dispatch({ 
      type: 'CLOSET_ERROR',
      closeterror: true
    })
     
   
    // send error message
    // store.dispatch({ 
    //   type: 'INPUT_FILE',
    //   file: e.target.files
    // })

  }

}
handleItemType(e){
  console.log("item type chagne this$$$", e.target.id);
  store.dispatch({ 
      type: 'TYPE_CHANGE',
      itemtype: e.target.id
  })
  store.dispatch({ 
      type: 'ITEM_CHANGE',
      item: e.target.value
  })
  store.dispatch({ 
    type: 'SUCCESSFUL_SAVE',
    imagesavedsuccess: false
  })



  // reset any old file in input box
  ReactDOM.findDOMNode(this.inputEntry).value = "";

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
       
var ImageResults = "";

console.log("images", this.props.images);
if (this.props.images){

  ImageResults = this.props.images.map((result, index) =>
                            <Image
                            id={result.imageid}
                            src={result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={index}
                            />,
                        )

}




const { images, clothesbins } = this.state; 
      var error = "";
      if (this.props.closeterror){
         error = <div><strong>Please enter a valid clothing TYPE for your item!</strong><br/></div>
      }
      var message = "";
      if (this.props.imagesavedsuccess){
         message = "File Successfully Saved";
      }
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
         <button onClick={this.handleClick} className="btn btn-primary btn-lg">Save</button>
        <div className="form-group">
        {error}
        <label for="sel1">Select list Item Type, then upload file:</label>
        <select class="form-control" ref={ref => this.closetItemType = ref} onChange={(e) => this.handleItemType(e)} id="closetItemType">
          <option selected="selected" value={this.props.item}>SELECT</option>
          <option id="ItemTypes.BOTTOM" value="BOTTOM">BOTTOM</option>
          <option id="ItemTypes.TOP" value="ItemTypes.TOP">TOP</option>
          <option id="ItemTypes.DRESS" value="ItemTypes.DRESS">DRESS</option>
          <option id="ItemTypes.BAG" value="ItemTypes.BAG">BAG</option>
          <option id="ItemTypes.ACCESSORY" value="ItemTypes.ACCESSORY">ACCESSORY</option>
          <option id="ItemTypes.FLAIR" value="ItemTypes.FLAIR">FLAIR</option>
          <option id="ItemTypes.SHOES" value="ItemTypes.SHOES">SHOES</option>
        </select>
      </div> 
        <input type="file" id="siofu_input" label='Upload' accept='.png' name="file" ref="file" onChange={(e) => this.uploadFile(e)} ref = {ref => this.inputEntry = ref}/><br /> 
         {message}
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
                        {ImageResults}
                        
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
        updateClosetPicker: store.closetState.updateClosetPicker,
        updateClosetItems: store.closetState.updateClosetItems,
        images: store.closetState.images,
        itemtype: store.closetState.itemtype,
        closeterror: store.closetState.closeterror,
        item: store.closetState.item,
        file: store.closetState.file, 
        imagesavedsuccess: store.closetState.imagesavedsuccess, 
        
    }

};

export default connect(mapStateToProps)(ClosetPicker);