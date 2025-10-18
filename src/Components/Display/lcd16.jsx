import React from "react";
import { Handle, Position } from "@xyflow/react";

export default function Lcd16x2Node({ data, selected, id }) {
  // Ensure the onChange handler exists before calling
  const handleChange = (key, value) => {
    if (data?.onChange) {
      data.onChange(key, value);
    }
  };

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
      {/* Delete Button */}
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
          <input
            style={inputStyle}
            value={data.sda || ""}
            onChange={(e) => handleChange("sda", e.target.value)}
            placeholder="47"
          />
        </div>
        <div style={rowStyle}>
          <span>SCL Pin:</span>
          <input
            style={inputStyle}
            value={data.scl || ""}
            onChange={(e) => handleChange("scl", e.target.value)}
            placeholder="48"
          />
        </div>

        {/* Address */}
        <div style={rowStyle}>
          <span>Address:</span>
          <select
            style={selectStyle}
            value={data.address || "0x27"}
            onChange={(e) => handleChange("address", e.target.value)}
          >
            <option value="0x27">0x27</option>
            <option value="0x3F">0x3F</option>
          </select>
        </div>

        {/* Print Text */}
        <div style={rowStyle}>
          <span>Print Text:</span>
          <input
            style={{ ...inputStyle, color: "#22c55e" }}
            value={data.printText || ""}
            onChange={(e) => handleChange("printText", e.target.value)}
            placeholder="'Hello world'"
          />
        </div>

        {/* Cursor Row & Column */}
        <div style={rowStyle}>
          <span>Row:</span>
          <select
            style={selectStyle}
            value={data.row || 0}
            onChange={(e) => handleChange("row", e.target.value)}
          >
            <option value={0}>0</option>
            <option value={1}>1</option>
          </select>
        </div>
        <div style={rowStyle}>
          <span>Column:</span>
          <select
            style={selectStyle}
            value={data.column || 0}
            onChange={(e) => handleChange("column", e.target.value)}
          >
            {[...Array(16).keys()].map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>

        {/* Backlight */}
        <div style={rowStyle}>
          <span>Backlight:</span>
          <input
            style={inputStyle}
            value={data.backlight || ""}
            onChange={(e) => handleChange("backlight", e.target.value)}
            placeholder="HIGH / LOW"
          />
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
  width: 80,
  padding: "2px 5px",
};

const selectStyle = {
  background: "#111",
  border: "1px solid #333",
  borderRadius: 4,
  color: "#fff",
  padding: "2px 5px",
  width: 80,
};
