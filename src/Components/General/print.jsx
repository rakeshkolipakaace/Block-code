import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { FaPrint } from "react-icons/fa";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

const PrintNode = ({ data, selected, id }) => {
  const [text, setText] = useState(data.text || "'Hello world'");

  const handleChange = (key, val) => {
    // if (data.onChange) data.onChange(key, val);
  };

  const primaryColor = "#3b82f6";
  const borderColor = "#1e1e2e";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={150}
      background="#1e1e2e"
      style={{ boxShadow: selected ? "0 0 12px #3b82f6" : "0 5px 18px #0007" }}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader
        title="Print"
        color={primaryColor}
        icon={<FaPrint style={{ color: "#fff", fontSize: 18 }} />}
      />

      <NodeBody gap={12}>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <label style={{ fontSize: 14, fontWeight: 500, color: "#ccc" }}>
            Text
          </label>
          <input
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleChange("text", e.target.value);
            }}
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
            placeholder="'Enter text'"
          />
        </div>
      </NodeBody>

      <StandardHandles primaryColor={primaryColor} />
    </NodeContainer>
  );
};

export default PrintNode;
