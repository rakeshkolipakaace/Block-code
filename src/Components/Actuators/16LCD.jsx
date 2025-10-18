import React from "react";
import { Handle, Position } from "@xyflow/react";
import PinSelect from "../common/PinSelect";

const LCD16x2Block = ({ data, selected, id }) => {
  const handleChange = (key, value) =>
    data.onChange && data.onChange(key, value);
  const handleDelete = () => data.onDelete && data.onDelete(parseFloat(id));

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        border: `2px solid ${selected ? "#0ea5e9" : "#e5e7eb"}`,
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

      <h3 style={{ textAlign: "center", color: "#0ea5e9", fontWeight: "bold" }}>
        LCD 16×2
      </h3>

      <label>SDA Pin</label>
      <PinSelect
        value={data.sda || ""}
        onChange={(val) => handleChange("sda", val)}
        availablePins={data.availablePins}
        pwmPins={data.pwmPins}
      />

      <label>SCL Pin</label>
      <PinSelect
        value={data.scl || ""}
        onChange={(val) => handleChange("scl", val)}
        availablePins={data.availablePins}
        pwmPins={data.pwmPins}
      />

      <label>Backlight (High/Low)</label>
      <input
        type="text"
        value={data.backlight || ""}
        onChange={(e) => handleChange("backlight", e.target.value)}
        placeholder="HIGH / LOW"
      />

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default LCD16x2Block;
