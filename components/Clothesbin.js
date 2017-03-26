import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
// import Resizable from 'react-resizable-box';
import Rnd from 'react-rnd';

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
  let className = 'poly rnd'
  if (isActive) {
    className = 'rnd active noselect'
  } else if (canDrop) {
    className = 'rnd canDrop'
  } else if (lastDroppedItem) {
    className = 'rnd dropped noselect'
  }
    

  let rootClass = accepts[0]+ ' text-center ';
  let poly = rootClass + 'poly-'+accepts[0];
  let mag= rootClass + 'mag-';
  let paris= rootClass + 'paris-';
  // let className = poly+accepts[0];
    
    return connectDropTarget(
//Box is resizable.Wd be cool to make draggable, too. Also overflow hidden, border on select
      <div className='noselect poly' style={{maxHeight:'100%',maxWidth:'100%',position:'relative' }}>
         <Rnd
        
  
  ref={c => { this.rnd = c; }}
  initial={{
    x: window.innerWidth / 2 - 200,
    y: window.innerHeight / 2 - 80,
    width: 200,
    height: 160,
  }}

  minWidth={10}
  minHeight={10}
  maxWidth={800}
  maxHeight={400}
  
  className={className}
>
        {isActive ?
           'Release to drop' :
          `${accepts.join(', ')}`
        }
       
        {lastDroppedItem &&
          <img className='noselect' style={{maxHeight:'100%',maxWidth:'100%'}} src={lastDroppedItem.src}></img>
        }
       </Rnd>
       </div>,
    );

  }
}