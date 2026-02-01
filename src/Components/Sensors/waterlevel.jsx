import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import PinSelect from "../common/PinSelect";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

export default function WaterLevelSensorNode({ data, selected, id }) {
  const [form, setForm] = useState({
    outPin: data?.outPin || "",
    irValue: data?.irValue || "",
  });

  const handleDataChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (data.onChange) data.onChange(key, value);
  };

  const stopEvent = (e) => e.stopPropagation();

  const primaryColor = "#f97316";
  const borderColor = "#7c2d12";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={150}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader title="Water Level Sensor" color={primaryColor} />

      <NodeBody>
        {/* OUT Pin */}
        <div>
          OUT Pin{" "}
          <PinSelect
            value={form.outPin}
            onChange={(val) => handleDataChange("outPin", val)}
            availablePins={data.availablePins}
            pwmPins={data.pwmPins}
            selectStyle={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#fff",
              width: 80,
              height: 28,
              marginLeft: 8,
              outline: "none",
            }}
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
          />
        </div>

        {/* IR Value */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          IR Value{" "}
          <select
            value={form.irValue}
            onChange={(e) => handleDataChange("irValue", e.target.value)}
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#f97316",
              width: 90,
              height: 28,
              textAlign: "center",
              marginLeft: 8,
              outline: "none",
            }}
          >
            <option value="">Select</option>
            <option value="HIGH">HIGH</option>
            <option value="LOW">LOW</option>
          </select>

          <Handle
            type="source"
            position={Position.Right}
            id="output"
            style={{
              background: "#f97316",
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
