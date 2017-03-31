import React, { Component } from "react";
import update from 'react/lib/update';
import ReactDOM from "react-dom";
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';
import Clothesbin from './Clothesbin';
import Image from './Image';
import ItemTypes from './ItemTypes';
import {connect } from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
import helper from "../app/utils/helper.js";
var html2canvas = require('html2canvas');



@DragDropContext(HTML5Backend)
class InteractiveClosetPicker extends React.Component {
   constructor(props) {
      super(props);
      chathelper.updateclothesbin(store);
      chathelper.new_magazine_item_listener(store);
      this.resetClothesbins = this.resetClothesbins.bind(this);
      this.updateClothesBin = this.updateClothesBin.bind(this);
      // chathelper.updatecloset_listener(store);  // commented out for now as i dont think this does anything
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
// componentWillReceiveProps(){
//   console.log("componentWillReceiveProps")
//      if (this.props.items) {
//        console.log(this.props.items, "this.props.items");
//       this.handleDrop(this.props.index, this.props.items).bind(this);
//     } 
// }
// // shouldComponentUpdate(){
// //   console.log("shouldComponentUpdate")
// // }
// componentWillUpdate(){
//   console.log("componentWillUpdate")
//   console.log("componentWillReceiveProps")
//      if (this.props.items) {
//        console.log(this.props.items, "this.props.items");
//       this.handleDrop(this.props.index, this.props.items).bind(this);
//     } 
// }
// componentDidUpdate(){
//   console.log("componentDidUpdate")
//   console.log("componentWillReceiveProps")
//      if (this.props.items) {
//        console.log(this.props.items, "this.props.items");
//       this.handleDrop(this.props.index, this.props.items).bind(this);
//     } 
// }
// componentWillMount(){
//   console.log("componentWillMount")
//   console.log("componentWillReceiveProps")
//      if (this.props.items) {
//        console.log(this.props.items, "this.props.items");
//       this.handleDrop(this.props.index, this.props.items).bind(this);
//     } 
// }
isDropped(imageId) {
    return this.state.droppedImageIds.indexOf(imageId) > -1;
  }
  componentDidMount(){
    // get images for each section

    console.log("store Obj in interactive did mount", store.getState());
    helper.getImages(store, "top");
    helper.getImages(store, "bottom");
    helper.getImages(store, "accessory");
    helper.getImages(store, "shoes");
    helper.getImages(store, "bag");
    helper.getImages(store, "dress");
    helper.getImages(store, "flair");
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
componentDidUpdate(prevProps, prevState) {
  // only update chart if the data has changed

// console.log(prevProps, "prevprops");
console.log(prevProps.index, this.props.index)
console.log(prevProps.items , this.props.items) 
console.log(prevProps.itemid, this.props.itemid)
if ((prevProps.index !== this.props.index)){
  //  console.log("this prpos**********d");
   this.updateClothesBin(this.props.index, this.props.items, this.props.itemid);
} else if ((prevProps.itemid !== this.props.itemid)){
   console.log("this prpos**********d");
   this.updateClothesBin(this.props.index, this.props.items, this.props.itemid)
}
// console.log("state of store", store.getState())
// var Items = this.props.items;
// var Index = this.props.index;
// var ItemID = this.props.itemid
// if  ((Items) && (Index) && (ItemID)){
//   console.log("this prpos.", this.props.index, this.props.items, this.props.itemid);
//   this.updateClothesBin(this.props.index, this.props.items, this.props.itemid);
// }

  // if (prevProps.data !== this.props.data) {
  //   this.chart = c3.load({
  //     data: this.props.data
  //   });
  // }
}
uploadFile(e) {
  var itemType = ReactDOM.findDOMNode(this.closetItemType).value;
  // console.log(itemType, "itemType");
  // console.log("calling this$$$", e.target.value);
  // Make sure a valid type entered before saving file
  // console.log("this.props.itemtype", this.props.itemtype);
   // Make sure a valid type entered before saving file
  // console.log("itemtype", itemType);
  //reset old error message
  store.dispatch({ 
  type: 'CLOSET_ERROR',
  closeterror: false
})
  if (this.props.item !== "SELECT"){
     helper.uploadToCloset(e, itemType, store);   
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
 handleClick(e) {
  var userid = this.props.userid;
  e.preventDefault();
 html2canvas(document.getElementsByClassName('clothes-items'), {
      background: '#fff',
      logging: true,
      allowTaint: true, 
      // proxy: 'http://localhost:8080',  // removed 29 Mar
      onrendered: function (canvas) {
          var img = canvas.toDataURL();

          //  console.log(img,"img");
          // fs = require('fs');
          // sys = require('sys');
          // string generated by canvas.toDataURL()
          // // var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
          //     + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
          //     + "3gAAAABJRU5ErkJggg==";
          // strip off the data: url prefix to get just the base64-encoded bytes
          var data = img.replace(/^data:image\/\w+;base64,/, "");
        
          chathelper.img_upload(data, userid);
      
          // .replace(/^data:image\/png;base64,/, "");
          // var binaryData = new Buffer(img, 'base64').toString('binary');
          // console.log(img);
          // console.log("img", img);
      

          // canvas.toBlob(function(blob) {
          //   // var newImg = document.createElement('img'),
          //       // url = URL.createObjectURL(blob);
          //       console.log("blob", blob);
          //       chathelper.img_upload(blob);
          //   // newImg.onload = function() {
          //   //   // no longer need to read the blob so it's revoked
          //     // URL.revokeObjectURL(url);
          //   // };
          // }) 
          // window.open(img);
        }
  
  })
}
handleItemType(e){
  // console.log("item type chagne this$$$", e.target.id);
  store.dispatch({ 
      type: 'TYPE_CHANGE',
      itemtype: e.target.value
  })
  store.dispatch({ 
      type: 'ITEM_CHANGE',
      item: e.target.value
  })
  store.dispatch({ 
    type: 'SUCCESSFUL_SAVE',
    imagesavedsuccess: false
  })


    console.log("store Obj in interactive on regular state change", store.getState());

  // reset any old file in input box
  ReactDOM.findDOMNode(this.inputEntry).value = "";

}



resetClothesbins(){
  // just sets them back to inital state
this.setState({
        clothesbins: [
          { accepts: [ItemTypes.TOP], lastDroppedItem: null },
          { accepts: [ItemTypes.BAG], lastDroppedItem: null},
          { accepts: [ItemTypes.ACCESSORY], lastDroppedItem: null },
            { accepts: [ItemTypes.FLAIR], lastDroppedItem: null},
            { accepts: [ItemTypes.SHOES], lastDroppedItem: null},
          { accepts: [ItemTypes.BOTTOM,ItemTypes.DRESS], lastDroppedItem: null }]});

           this.setState({droppedImageIds: []});

}

// // 
   
   render() {
       


const { images, clothesbins } = this.state; 
var {topResults, dressResults, bottomResults, shoeResults,bagResults,accessoryResults,  flairResults} = "";

if (this.props.top){
  topResults = this.props.top.map((result, index) =>
                            <Image
                            id={result.src}
                            src={'/proxy/'+result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

} 
if (this.props.dress){
  dressResults = this.props.dress.map((result, index) =>
                            <Image
                            id={result.src}
                            src={'/proxy/'+result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

}
if (this.props.bottom){
  bottomResults = this.props.bottom.map((result, index) =>
                            <Image
                            id={result.src}
                             src={'/proxy/'+result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

}

if (this.props.shoes){
  shoeResults = this.props.shoes.map((result, index) =>
                            <Image
                            id={result.src}
                             src={'/proxy/'+result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

}

if (this.props.bag){
  bagResults = this.props.bag.map((result, index) =>
                            <Image
                            id={result.src}
                             src={'/proxy/'+result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

}

if (this.props.accessory){
  accessoryResults = this.props.accessory.map((result, index) =>
                            <Image
                            id={result.src}
                            src={'/proxy/'+result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                            key={result.type+'_'+index}
                            />,
                        )

}
if (this.props.flair){
  flairResults = this.props.flair.map((result, index) =>
                            <Image
                            id={result.src}
                            src={'/proxy/'+result.src}
                            type={result.type}
                            isDropped={this.isDropped(result.src)}
                             key={result.type+'_'+index}
                            />,
                        )

}
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
        
            <div id='clothesSet' className="col-xs-12 col-md-7 closet-block rel"> 

        <div className="clothes-items backdrop" style={{ overflow: 'hidden', clear: 'both' }}>
 {clothesbins.map(({ accepts, lastDroppedItem, className }, index) =>
          
             <Clothesbin
               accepts={accepts}
               lastDroppedItem={lastDroppedItem}
               onDrop={item => this.handleDrop(index, item)}
               key={index}
             />,
           )}
        </div>
         <button onClick={(e) => this.handleClick(e)} className="btn btn-primary btn-lg">Save</button>
        <button onClick={this.resetClothesbins} className="btn btn-primary btn-lg">Reset</button>       
      </div>
        <div className="form-group">
        {error}
        <label for="sel1">Select list Item Type, then upload file:</label>
        <select class="form-control" ref={ref => this.closetItemType = ref} onChange={(e) => this.handleItemType(e)} id="closetItemType">
          <option selected="selected" value="SELECT">SELECT</option>
          <option id="bottom" value="bottom">BOTTOM</option>
          <option id="top" value="top">TOP</option>
          <option id="dress" value="dress">DRESS</option>
          <option id="bag" value="bag">BAG</option>
          <option id="accessory" value="accessory">ACCESSORY</option>
          <option id="flair" value="flair">FLAIR</option>
          <option id="shoes" value="shoes">SHOES</option>
        </select>
      </div> 
        <input type="file" id="siofu_input" label='Upload' accept='.png' name="file" ref="file" onChange={(e) => this.uploadFile(e)} ref = {ref => this.inputEntry = ref}/><br /> 
         {message}
             <div className="col-md-5 closet-block">
             <div className="clothes-items">
                    <div className="closet-tabs-container">
                        <div className="row">
                            <li>Shoes</li>
                            { shoeResults}
                        </div>
                        <div className="row">
                            <li>Tops</li>
                            {topResults}
                         </div>
                         <div className="row">
                            <li>Dresses</li>
                            { dressResults}
                        </div>
                         <div className="row">
                            <li>Bags</li>
                            { bagResults}
                        </div>
                         <div className="row">
                            <li>Accessories</li>
                            { accessoryResults}
                        </div>
                        <div className="row">
                            <li>Flair</li>
                            {flairResults}
                        </div>
                        <div className="row">
                            <li>Bottoms</li>
                            {bottomResults}
                        </div>
                      
                        <div id="gallery">
                        
                        {/*{clothesImages}*/}
                         <div style={{ overflow: 'hidden', clear: 'both' }}>
                            
                       
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

    // for interactive the only change I will make is to accept the item and index and send these to the server
    // then populate these with a local state chage passing in the index and item
    
    // step 1 - capture data and emit to server
    console.log(index, "index",  item, "item" , id , "id");
    chathelper.getIndexAndItem(index, item);
    this.updateClothesBin(index,   item,  id );
          
  }

    updateClothesBin(index, item, id){
        console.log("this prpos**********d tooooo");
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
    console.log("the clothesbin", this.state)
    }
}

const mapStateToProps = (store,ownProps) => {

    return {
        userid: store.userState.userid,
        updateClosetPicker: store.closetState.updateClosetPicker,
        updateClosetItems: store.closetState.updateClosetItems,
        images: store.closetState.images,
        itemtype: store.closetState.itemtype,
        closeterror: store.closetState.closeterror,
        item: store.closetState.item,
        file: store.closetState.file, 
        imagesavedsuccess: store.closetState.imagesavedsuccess, 
        top: store.closetState.top, 
        bottom: store.closetState.bottom, 
        shoes: store.closetState.shoes, 
        bag: store.closetState.bag, 
        accessory: store.closetState.accessory, 
        dress: store.closetState.dress, 
        flair: store.closetState.flair,   
        index: store.closetState.index,
        itemid: store.closetState.itemid,
        itemsrc: store.closetState.itemsrc,
        items: store.closetState.items,

    }

};

export default connect(mapStateToProps)(InteractiveClosetPicker);

           
       