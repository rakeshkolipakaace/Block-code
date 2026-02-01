import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import StandardHandles from "../common/StandardHandles";

export default function LcdDisplayNode({ data, selected, id }) {
  const [form, setForm] = useState({
    sdaPin: data?.sdaPin || "",
    sclPin: data?.sclPin || "",
    address: data?.address || "0x27",
    printText: data?.printText || "",
    row: data?.row || "0",
    column: data?.column || "0",
    backlight: data?.backlight || "HIGH",
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

      <NodeHeader title="16×2 LCD Display" color={primaryColor} />

      <div style={{ padding: "10px 14px", fontSize: 13 }}>
        <div style={rowStyle}>
          <span style={labelStyle}>SDA Pin:</span>
          <input
            type="text"
            value={form.sdaPin}
            onChange={(e) => handleDataChange("sdaPin", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          />
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>SCL Pin:</span>
          <input
            type="text"
            value={form.sclPin}
            onChange={(e) => handleDataChange("sclPin", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          />
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>Address:</span>
          <select
            value={form.address}
            onChange={(e) => handleDataChange("address", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          >
            <option>0x27</option>
            <option>0x3F</option>
          </select>
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>Print Text:</span>
          <input
            type="text"
            value={form.printText}
            onChange={(e) => handleDataChange("printText", e.target.value)}
            onPointerDown={stopEvent}
            style={{ ...inputStyle, color: "#9333ea" }}
          />
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>Row:</span>
          <select
            value={form.row}
            onChange={(e) => handleDataChange("row", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          >
            <option>0</option>
            <option>1</option>
          </select>
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>Column:</span>
          <select
            value={form.column}
            onChange={(e) => handleDataChange("column", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          >
            <option>0</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
        </div>

        <div style={rowStyle}>
          <span style={labelStyle}>Backlight:</span>
          <select
            value={form.backlight}
            onChange={(e) => handleDataChange("backlight", e.target.value)}
            onPointerDown={stopEvent}
            style={inputStyle}
          >
            <option>HIGH</option>
            <option>LOW</option>
          </select>
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
