import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

const RepeatBlock = ({ data, selected, id }) => {
  const [times, setTimes] = useState(data.times || 1);

  const handleDataChange = (key, value) => {
    if (data.onChange) data.onChange(key, value);
  };

  const handleDelete = () => {
    if (data.onDelete) data.onDelete(parseFloat(id));
  };

  return (
    <div
      style={{
        background: "#111",
        border: `2px solid ${selected ? "#3b82f6" : "#2563eb"}`,
        borderRadius: 24,
        color: "#fff",
        padding: 16,
        minWidth: 120,
        fontFamily: "Inter, sans-serif",
        boxShadow: selected ? "0 0 10px #2563eb" : "0 4px 10px #0008",
        position: "relative",
        animation: "appear 0.8s cubic-bezier(.68,-0.55,.27,1.55)",
      }}
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: 14,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#dc2626";
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#ef4444";
          e.target.style.transform = "scale(1)";
        }}
      >
        ×
      </button>

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

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#2563eb", width: 8, height: 8 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#2563eb", width: 8, height: 8 }}
      />

      {/* Animation */}
      <style>
        {`
          @keyframes appear {
            0% { opacity: 0; transform: scale(0.7); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default RepeatBlock;
