import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import PinSelect from "../common/PinSelect";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import StandardHandles from "../common/StandardHandles";

export default function OledDisplayNode({ data, selected, id }) {
  const [form, setForm] = useState({
    port: data?.port || "Port 1",
    sckPin: data?.sckPin || "",
    sdaPin: data?.sdaPin || "",
    rotate: data?.rotate || "0",
    top: data?.top || "0",
    left: data?.left || "0",
    text: data?.text || "Hello world",
  });

  const handleDataChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const stopEvent = (e) => e.stopPropagation();

  const primaryColor = "#9333ea";
  const borderColor = "#581c87";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={220}
      minHeight={270}
      background="#0b0b0c"
      style={{ border: `3px solid ${selected ? primaryColor : borderColor}`, borderRadius: "12px", width: 220, height: 270, boxShadow: selected ? "0 0 12px #9333ea" : "0 3px 10px rgba(0,0,0,0.5)" }}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader title="1.3in Oled Display" color={primaryColor} />

      <div style={{ padding: "10px 14px", fontSize: 13 }}>
        <div style={rowStyle}>
          <span style={labelStyle}>Port:</span>
          <select
            value={form.port}
            onChange={(e) => handleDataChange("port", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          >
            <option>Port 1</option>
            <option>Port 2</option>
          </select>
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>SCK pin:</span>
          <input
            type="text"
            value={form.sckPin}
            onChange={(e) => handleDataChange("sckPin", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          />
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>SDA pin:</span>
          <input
            type="text"
            value={form.sdaPin}
            onChange={(e) => handleDataChange("sdaPin", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          />
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>Rotate:</span>
          <select
            value={form.rotate}
            onChange={(e) => handleDataChange("rotate", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          >
            <option value="0">0</option>
            <option value="90">180</option>
          </select>
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>Top:</span>
          <input
            type="text"
            value={form.top}
            onChange={(e) => handleDataChange("top", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          />
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>Left:</span>
          <input
            type="text"
            value={form.left}
            onChange={(e) => handleDataChange("left", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          />
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>Text:</span>
          <input
            type="text"
            value={form.text}
            onChange={(e) => handleDataChange("text", e.target.value)}
            onPointerDown={stopEvent}
            style={{ ...inputStyle, color: "#9333ea" }}
          />
        </div>
      </div>

      <StandardHandles primaryColor={primaryColor} />
    </NodeContainer>
  );
}

/* Shared styles */
const labelStyle = { flex: 1, textAlign: "left" };
const inputStyle = {
  background: "#111",
  border: "1px solid #333",
  borderRadius: 4,
  color: "#fff",
  width: 80,
  padding: "2px 5px",
  outline: "none",
  marginRight: 7,
};
const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
  gap: 20,
};
