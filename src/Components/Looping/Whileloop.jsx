import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

export default function WhileLoopBlock({ data, selected, id }) {
  const [condition, setCondition] = useState(data?.condition || "True");

  const handleChange = (key, value) => {
    data?.onChange && data.onChange(key, value);
  };

  const primaryColor = "#16a34a";
  const borderColor = "#15803d";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={140}
      background="#1e1e2e"
      style={{ boxShadow: selected ? "0 0 12px #16a34a" : "0 5px 18px #0007" }}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader title="While Loop" color={primaryColor} icon={<span>∞</span>} />

      <NodeBody gap={12}>
        <label style={{ fontSize: 14, fontWeight: 500, color: "#ccc" }}>
          Condition
        </label>
        <input
          value={condition}
          onChange={(e) => {
            setCondition(e.target.value);
            handleChange("condition", e.target.value);
          }}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            background: "#111",
            border: "1px solid #333",
            borderRadius: 8,
            color: "#22c55e",
            padding: "4px 6px",
            width: "100%",
            fontSize: 13,
            height: "20px",
            outline: "none",
          }}
          placeholder="Enter condition"
        />
      </NodeBody>

      <StandardHandles primaryColor={primaryColor} />
    </NodeContainer>
  );
}
