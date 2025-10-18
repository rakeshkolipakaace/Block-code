import React from "react";
import { Handle, Position } from "@xyflow/react";

const BreakBlock = ({ data, selected, id }) => {
  const handleDataChange = (key, value) => {
    data.onChange && data.onChange(key, value);
  };

  const handleDelete = () => {
    data.onDelete && data.onDelete(parseFloat(id));
  };

  return (
    <div
      style={{
        background: "#111",
        border: `2px solid ${selected ? "#f59e0b" : "#ffe659"}`,
        borderRadius: "50%",
        color: "#ffe659",
        textAlign: "center",
        minWidth: 80,
        height: 80,
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        animation: "appear 0.8s cubic-bezier(.68,-0.55,.27,1.55)",
        boxShadow: selected ? "0 0 10px #ffe659" : "none",
      }}
    >
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: 4,
          right: 4,
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: 20,
          height: 20,
          cursor: "pointer",
          lineHeight: 0,
        }}
        title="Delete node"
      >
        ×
      </button>
      <span style={{ fontSize: 18, color: "#fff", marginBottom: 6 }}>
        Break
      </span>
      <span style={{ fontSize: 28 }}>✂️</span>

      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#ffe659" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#ffe659" }}
      />

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

export default BreakBlock;
