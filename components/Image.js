import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
backgroundColor: 'transparent',
 height: '10rem',
  width: '10rem',
 padding: '1rem',
   textAlign: 'center',
   fontSize: '1rem',
  lineHeight: 'normal',
  cursor: 'move',
  float: 'left',
  display: 'inline-block',
  verticalAlign: 'middle'
};

const imageSource = {
  beginDrag(props) {
    return {
      id: props.id,
      src: props.src
    };
  },
};
 
@DragSource(props => props.type, imageSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))

export default class Image extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
     type: PropTypes.string.isRequired,
    isDropped: PropTypes.bool.isRequired,
  };
  ondragstart(e){

      // e.target.src gives the url of the file but I only want the file username
      // so this should be put in the id field and grabbed from there
      e.dataTransfer.setData('text/plain-text',e.target.id );
      this.className = 'hover'; 
      return false;
  }

  render() {
    const { id, src, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;


    return connectDragSource(
        <div style={{ ...style, opacity }} >
         {isDropped ?
          <img style={{height:'100%',width:'auto'}} className='noselect' crossOrigin="anonymous" src={src}  ></img> :
          <img style={{height:'80%', width: 'auto'}} className='drag-image' crossOrigin="anonymous" src={src} id={id}  ref={ref => this.drag = ref} className="drag" onDragStart={(e) => this.ondragstart(e)}></img>
        }
        </div>,
    );


 
  }
}
