import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

const WhileLoopBlock = ({ data, selected, id }) => {
  const [condition, setCondition] = useState(data.condition || "True");

  const handleDataChange = (key, value) => {
    if (data.onChange) data.onChange(key, value);
  };

  const handleDelete = () => {
    if (data.onDelete) data.onDelete(parseFloat(id));
  };

  return (
    <div
      style={{
        background: "#19c37d",
        border: `2px solid ${selected ? "#10b981" : "#16a34a"}`,
        borderRadius: 16,
        color: "#fff",
        boxShadow: selected ? "0 0 10px #16a34a" : "0 5px 18px #0008",
        padding: 18,
        minWidth: 170,
        fontFamily: "Inter, sans-serif",
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
          borderRadius: "50%",
          width: 20,
          height: 20,
          cursor: "pointer",
          lineHeight: 0,
        }}
        title="Delete node"
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
        While Loop <span style={{ float: "right" }}>∞</span>
      </div>

      {/* Condition Input */}
      <div>
        Condition
        <input
          type="text"
          value={condition}
          onChange={(e) => {
            setCondition(e.target.value);
            handleDataChange("condition", e.target.value);
          }}
          style={{
            marginLeft: 8,
            background: "#222",
            color: "#fae",
            border: "1px solid #444",
            borderRadius: 6,
            minWidth: 40,
            padding: "2px 6px",
          }}
        />
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#16a34a", width: 8, height: 8 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#16a34a", width: 8, height: 8 }}
      />

      {/* Animation */}
      <style>
        {`
          @keyframes appear {
            0% { opacity: 0; transform: scale(0.7);}
            100% { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </div>
  );
};

export default WhileLoopBlock;
