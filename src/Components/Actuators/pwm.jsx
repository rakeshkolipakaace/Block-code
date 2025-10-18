import React from "react";
import { Handle, Position } from "@xyflow/react";

const PWMLEDBlock = ({ data, selected, id }) => {
  const handleChange = (key, value) =>
    data.onChange && data.onChange(key, value);
  const handleDelete = () => data.onDelete && data.onDelete(parseFloat(id));

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        border: `2px solid ${selected ? "#10b981" : "#e5e7eb"}`,
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        padding: "12px",
        width: "256px",
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

      <h3 style={{ textAlign: "center", color: "#10b981", fontWeight: "bold" }}>
        PWM LED
      </h3>

      <label>Pin</label>
      <input
        type="number"
        value={data.pin || ""}
        onChange={(e) => handleChange("pin", e.target.value)}
      />

      <label>Output</label>
      <input
        type="text"
        value={data.output || ""}
        onChange={(e) => handleChange("output", e.target.value)}
        placeholder="HIGH / LOW"
      />

      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default PWMLEDBlock;
