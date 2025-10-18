import React from "react";
import { Handle, Position } from "@xyflow/react";

const RGBLEDBlock = ({ data, selected, id }) => {
  const handleChange = (key, value) =>
    data.onChange && data.onChange(key, value);
  const handleDelete = () => data.onDelete && data.onDelete(parseFloat(id));

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        border: `2px solid ${selected ? "#3b82f6" : "#e5e7eb"}`,
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

      <h3 style={{ textAlign: "center", color: "#3b82f6", fontWeight: "bold" }}>
        RGB LED
      </h3>

      <label>Red Pin</label>
      <input
        type="number"
        value={data.redPin || ""}
        onChange={(e) => handleChange("redPin", e.target.value)}
      />
      <label>Green Pin</label>
      <input
        type="number"
        value={data.greenPin || ""}
        onChange={(e) => handleChange("greenPin", e.target.value)}
      />
      <label>Blue Pin</label>
      <input
        type="number"
        value={data.bluePin || ""}
        onChange={(e) => handleChange("bluePin", e.target.value)}
      />

      <label>Color</label>
      <input
        type="text"
        value={data.color || ""}
        onChange={(e) => handleChange("color", e.target.value)}
        placeholder="Enter color name or RGB value"
      />

      <label>Brightness (0–255)</label>
      <input
        type="number"
        value={data.brightness || ""}
        onChange={(e) => handleChange("brightness", e.target.value)}
      />

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default RGBLEDBlock;
