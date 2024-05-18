import React, { useCallback, useEffect, useState } from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MessageIcon from '@mui/icons-material/Message';
import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './FlowBuilder.css';

const FlowBuilder = ({
  selectedNode,
  setSelectedNode,
  nodes,
  setNodes,
  edges,
  setEdges,
}) => {
  const [reactNodes, setReactNodes, onNodesChange] = useNodesState(nodes);
  const [reactEdges, setReactEdges, onEdgesChange] = useEdgesState(edges);
  const reactFlowInstance = useReactFlow();
  const [rfInstance, setRfInstance] = useState(null);

  useEffect(() => {
    setReactNodes(nodes);
  }, [nodes, setReactNodes]);

  useEffect(() => {
    setReactEdges(edges);
  }, [edges, setReactEdges]);
  setEdges(reactEdges)


  const onConnect = useCallback(
    (params) => {
      const { source } = params;

      const existingConnection = reactEdges.find(edge => edge.source === source.id);
      if (existingConnection) {
        alert('Error: Source node can only have one outgoing edge.');
        return;
      }

      setReactEdges((prevEdges) => addEdge({
        ...params,
        type: 'step',
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 20,
          height: 20,
          color: 'blue',
        },
      }, prevEdges));
    },
    [reactEdges, setReactEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: `node_${reactNodes.length + 1}`,
        type,
        position,
        data: { label: 'New Text Node' },
        __rf: {
          position, // Set initial position
          sourceHandleIds: [], // Initialize source handle IDs
        },
      };

      setReactNodes((nds) => nds.concat(newNode));
      setNodes((nds) => nds.concat(newNode));
    },
    [reactNodes, setReactNodes, reactFlowInstance, setNodes]
  );

  const handleNodeClick = (_, node) => {
    setSelectedNode(node);
  };

  const handlePaneClick = () => {
    setSelectedNode(null);
  };

  const getNodeHeading = (node) => {
    return node.data.label || 'Untitled Node';
  };

  return (
    <div className="flow-builder">
      <ReactFlow
        nodes={reactNodes.map(node => ({
          ...node,
          data: {
            ...node.data,
            label: (
              <div>
                <div className="heading">
                  <MessageIcon className="icon" style={{height:'18px'}} />
                  <span className="heading-text">Send Message</span>
                  <div className="whatsapp-icon-container">
                      <WhatsAppIcon className="icon whatsapp-icon" style={{height:'16px'}} />
                    </div>
                </div>
                <div className="node-content">{getNodeHeading(node)}</div>
              </div>
            )
          }
        }))}
        edges={reactEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={(_, node) => setSelectedNode(node)}
        onNodeClick={handleNodeClick}
        onPaneClick={handlePaneClick}
        onDragOver={onDragOver}
        onDrop={onDrop}
        edgeUpdater={{ type: 'step' }} // Make edges straight
        attributionPosition="top-right"
        onInit={setRfInstance}
      >
        <Background />
      </ReactFlow>
    </div>
  );
};

export default FlowBuilder;
