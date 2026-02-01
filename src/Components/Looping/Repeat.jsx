import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import StandardHandles from "../common/StandardHandles";

const RepeatBlock = ({ data, selected, id }) => {
  const [times, setTimes] = useState(data.times || 1);

  const handleDataChange = (key, value) => {
    if (data.onChange) data.onChange(key, value);
  };

  const primaryColor = "#3b82f6";
  const borderColor = "#2563eb";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={120}
      minHeight={100}
      background="#111"
      style={{ borderRadius: 24, padding: 16, boxShadow: selected ? "0 0 10px #2563eb" : "0 4px 10px #0008" }}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      {/* Title */}
      <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 10 }}>
        Repeat
      </div>

      {/* Input */}
      <div>
        times
        <input
          type="number"
          value={times}
          onChange={(e) => {
            setTimes(e.target.value);
            handleDataChange("times", e.target.value);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            marginLeft: 8,
            background: "#222",
            color: "#fae",
            border: "1px solid #444",
            borderRadius: 6,
            minWidth: 40,
            padding: "2px 8px",
          }}
        />
      </div>

      <StandardHandles primaryColor="#2563eb" />
    </NodeContainer>
  );
};

export default RepeatBlock;
