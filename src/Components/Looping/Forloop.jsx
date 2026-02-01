import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

export default function ForLoopBlock({ data, selected, id }) {
  const [variable, setVariable] = useState(data?.variable || "i");
  const [range, setRange] = useState(data?.range || "range(10)");

  const handleChange = (key, value) => {
    data?.onChange && data.onChange(key, value);
  };

  const primaryColor = "#7b44ff";
  const borderColor = "#5b21b6";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={160}
      background="#1e1e2e"
      style={{ boxShadow: selected ? "0 0 12px #a78bfa" : "0 5px 18px #0007" }}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader title="For Loop" color={primaryColor} icon={<span>∞</span>} />

      <NodeBody gap={10}>
        {/* Variable Input */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#ccc" }}>
            Variable
          </label>
          <input
            value={variable}
            onChange={(e) => {
              setVariable(e.target.value);
              handleChange("variable", e.target.value);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#a78bfa",
              padding: "4px 6px",
              width: "100%",
              fontSize: 13,
              height: "20px",
              outline: "none",
            }}
            placeholder="Enter variable"
          />
        </div>

        {/* Range Input */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#ccc" }}>
            Range
          </label>
          <input
            value={range}
            onChange={(e) => {
              setRange(e.target.value);
              handleChange("range", e.target.value);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#a78bfa",
              padding: "4px 6px",
              width: "100%",
              fontSize: 13,
              height: "20px",
              outline: "none",
            }}
            placeholder="range(10)"
          />
        </div>
      </NodeBody>

      <StandardHandles primaryColor="#a78bfa" />
    </NodeContainer>
  );
}
