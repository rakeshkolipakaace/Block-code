import React from "react";
import { Handle, Position } from "@xyflow/react";
import PinSelect from "../common/PinSelect";

const RelayBlock = ({ data, selected, id }) => {
  const handleChange = (key, value) =>
    data.onChange && data.onChange(key, value);
  const handleDelete = () => data.onDelete && data.onDelete(parseFloat(id));

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        border: `2px solid ${selected ? "#8b5cf6" : "#e5e7eb"}`,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        padding: "12px",
        width: "260px",
        position: "relative",
      }}
    >
      <button
        onClick={handleDelete}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          background: "#ef4444",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "24px",
          height: "24px",
          cursor: "pointer",
        }}
      >
        ×
      </button>

      <h3 style={{ textAlign: "center", color: "#8b5cf6", fontWeight: "bold" }}>
        Relay
      </h3>

      <label>Pin (IN)</label>
      <PinSelect
        value={data.pin || ""}
        onChange={(val) => handleChange("pin", val)}
        availablePins={data.availablePins}
        pwmPins={data.pwmPins}
      />

      <label>NO (High/Low)</label>
      <input
        type="text"
        value={data.no || ""}
        onChange={(e) => handleChange("no", e.target.value)}
        placeholder="HIGH / LOW"
      />

      <label>NC (High/Low)</label>
      <input
        type="text"
        value={data.nc || ""}
        onChange={(e) => handleChange("nc", e.target.value)}
        placeholder="HIGH / LOW"
      />

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default RelayBlock;
