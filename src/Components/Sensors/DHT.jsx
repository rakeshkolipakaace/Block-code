import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import PinSelect from "../common/PinSelect";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

export default function DHT11SensorNode({ data, selected, id }) {
  const [form, setForm] = useState({
    dataPin: data?.dataPin || "",
    temperature: data?.temperature || "",
    humidity: data?.humidity || "",
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    // if (data.onChange) data.onChange(key, value);
  };

  const stopEvent = (e) => e.stopPropagation();

  const primaryColor = "#43a047";
  const borderColor = "#1e7e34";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={180}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader title="DHT11 Sensor" color={primaryColor} />

      <NodeBody>
        {/* Data Pin */}
        <div>
          Data Pin <PinSelect />
        </div>

        {/* Temperature */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          Temperature{" "}
          <input
            type="text"
            value={form.temperature}
            onChange={(e) => handleChange("temperature", e.target.value)}
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
            placeholder="temperature"
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
            id="temperature"
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

        {/* Humidity */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          Humidity{" "}
          <input
            type="text"
            value={form.humidity}
            onChange={(e) => handleChange("humidity", e.target.value)}
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
            placeholder="humidity"
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#3b82f6",
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
            id="humidity"
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
