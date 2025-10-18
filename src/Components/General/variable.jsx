import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function VariableNode({ data, selected, id }) {
  return (
    <div
      style={{
        background: "#1e1e1e",
        border: `2px solid ${selected ? "#eab308" : "#854d0e"}`,
        borderRadius: "12px",
        width: 180,
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        position: "relative",
        boxShadow: selected ? "0 0 10px #eab308" : undefined,
      }}
    >
      <button
        onClick={() => data?.onDelete && data.onDelete(parseFloat(id))}
        style={{
          position: "absolute",
          top: 6,
          right: 6,
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#ef4444",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
        title="Delete node"
      >
        ×
      </button>
      <div
        style={{
          background: "#eab308",
          borderRadius: "8px 8px 0 0",
          textAlign: "center",
          fontWeight: 600,
          padding: "5px 0",
        }}
      >
        Variable
      </div>
      <div style={{ padding: "8px 12px" }}>
        <div>
          Variable: <input style={inputStyle} defaultValue="x" />
        </div>
        <div>
          Value: <input style={inputStyle} defaultValue="0" />
        </div>
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const inputStyle = {
  background: "#111",
  border: "1px solid #333",
  borderRadius: 4,
  color: "#fff",
  width: 60,
  margin: "4px 0",
  padding: "2px 5px",
};
