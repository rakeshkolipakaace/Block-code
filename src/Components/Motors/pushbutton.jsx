import React from "react";
import { Handle, Position } from "@xyflow/react";
import PinSelect from "../common/PinSelect";

const PushButtonNode = ({ data, selected, id }) => {
  const handleDataChange = (key, value) => {
    if (data.onChange) {
      data.onChange(key, value);
    }
  };

  const handleDelete = () => {
    if (data.onDelete) {
      data.onDelete(parseFloat(id));
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        border: `2px solid ${selected ? "#2563eb" : "#e5e7eb"}`,
        padding: "12px",
        width: "250px",
        minHeight: "160px",
        position: "relative",
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
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "bold",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          transition: "all 0.2s ease",
          zIndex: 10,
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#dc2626";
          e.target.style.transform = "scale(1.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#ef4444";
          e.target.style.transform = "scale(1)";
        }}
        title="Delete node"
      >
        ×
      </button>

      <h3
        style={{
          textAlign: "center",
          fontWeight: "bold",
          color: "#2563eb",
          marginBottom: "8px",
          fontSize: "16px",
          marginRight: "32px",
        }}
      >
        Push Button
      </h3>

      {/* Pins Section */}
      <div style={{ marginBottom: "12px" }}>
        <h4
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "4px",
          }}
        >
          Pins
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", color: "#6b7280" }}>Pin</label>
          <PinSelect
            value={data.pin || ""}
            onChange={(val) => handleDataChange("pin", val)}
            availablePins={data.availablePins}
            pwmPins={data.pwmPins}
            selectStyle={{ width: "100%" }}
          />
        </div>
      </div>

      {/* Variables Section */}
      <div>
        <h4
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "4px",
          }}
        >
          State
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", color: "#6b7280" }}>Value</label>
          <select
            value={data.value || "LOW"}
            onChange={(e) => handleDataChange("value", e.target.value)}
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

      {/* Handles for connection */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ background: "#2563eb", width: "8px", height: "8px" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: "#2563eb", width: "8px", height: "8px" }}
      />
    </div>
  );
};

export default PushButtonNode;
