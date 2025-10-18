import React from "react";
import { Handle, Position } from "@xyflow/react";

const BuzzerNode = ({ data, selected, id }) => {
  const handleDataChange = (key, value) => {
    if (data.onChange) data.onChange(key, value);
  };

  const handleDelete = () => {
    if (data.onDelete) data.onDelete(parseFloat(id));
  };

  const sectionStyle = {
    marginBottom: "14px",
    padding: "8px",
    borderRadius: "8px",
    backgroundColor: "#f3f4f6",
  };

  const labelStyle = {
    fontSize: "12px",
    fontWeight: "500",
    color: "#4b5563",
    marginBottom: "4px",
  };

  const inputStyle = {
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    padding: "6px 8px",
    fontSize: "14px",
    background: "#ffffff",
    color: "#111827",
    outline: "none",
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        border: `2px solid ${selected ? "#f59e0b" : "#e5e7eb"}`,
        padding: "14px",
        width: "260px",
        minHeight: "200px",
        position: "relative",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "14px",
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

      {/* Node Title */}
      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#f59e0b",
          marginBottom: "12px",
        }}
      >
        Buzzer
      </h3>

      {/* Pins Section */}
      <div style={sectionStyle}>
        <h4
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "6px",
          }}
        >
          Pins
        </h4>
        <label style={labelStyle}>Pin Number</label>
        <input
          type="number"
          value={data.pin || ""}
          onChange={(e) => handleDataChange("pin", e.target.value)}
          placeholder="Enter pin number"
          style={inputStyle}
        />
      </div>

      {/* Variables Section */}
      <div style={sectionStyle}>
        <h4
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "6px",
          }}
        >
          Output
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", color: "#6b7280" }}>Value</label>
          <select
            value={data.output || "LOW"}
            onChange={(e) => handleDataChange("output", e.target.value)}
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              padding: "4px 8px",
              fontSize: "14px",
            }}
          >
            <option value="HIGH">HIGH</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </div>

      {/* Handles */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ background: "#f59e0b", width: "8px", height: "8px" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: "#f59e0b", width: "8px", height: "8px" }}
      />
    </div>
  );
};

export default BuzzerNode;
