import React from "react";
import { Handle, Position } from "@xyflow/react";
import PinSelect from "../common/PinSelect";

const DHT11SensorNode = ({ data, selected, id }) => {
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
        border: `2px solid ${selected ? "#43a047" : "#e5e7eb"}`,
        padding: "12px",
        width: "256px",
        minHeight: "200px",
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
          color: "#43a047",
          marginBottom: "8px",
          fontSize: "16px",
          marginRight: "32px", // Avoid overlap with delete button
        }}
      >
        DHT11 Sensor
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
          <label style={{ fontSize: "12px", color: "#6b7280" }}>Data Pin</label>
          <PinSelect
            value={data.dataPin || ""}
            onChange={(val) => handleDataChange("dataPin", val)}
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
          Variables
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <label style={{ fontSize: "12px", color: "#6b7280" }}>
            Temperature
          </label>
          <input
            type="text"
            value={data.temperature || ""}
            onChange={(e) => handleDataChange("temperature", e.target.value)}
            placeholder="temperature"
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              padding: "4px 8px",
              fontSize: "14px",
            }}
          />

          <label
            style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}
          >
            Humidity
          </label>
          <input
            type="text"
            value={data.humidity || ""}
            onChange={(e) => handleDataChange("humidity", e.target.value)}
            placeholder="humidity"
            style={{
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              padding: "4px 8px",
              fontSize: "14px",
            }}
          />
        </div>
      </div>

      {/* Handles for connection */}
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ background: "#43a047", width: "8px", height: "8px" }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ background: "#43a047", width: "8px", height: "8px" }}
      />
    </div>
  );
};

export default DHT11SensorNode;
