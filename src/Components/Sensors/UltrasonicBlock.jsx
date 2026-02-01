import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

export default function UltrasonicSensorNode({ data, selected, id }) {
  const [form, setForm] = useState({
    port: data?.port || "Port 1",
    triggerPin: data?.triggerPin || "",
    echoPin: data?.echoPin || "",
    distance: data?.distance || "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // if (data.onChange) data.onChange(key, value);
  };

  const stopEvent = (e) => e.stopPropagation();

  const primaryColor = "#a855f7";
  const borderColor = "#5b21b6";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={180}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader title="Ultrasonic Sensor" color={primaryColor} />

      <NodeBody>
        {/* Port */}
        <div>
          Port{" "}
          <select
            value={form.port}
            onChange={(e) => handleChange("port", e.target.value)}
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#a855f7",
              width: 90,
              height: 28,
              textAlign: "center",
              marginLeft: 8,
              outline: "none",
            }}
          >
            <option value="Port 1">Port 1</option>
            <option value="Port 2">Port 2</option>
          </select>
        </div>

        {/* Trigger Pin */}
        <div>
          Trigger Pin{" "}
          <input
            type="text"
            value={form.triggerPin}
            onChange={(e) => handleChange("triggerPin", e.target.value)}
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#fff",
              width: 80,
              height: 26,
              marginLeft: 8,
              outline: "none",
              paddingLeft: 5,
            }}
          />
        </div>

        {/* Echo Pin */}
        <div>
          Echo Pin{" "}
          <input
            type="text"
            value={form.echoPin}
            onChange={(e) => handleChange("echoPin", e.target.value)}
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#fff",
              width: 80,
              height: 26,
              marginLeft: 8,
              outline: "none",
              paddingLeft: 5,
            }}
          />
        </div>

        {/* Distance */}
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          Distance{" "}
          <input
            type="text"
            value={form.distance}
            onChange={(e) => handleChange("distance", e.target.value)}
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#22c55e",
              width: 90,
              height: 26,
              textAlign: "center",
              marginLeft: 8,
              outline: "none",
            }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="distance"
            style={{
              background: "#22c55e",
              width: 10,
              height: 10,
              right: -20,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </div>
      </NodeBody>

      <StandardHandles primaryColor={primaryColor} />
    </NodeContainer>
  );
}
