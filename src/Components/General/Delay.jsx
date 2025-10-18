import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function SleepNode({ data, selected, id }) {
  return (
    <div
      style={{
        background: "#1e1e1e",
        border: `2px solid ${selected ? "#f43f5e" : "#9f1239"}`,
        borderRadius: "50%",
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        width: 100,
        height: 100,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: selected ? "0 0 10px #f43f5e" : "0 0 10px #0008",
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
      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 6 }}>
        Delay
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 6,
          width: "100%",
        }}
      >
        <div style={{ color: "#fff", fontSize: 12 }}>ms</div>
        <input
          type="number"
          min="0"
          style={{
            background: "#111",
            border: "1px solid #333",
            borderRadius: 6,
            color: "#fff",
            textAlign: "center",
            width: 46,
            padding: "4px 6px",
            marginRight: 10,
            
          }}
          defaultValue={data?.ms ?? 1}
          onChange={(e) => {
            const v = e.target.value === "" ? "" : Number(e.target.value);
            data?.onChange && data.onChange("ms", v);
          }}
        />
      </div>

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
