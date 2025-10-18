import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import BlockCanvas from "./Components/BlockCanvas";

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);

  const addBlock = (type, data = {}) => {
    console.log('Adding block:', type, data); // Debug log
    const newBlock = {
      id: Date.now() + Math.random(),
      type,
      data,
      position: { x: 50 + blocks.length * 20, y: 50 + blocks.length * 20 }
    };
    console.log('New block created:', newBlock); // Debug log
    setBlocks([...blocks, newBlock]);
  };

  const updateBlockData = (blockId, newData) => {
    setBlocks(blocks.map(block => 
      block.id === blockId 
        ? { 
            ...block, 
            data: { ...block.data, ...newData },
            // Update position if it's provided in newData
            ...(newData.position && { position: newData.position })
          }
        : block
    ));
  };

  const selectBlock = (blockId) => {
    setSelectedBlock(blockId);
  };

  const deleteBlock = (blockId) => {
    console.log('Deleting block:', blockId); // Debug log
    setBlocks(blocks.filter(block => block.id !== blockId));
    // Clear selection if the deleted block was selected
    if (selectedBlock === blockId) {
      setSelectedBlock(null);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar onAddBlock={addBlock} />
      <div style={{ 
        flex: 1, 
        marginLeft: '256px',
        height: '100vh',
        position: 'relative'
      }}>
        <BlockCanvas 
          blocks={blocks}
          selectedBlock={selectedBlock}
          onUpdateBlockData={updateBlockData}
          onSelectBlock={selectBlock}
          onDeleteBlock={deleteBlock}
        />
      </div>
    </div>
  );
};

export default App;
