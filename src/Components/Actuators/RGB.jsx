import React from "react";
import { Handle, Position } from "@xyflow/react";
import PinSelect from "../common/PinSelect";

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
      <PinSelect
        value={data.redPin || ""}
        onChange={(val) => handleChange("redPin", val)}
        availablePins={data.availablePins}
        pwmPins={data.pwmPins}
      />
      <label>Green Pin</label>
      <PinSelect
        value={data.greenPin || ""}
        onChange={(val) => handleChange("greenPin", val)}
        availablePins={data.availablePins}
        pwmPins={data.pwmPins}
      />
      <label>Blue Pin</label>
      <PinSelect
        value={data.bluePin || ""}
        onChange={(val) => handleChange("bluePin", val)}
        availablePins={data.availablePins}
        pwmPins={data.pwmPins}
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
