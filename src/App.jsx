import React, { useState } from "react";
import Sidebar from "./Components/Sidebar";
import BlockCanvas from "./Components/BlockCanvas";
import Navbar from "./Components/Navigation";
import Codegen from "./Components/Codegen";

const App = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);

  const addBlock = (type, data = {}) => {
    console.log("Adding block:", type, data); // Debug log
    const newBlock = {
      id: Date.now() + Math.random(),
      type,
      data,
      position: { x: 50 + blocks.length * 20, y: 50 + blocks.length * 20 },
    };
    console.log("New block created:", newBlock); // Debug log
    setBlocks((prev) => [...prev, newBlock]);
  };

  const updateBlockData = (blockId, newData) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === blockId
          ? {
              ...block,
              data: { ...block.data, ...newData },
              // Update position if it's provided in newData
              ...(newData.position && { position: newData.position }),
            }
          : block
      )
    );
  };

  const selectBlock = (blockId) => {
    setSelectedBlock(blockId);
  };

  const deleteBlock = (blockId) => {
    console.log("Deleting block:", blockId); // Debug log
    setBlocks((prev) => prev.filter((block) => block.id !== blockId));
    // Clear selection if the deleted block was selected
    if (selectedBlock === blockId) {
      setSelectedBlock(null);
    }
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN LAYOUT */}
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar onAddBlock={addBlock} />
        <div
          style={{
            flex: 1,
            marginLeft: "256px",
            height: "100vh",
            position: "relative",
            background: "#020617",
          }}
        >
          <BlockCanvas
            blocks={blocks}
            selectedBlock={selectedBlock}
            onUpdateBlockData={updateBlockData}
            onSelectBlock={selectBlock}
            onDeleteBlock={deleteBlock}
          />
        </div>

        {/* RIGHT CODEGEN */}

        <div
          style={{
            width: "320px",
            borderLeft: "1px solid #1f2937",
            background: "#020617",
          }}
        >
          <Codegen blocks={blocks} />
        </div>
      </div>
    </>
  );
};

export default App;
