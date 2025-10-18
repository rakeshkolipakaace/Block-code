import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";

const ForLoopBlock = ({ data, selected, id }) => {
  const [variable, setVariable] = useState(data.variable || "i");
  const [range, setRange] = useState(data.range || "range(10)");

  const handleDataChange = (key, value) => {
    data.onChange && data.onChange(key, value);
  };

  const handleDelete = () => {
    data.onDelete && data.onDelete(parseFloat(id));
  };

  return (
    <div
      style={{
        background: "#7b44ff",
        borderRadius: 20,
        color: "#fff",
        boxShadow: selected ? "0 0 12px #b191ff" : "0 5px 18px #0009",
        padding: 18,
        fontFamily: "Inter, sans-serif",
        minWidth: 240,
        animation: "appear 0.8s cubic-bezier(.68,-0.55,.27,1.55)",
        position: "relative",
      }}
    >
      {/* Delete button */}
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
      <div style={{ fontWeight: 600, fontSize: 20, marginBottom: 10 }}>
        For Loop <span style={{ float: "right" }}>∞</span>
      </div>

      {/* Variable Input */}
      <div style={{ marginBottom: 10 }}>
        Variable
        <input
          type="text"
          value={variable}
          onChange={(e) => {
            setVariable(e.target.value);
            handleDataChange("variable", e.target.value);
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

      {/* Range Input */}
      <div style={{ marginBottom: 5 }}>
        Range
        <input
          type="text"
          value={range}
          onChange={(e) => {
            setRange(e.target.value);
            handleDataChange("range", e.target.value);
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
        style={{ background: "#b191ff" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#b191ff" }}
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

export default ForLoopBlock;
