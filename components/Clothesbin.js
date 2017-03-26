import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import Resizable from 'react-resizable-box';
  
const clothesbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

@DropTarget(props => props.accepts, clothesbinTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))
export default class Clothesbin extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastDroppedItem: PropTypes.object,
    onDrop: PropTypes.func.isRequired,
  };

  render() {
   
  const { accepts, isOver, canDrop, connectDropTarget, lastDroppedItem } = this.props;
  const isActive = isOver && canDrop;
    
    let backgroundColor = 'transparent';
    let opacity = '1';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    } 

  let rootClass = accepts[0]+ ' target text-center ';
  let poly = rootClass + 'poly-';
  let mag= rootClass + 'mag-';
  let paris= rootClass + 'paris-';
  let className = poly+accepts[0];
    
    return connectDropTarget(
//Box is resizable.Wd be cool to make draggable, too. Also overflow hidden, border on select
      <div style={{ maxHeight:'100%',maxWidth:'100%' }}>
        <Resizable customClass="item"
  width={320}
  height={200} className={lastDroppedItem ? "hide-elm" : ''}>
        {isActive ?
          'Release to drop' :
          `${accepts.join(', ')}`
        }
       
        {lastDroppedItem &&
          <img style={{maxHeight:'100%',maxWidth:'100%'}} src={lastDroppedItem.src}></img>
        }
       </Resizable>
      </div>,
    );

  }
}