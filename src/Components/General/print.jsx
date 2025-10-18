import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function PrintNode({ data, selected, id }) {
  return (
    <div
      style={{
        background: "#1e1e1e",
        border: `2px solid ${selected ? "#3b82f6" : "#1d4ed8"}`,
        borderRadius: "12px",
        width: 180,
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        boxShadow: selected ? "0 0 10px #3b82f6" : "0 4px 12px #0006",
        position: "relative",
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
          background: "#3b82f6",
          borderRadius: "8px 8px 0 0",
          textAlign: "center",
          fontWeight: 600,
          padding: "5px 0",
        }}
      >
        Print
      </div>
      <div style={{ padding: "8px 12px" }}>
        Text:{" "}
        <input
          style={{
            background: "#111",
            border: "1px solid #333",
            borderRadius: 4,
            color: "#22c55e",
            padding: "2px 5px",
            width: "90%",
          }}
          defaultValue="'Hello world'"
        />
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
