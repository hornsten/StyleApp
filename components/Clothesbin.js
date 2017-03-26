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
  let className = 'rnd '
  if (isActive) {
    className = 'rnd active noselect ';
  } else if (canDrop) {
    className = 'rnd canDrop ';
  } else if (lastDroppedItem) {
    className = 'rnd dropped noselect ';
  }
    
  let binClass = className + accepts[0]+ ' text-center noselect ' + 'poly-'+accepts[0];

  
    return connectDropTarget(
//Box is resizable.Wd be cool to make draggable, too. Also overflow hidden, border on select
      <div style={{maxHeight:'100%',maxWidth:'100%',position:'relative' }}>
         <Rnd
        
  
  ref={c => { this.rnd = c; }}
  initial={{
    x: window.innerWidth /2-200,
    y: window.innerHeight / 2-300,
    width: 200,
    height: 200,
  }}

  minWidth={10}
  minHeight={10}
  maxWidth={1000}
  maxHeight={1000}
  
  className={binClass}
>
        <h3 className='noselect text-center'>{isActive ?
           'Release to drop' :
          `${accepts.join(', ')}`
        }</h3>
       
        {lastDroppedItem &&
          <img className='noselect' style={{maxHeight:'500rem',maxWidth:'100%'}} src={lastDroppedItem.src}></img>
        }
       </Rnd>
       </div>,
    );

  }
}