import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function Lcd16x2Node({ data, selected, id }) {
  return (
    <div
      style={{
        background: "#1e1e1e",
        border: `2px solid ${selected ? "#a855f7" : "#5b21b6"}`,
        borderRadius: "12px",
        width: 220,
        color: "#fff",
        fontFamily: "Inter, sans-serif",
        boxShadow: selected ? "0 0 10px #a855f7" : "0 4px 15px #0008",
        position: "relative",
      }}
    >
      <button
        onClick={() => data?.onDelete && data.onDelete(parseFloat(id))}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
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
      {/* Header */}
      <div
        style={{
          background: "#a855f7",
          borderRadius: "8px 8px 0 0",
          textAlign: "center",
          fontWeight: 600,
          padding: "5px 0",
        }}
      >
        16×2 LCD Display
      </div>

      {/* Body */}
      <div style={{ padding: "10px 14px", fontSize: 14 }}>
        {/* SDA & SCL */}
        <div style={rowStyle}>
          <span>SDA Pin:</span>
          <input style={inputStyle} defaultValue="47" />
        </div>
        <div style={rowStyle}>
          <span>SCL Pin:</span>
          <input style={inputStyle} defaultValue="48" />
        </div>

        {/* Address */}
        <div style={rowStyle}>
          <span>Address:</span>
          <select style={selectStyle}>
            <option>0x27</option>
            <option>0x3F</option>
          </select>
        </div>

        {/* Print Text */}
        <div style={rowStyle}>
          <span>Print Text:</span>
          <input
            style={{ ...inputStyle, color: "#22c55e" }}
            defaultValue="'Hello world'"
          />
        </div>

        {/* Cursor Row & Column */}
        <div style={rowStyle}>
          <span>Row:</span>
          <select style={selectStyle}>
            <option>0</option>
            <option>1</option>
          </select>
        </div>
        <div style={rowStyle}>
          <span>Column:</span>
          <select style={selectStyle}>
            {[...Array(16).keys()].map((col) => (
              <option key={col}>{col}</option>
            ))}
          </select>
        </div>

        {/* Clear Option */}
        <div style={rowStyle}>
          <span>Clear:</span>
          <select style={selectStyle}>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>

      {/* React Flow Handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 6,
};

const inputStyle = {
  background: "#111",
  border: "1px solid #333",
  borderRadius: 4,
  color: "#fff",
  width: 60,
  padding: "2px 5px",
};

const selectStyle = {
  background: "#111",
  border: "1px solid #333",
  borderRadius: 4,
  color: "#fff",
  padding: "2px 5px",
  width: 70,
};
