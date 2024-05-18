import React, { useState } from 'react';
import { ReactFlowProvider } from 'reactflow';
import NodesPanel from './NodesPanel';
import FlowBuilder from './FlowBuilder';
import SettingsPanel from './SettingsPanel';
import SaveButton from './SaveButton';
import './App.css';
import { setRef } from '@material-ui/core';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Hello' },
    position: { x: 100, y: 100 },
    type: 'input',
  },
];

function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState([]);
  const [settingsVisible, setSettingsVisible] = useState(false);

  return (
    <ReactFlowProvider>
      <div className="app">
        <div className="top-bar">
          <div className="app-title">Flow Builder</div>
          <SaveButton className="save-button" nodes={nodes} edges={edges} />
        </div>
        <div className="main-content">
          <div className="flow-builder">
            <FlowBuilder
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
              nodes={nodes}
              setNodes={setNodes}
              edges={edges}
              setEdges={setEdges}
            />
          </div>
          <div className="settings-panel">
            {selectedNode && (
              <SettingsPanel selectedNode={selectedNode} setNodes={setNodes} setEdges={setEdges}/>
            )}

            {!selectedNode && <NodesPanel />}
          </div>
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default App;
