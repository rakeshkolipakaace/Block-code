import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import PinSelect from "../common/PinSelect";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

const SoilMoistureSensorNode = ({ data, selected, id }) => {
  const [form, setForm] = useState({
    analogPin: data?.analogPin || "",
    moisture: data?.moisture || "",
  });

  const handleChange = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    // if (data.onChange) data.onChange(id, { ...form, [key]: val });
  };

  const primaryColor = "#f97316";
  const borderColor = "#7c2d12";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={150}
      style={{ border: `3px solid ${selected ? primaryColor : borderColor}` }}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader title="Soil Moisture Sensor" color={primaryColor} />

      <NodeBody>
        {/* Analog Pin */}
        <div style={{ display: "flex", alignItems: "center" }}>
          Analog Pin{" "}
          <PinSelect
            value={form.analogPin}
            onChange={(val) => handleChange("analogPin", val)}
            availablePins={data.availablePins}
            pwmPins={data.pwmPins}
            selectStyle={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 6,
              color: "#fff",
              width: 80,
              height: 26,
              marginLeft: 8,
              outline: "none",
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>

        {/* Moisture */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          Moisture{" "}
          <input
            type="text"
            value={form.moisture}
            placeholder="Moisture"
            onChange={(e) => handleChange("moisture", e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 6,
              color: "#f97316",
              width: 80,
              height: 26,
              marginLeft: 8,
              paddingLeft: 6,
              outline: "none",
            }}
          />
         
        </div>
      </NodeBody>

      <StandardHandles primaryColor={primaryColor} />
    </NodeContainer>
  );
};

export default SoilMoistureSensorNode;
