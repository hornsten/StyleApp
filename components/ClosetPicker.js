import React, {Component} from "react";
import update from 'react/lib/update';
import ReactDOM from "react-dom";
import {DragDropContext} from 'react-dnd';
import HTML5Backend, {NativeTypes} from 'react-dnd-html5-backend';
import Clothesbin from './Clothesbin';
import Image from './Image';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import Magazine from './Magazine';
import ItemTypes from './ItemTypes';
import {connect} from 'react-redux';
import store from './Redux/redux.js';
import chathelper from "../app/utils/chathelper.js";
import helper from "../app/utils/helper.js";
import FaLeanpub from 'react-icons/lib/fa/leanpub';
import {Modal, Dialog, Button} from 'react-bootstrap';
import ChatModal from './ChatModal';
var html2canvas = require('html2canvas');

@DragDropContext(HTML5Backend)
class ClosetPicker extends React.Component {
  constructor(props) {
    super(props);

    // chathelper.updatecloset_listener(store);
    this.resetClothesbins = this
      .resetClothesbins
      .bind(this);
    this.uploadFile = this
      .uploadFile
      .bind(this);
    this.updateDescription = this
      .updateDescription
      .bind(this);

    chathelper.new_magazine_item_listener(store);


    this.state = {
      clothesbins: [
        {
          accepts: [ItemTypes.TOP],
          lastDroppedItem: null
        }, {
          accepts: [ItemTypes.BAG],
          lastDroppedItem: null
        }, {
          accepts: [ItemTypes.ACCESSORY],
          lastDroppedItem: null
        }, {
          accepts: [ItemTypes.FLAIR],
          lastDroppedItem: null
        }, {
          accepts: [ItemTypes.SHOES],
          lastDroppedItem: null
        }, {
          accepts: [
            ItemTypes.BOTTOM, ItemTypes.DRESS
          ],
          lastDroppedItem: null
        }

      ],


      droppedImageIds: [],

    };
  }
handleLoad(e){
  console.log("loaded")
}
  resetClothesbins() {
    // just sets them back to inital state
    this.setState({
      clothesbins: [
        {
          accepts: [ItemTypes.TOP],
          lastDroppedItem: null
        }, {
          accepts: [ItemTypes.BAG],
          lastDroppedItem: null
        }, {
          accepts: [ItemTypes.ACCESSORY],
          lastDroppedItem: null
        }, {
          accepts: [ItemTypes.FLAIR],
          lastDroppedItem: null
        }, {
          accepts: [ItemTypes.SHOES],
          lastDroppedItem: null
        }, {
          accepts: [
            ItemTypes.BOTTOM, ItemTypes.DRESS
          ],
          lastDroppedItem: null
        }
      ]
    });

    this.setState({droppedImageIds: []});

    store.dispatch({type: 'SAVING_MAGAZINE_IMG', saving_magazine_img: false})

  }

  isDropped(imageId) {
    return this
      .state
      .droppedImageIds
      .indexOf(imageId) > -1;
  }
  componentDidMount() {
    // get images for each section
    helper.getMagazines(store, this.props.userid);
    helper.getImages(store, "top");
    helper.getImages(store, "bottom");
    helper.getImages(store, "accessory");
    helper.getImages(store, "shoes");
    helper.getImages(store, "bag");
    helper.getImages(store, "dress");
    helper.getImages(store, "flair");
    ReactDOM
      .findDOMNode(this.inputEntry)
      .value = "";
    // set to default initially
    store.dispatch({type: 'ITEM_CHANGE', item: "SELECT"})
    store.dispatch({type: 'SUCCESSFUL_SAVE', imagesavedsuccess: false})
    store.dispatch({type: 'SAVING_MAGAZINE_IMG', saving_magazine_img: false})
  }

  uploadFile(e) {

    var itemType = ReactDOM.findDOMNode(this.closetItemType).value;

    //reset old error message
    store.dispatch({
      type: 'CLOSET_ERROR',
      closeterror: false
    })

    if (this.props.item !== "SELECT") {
      helper.uploadToCloset(e, itemType, store);
      //  reset back to default
      ReactDOM
        .findDOMNode(this.closetItemType)
        .value = "SELECT";

    } else {
      // send error message
      store.dispatch({type: 'CLOSET_ERROR', closeterror: true})


    }

  }
  handleClick(e) {
    var userid = this.props.userid;
    var component = this;
    e.preventDefault();
    console.log("create",document.getElementsByClassName('clothes-items') );

    html2canvas(document.getElementsByClassName('clothes-items'), {
      background: '#fff',
      timeout: 400,
      onrendered: function (canvas) {
        var img = canvas.toDataURL();

//  window.open(img);
        // strip off the data: url prefix to get just the base64-encoded bytes
        var data = img.replace(/^data:image\/\w+;base64,/, "");

        if (component.props.description){
         

          chathelper.img_upload(data, userid, component.props.description, store);
          // reset description
          store.dispatch({type: 'ADD_DESCRIPTION', description: ""})

        }
      //  
      }

    });
  }

  handleItemType(e) {
    // console.log("item type chagne this$$$", e.target.id);
    store.dispatch({type: 'TYPE_CHANGE', itemtype: e.target.value})
    store.dispatch({type: 'ITEM_CHANGE', item: e.target.value})
    store.dispatch({type: 'SUCCESSFUL_SAVE', imagesavedsuccess: false})


    // reset any old file in input box
    ReactDOM
      .findDOMNode(this.inputEntry)
      .value = "";




  }
  updateDescription(e) {
    store.dispatch({type: 'ADD_DESCRIPTION', description: e.target.value})
    store.dispatch({type: 'SAVING_MAGAZINE_IMG', saving_magazine_img: false})


    }


  render() {

    const {images, clothesbins} = this.state;
    var {
      topResults,
      dressResults,
      bottomResults,
      shoeResults,
      bagResults,
      accessoryResults,
      flairResults
    } = "";

    if (this.props.top) {
      topResults = this
        .props
        .top
        .map((result, index) => <Image
          id={result.imageid}
          src={'/proxy/' + result.src}
          type={result.type}
          isDropped={this.isDropped(result.src)}
          key={result.type + '_' + index}/>,)

    }

    if (this.props.dress) {
      dressResults = this
        .props
        .dress
        .map((result, index) => <Image
          id={result.imageid}
          src={'/proxy/' + result.src}
          type={result.type}
          isDropped={this.isDropped(result.src)}
          key={result.type + '_' + index}/>,)

    }
    if (this.props.bottom) {
      bottomResults = this
        .props
        .bottom
        .map((result, index) => <Image
          id={result.imageid}
          src={'/proxy/' + result.src}
          type={result.type}
          isDropped={this.isDropped(result.src)}
          key={result.type + '_' + index}/>,)
    }

    if (this.props.shoes) {
      shoeResults = this
        .props
        .shoes
        .map((result, index) => <Image
          id={result.imageid}
          src={'/proxy/' + result.src}
          type={result.type}
          isDropped={this.isDropped(result.src)}
          key={result.type + '_' + index}/>,)
    }

    if (this.props.bag) {
      bagResults = this
        .props
        .bag
        .map((result, index) => <Image
          id={result.imageid}
          src={'/proxy/' + result.src}
          type={result.type}
          isDropped={this.isDropped(result.src)}
          key={result.type + '_' + index}/>,)

    }

    if (this.props.accessory) {
      accessoryResults = this
        .props
        .accessory
        .map((result, index) => <Image
          id={result.imageid}
          src={'/proxy/' + result.src}
          type={result.type}
          isDropped={this.isDropped(result.src)}
          key={result.type + '_' + index}/>,)

    }
    if (this.props.flair) {
      flairResults = this
        .props
        .flair
        .map((result, index) => <Image
          id={result.imageid}
          src={'/proxy/' + result.src}
          type={result.type}
          isDropped={this.isDropped(result.src)}
          key={result.type + '_' + index}/>,)

    }
    var error = "";
    if (this.props.closeterror) {
      error = <div>
        <strong>Please enter a valid clothing TYPE for your item!</strong><br/></div>
    }
    var message = "";
    var img_message = "";
    if (this.props.imagesavedsuccess) {
      message = "File Successfully Saved";
    }
    if (this.props.saving_magazine_img) {
      img_message = "Successfully Saved to 'My Magazines'";
    }
    return (
      <section className="closet-container">
        <div className="row">
          <div id='clothesSet' className="col-md-6 closet-block rel">
            <div className="canvas-delimiter">
            <div
              className="clothes-items backdrop"
              style={{
              overflow: 'hidden',
              clear: 'both'
            }}>
              {clothesbins.map(({
                accepts,
                lastDroppedItem,
                className
              }, index) => <Clothesbin 
                accepts={accepts}
                lastDroppedItem={lastDroppedItem}
                onDrop={item => this.handleDrop(index, item)}
                key={index}/>,)}
            </div>
            </div>
            {/* Needed to add a description for search and display */}
            <input
              placeholder="Please add a description"
              type="text"
              value={this.props.description}
              onChange={this.updateDescription}
              className="form-control"
              ref={input => this.textInput = input}/>
              <br />
            <button
              onClick={(e) => this.handleClick(e)}
              className="btn btn-pink outline round btn-lg">Save</button>
            <button
              onClick={this.resetClothesbins}
              className="btn btn-pink outline round btn-lg">Reset</button>
            {img_message}
            {/* Says File Saved Successfully */}
          </div>

          <div className="col-md-6 closet-block rel">
            <div className="closet-tabs-container">
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
            <div className="drop-box">
              <div className="form-group">
                {error}

                <label for="sel1">
                  <h4>
                    To upload, select item type:
                  </h4>
                </label>
                <select
                  required
                  class="form-control"
                  ref={ref => this.closetItemType = ref}
                  onChange={(e) => this.handleItemType(e)}
                  id="closetItemType">
                  <option defaultValue="selected" value="SELECT">SELECT</option>
                  <option id="bottom" value="bottom">BOTTOM</option>
                  <option id="top" value="top">TOP</option>
                  <option id="dress" value="dress">DRESS</option>
                  <option id="bag" value="bag">BAG</option>
                  <option id="accessory" value="accessory">ACCESSORY</option>
                  <option id="flair" value="flair">FLAIR</option>
                  <option id="shoes" value="shoes">SHOES</option>
                </select>
              </div>

              <h4 id="upload">Then, choose your file!
                <input
                  type="file"
                  id="siofu_input"
                  label='Upload'
                  accept='.png'
                  name="file"
                  ref="file"
                  onChange={(e) => this.uploadFile(e)}
                  ref={ref => this.inputEntry = ref}/></h4>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
  handleDrop(index, item) {
    const {id} = item;

    this.setState(update(this.state, {
      clothesbins: {
        [index]: {
          lastDroppedItem: {
            $set: item
          }
        }
      },
      droppedImageIds: id
        ? {
          $push: [id]
        }
        : {}
    }));
  }
}

const mapStateToProps = (store, ownProps) => {

  return {
    test: store.chatState.test,
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
    description: store.closetState.description,
    saving_magazine_img: store.closetState.saving_magazine_img
  }

};

export default connect(mapStateToProps)(ClosetPicker);
