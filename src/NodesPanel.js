import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import './NodesPanel.css';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

const NodesPanel = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="nodes-panel">
      <div
        className="dndnode"
        onDragStart={(event) => onDragStart(event, 'textNode')}
        draggable
      >
        <span style={{ display: 'block'  ,justifyContent:'center',marginTop:'20px'}}>
          <MessageOutlinedIcon />
        </span>
        <span style={{ display: 'block',marginTop:'4px'}}>Message</span>
      </div>
    </aside>
  );
};

export default NodesPanel;
