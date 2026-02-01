import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

const VariableNode = ({ data, selected, id }) => {
  const [form, setForm] = useState({
    variable: data?.variable || "x",
    value: data?.value || "0",
  });

  const handleDataChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // if (data.onChange) data.onChange(key, value);
  };

  const primaryColor = "#eab308";
  const borderColor = "#1e1e2e";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={150}
      background="#1e1e2e"
      style={{ boxShadow: selected ? "0 0 12px #eab308" : "0 5px 18px #0007" }}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader title="Variable" color={primaryColor} />

      <NodeBody gap={12}>
        {/* Variable Name */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#ccc" }}>
            Variable
          </label>
          <input
            value={form.variable}
            onChange={(e) => handleDataChange("variable", e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#eab308",
              padding: "6px 8px",
              width: "100%",
              fontSize: 13,
              outline: "none",
            }}
            placeholder="Enter variable name"
          />
        </div>

        {/* Value */}
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#ccc" }}>
            Value
          </label>
          <input
            value={form.value}
            onChange={(e) => handleDataChange("value", e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#22c55e",
              padding: "6px 8px",
              width: "100%",
              fontSize: 13,
              outline: "none",
            }}
            placeholder="Enter value"
          />
        </div>
      </NodeBody>

      <StandardHandles primaryColor={primaryColor} />
    </NodeContainer>
  );
};

export default VariableNode;
