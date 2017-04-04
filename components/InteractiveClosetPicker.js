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
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import FaLeanpub from 'react-icons/lib/fa/leanpub';
import Magazine from './Magazine';
var html2canvas = require('html2canvas');



@DragDropContext(HTML5Backend)
class InteractiveClosetPicker extends React.Component {
   constructor(props) {
      super(props);
      chathelper.updateclothesbin(store);
      chathelper.new_magazine_item_listener(store);
      this.resetClothesbins = this.resetClothesbins.bind(this);
      this.updateClothesBin = this.updateClothesBin.bind(this);
      this.updateDescription = this.updateDescription.bind(this);
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
    // get images for each section

    helper.getImages(store, "top");
    helper.getImages(store, "bottom");
    helper.getImages(store, "accessory");
    helper.getImages(store, "shoes");
    helper.getImages(store, "bag");
    helper.getImages(store, "dress");
    helper.getImages(store, "flair");
    // set to default initially
    store.dispatch({ 
      type: 'ITEM_CHANGE',
      item: "SELECT"
    })

    store.dispatch({ 
      type: 'SUCCESSFUL_SAVE',
      imagesavedsuccess: false
    })
    store.dispatch({ 
        type: 'SAVING_MAGAZINE_IMG',
        saving_magazine_img: false
    })
}
componentDidUpdate(prevProps, prevState) {
  // only update chart if the data has changed

  if ((prevProps.items !== this.props.items)){

    this.updateClothesBin(this.props.index, this.props.items, this.props.itemid);
  } 
}
uploadFile(e) {
  var itemType = ReactDOM.findDOMNode(this.closetItemType).value;

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
     

  }

}
 handleClick(e) {
  var userid = this.props.userid;
  var component = this;
  e.preventDefault();
 html2canvas(document.getElementsByClassName('clothes-items'), {
      background: '#fff',
    
      allowTaint: true, 
      timeout: 500,
      onrendered: function (canvas) {

          var img = canvas.toDataURL();
          // strip off the data: url prefix to get just the base64-encoded bytes
          var data = img.replace(/^data:image\/\w+;base64,/, "");
        
          if (component.props.description){
          
            chathelper.img_upload(data, userid, component.props.description, store);
            // reset description
            store.dispatch({ 
                  type: 'ADD_DESCRIPTION',
                  description: ""
            })
            
          }
        
        }
  
  })
}
handleItemType(e){

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

          store.dispatch({ 
              type: 'SAVING_MAGAZINE_IMG',
              saving_magazine_img: false
          })

}

  updateDescription(e){
        store.dispatch({ 
            type: 'ADD_DESCRIPTION',
            description: e.target.value
        })
        store.dispatch({ 
              type: 'SAVING_MAGAZINE_IMG',
              saving_magazine_img: false
        })

    }
   
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
      var img_message = "";
      if (this.props.saving_magazine_img){
        img_message = "File Successfully Saved";
      }
      return (
         <section className="closet-container">
        
            <div id='clothesSet' className="col-xs-12 col-sm-7 closet-block rel"> 
 <div className="canvas-delimiter">
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
        </div>
            {/* Needed to add a description for search and display */}
            <input placeholder="Please add a description" type="text" value={this.props.description}  onChange={this.updateDescription}  className="form-control"   ref={input => this.textInput = input} />
            <button onClick={(e) => this.handleClick(e)} className="btn btn-pink outline round btn-lg">Save</button>
            <button onClick={this.resetClothesbins} className="btn btn-pink outline round btn-lg">Reset</button>
            {img_message}    {/* Says File Saved Successfully */}
          </div>

             <div className="col-sm-5 closet-block-interactive rel">
             <div className="clothes-items">
                    <div className="closet-tabs-container-interactive">
                       <div className="closet-tabs-container-interactive">
              <Tabs onSelect={this.handleSelect} selectedIndex={2}>
                <TabList>
                  <Tab>
                    <img className='icons' src='../assets/img/i-shirt.png'></img>
                  </Tab>
                  <Tab>
                    <img className='icons' src='../assets/img/i-pants.png'></img>
                  </Tab>
                  <Tab>
                    <img className='icons' src='../assets/img/i-dress.png'></img>
                  </Tab>
                  <Tab>
                    <img className='icons' src='../assets/img/i-shoes.png'></img>
                  </Tab>
                  <Tab>
                    <img className='icons' src='../assets/img/i-purse.png'></img>
                  </Tab>
                  <Tab>
                    <img className='icons' src='../assets/img/i-accessory.png'></img>
                  </Tab>
                  <Tab>
                    <img className='icons' src='../assets/img/i-flair.png'></img>
                  </Tab>
                  <Tab><FaLeanpub className="icons"/></Tab>

                </TabList>

                <TabPanel>
                  {topResults}
                </TabPanel>
                <TabPanel>
                  {bottomResults}
                </TabPanel>
                <TabPanel>
                  {dressResults}
                </TabPanel>
                <TabPanel>
                  {shoeResults}
                </TabPanel>
                <TabPanel>
                  {bagResults}
                </TabPanel>
                <TabPanel>
                  {accessoryResults}
                </TabPanel>
                <TabPanel>
                  {flairResults}
                </TabPanel>
                <TabPanel>
                  <Magazine/>
                </TabPanel>
              </Tabs>
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
    chathelper.getIndexAndItem(index, item);
    this.updateClothesBin(index,   item,  id );
          
  }

    updateClothesBin(index, item, id){
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
        userid: store.chatState.userid,
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
        description: store.closetState.description,
        saving_magazine_img: store.closetState.saving_magazine_img,

    }

};

export default connect(mapStateToProps)(InteractiveClosetPicker);

           
       