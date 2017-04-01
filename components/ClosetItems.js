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

class ClosetItems extends React.Component {
  constructor(props) {
    super(props);

    chathelper.new_magazine_item_listener(store);

    this.state = {

      droppedImageIds: []
    };
  }
      ondragstart(e){
        // e.target.src gives the url of the file but I only want the file username
        // so this should be put in the id field and grabbed from there
        e.dataTransfer.setData('text/plain-text', e.target.src );
       
        this.className = 'hover'; 
        return false;
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

  }

  render() {

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
        .map((result, index) => <img
          className="closet-images"
          id={result.src}
          src={'/proxy/' + result.src}
          type={result.type}
          key={result.type + '_' + index}
          onDragStart={(e) => this.ondragstart(e)}/>,)

    }

    if (this.props.dress) {
      dressResults = this
        .props
        .dress
        .map((result, index) => <img
          className="closet-images"
          id={result.src}
          src={'/proxy/' + result.src}
          type={result.type}
          key={result.type + '_' + index}
          onDragStart={(e) => this.ondragstart(e)}/>,)

    }
    if (this.props.bottom) {
      bottomResults = this
        .props
        .bottom
        .map((result, index) => <img
          className="closet-images"
          id={result.src}
          src={'/proxy/' + result.src}
          type={result.type}
          key={result.type + '_' + index} 
          onDragStart={(e) => this.ondragstart(e)}/>,)
    }

    if (this.props.shoes) {
      shoeResults = this
        .props
        .shoes
        .map((result, index) => <img
          className="closet-images"
          id={result.src}
          src={'/proxy/' + result.src}
          type={result.type}
          key={result.type + '_' + index} 
          onDragStart={(e) => this.ondragstart(e)}/>,)
    }

    if (this.props.bag) {
      bagResults = this
        .props
        .bag
        .map((result, index) => <img
          className="closet-images"
          id={result.src}
          src={'/proxy/' + result.src}
          type={result.type}
          key={result.type + '_' + index}
          onDragStart={(e) => this.ondragstart(e)}/>,)

    }

    if (this.props.accessory) {
      accessoryResults = this
        .props
        .accessory
        .map((result, index) => <img
          className="closet-images"
          id={result.src}
          src={'/proxy/' + result.src}
          type={result.type}
          key={result.type + '_' + index} 
          onDragStart={(e) => this.ondragstart(e)}/>,)
         
    }
    if (this.props.flair) {
      flairResults = this
        .props
        .flair
        .map((result, index) => <img
          className="closet-images"
          id={result.src}
          src={'/proxy/' + result.src}
          type={result.type}
          key={result.type + '_' + index}
          onDragStart={(e) => this.ondragstart(e)}/>,)

    }

    return (
      <section className="closet-container">
        <div className="row">

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
          </div>
        </div>

      </section>
    )
  }

}

const mapStateToProps = (store, ownProps) => {

  return {

    updateClosetPicker: store.closetState.updateClosetPicker,
    updateClosetItems: store.closetState.updateClosetItems,
    images: store.closetState.images,
    itemtype: store.closetState.itemtype,
    closeterror: store.closetState.closeterror,
    item: store.closetState.item,
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

export default connect(mapStateToProps)(ClosetItems);
