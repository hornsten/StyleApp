import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';

const style = {
  // border: '1px dashed gray',
  backgroundColor: 'eee',
 height: '10rem',
  width: '10rem',
 padding: '1rem',
   textAlign: 'center',
   fontSize: '1rem',
  lineHeight: 'normal',
  cursor: 'move',
  float: 'left',
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

  render() {
    const { id, src, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(
        <div style={{ ...style, opacity }}>
         {isDropped ?
          <img style={{height:'100%'}} src={src}></img> :
          <img style={{height:'80%', width: 'auto'}} src={src}></img>
        }
        </div>,
    );
  }
}
