import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import PinSelect from "../common/PinSelect";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

const LDRSensorNode = ({ data, selected, id }) => {
  const [analogPin, setAnalogPin] = useState(data?.analogPin || "");
  const [intensity, setIntensity] = useState(data?.intensity || "");

  const handleChange = (key, val) => {
    // if (data.onChange) data.onChange(key, val);
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

      <NodeHeader title="LDR Sensor" color={primaryColor} />

      <NodeBody>
        {/* Analog Pin */}
        <div>
          Analog Pin{" "}
          <PinSelect
            value={analogPin}
            onChange={(val) => {
              setAnalogPin(val);
              handleChange("analogPin", val);
            }}
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

        {/* Intensity */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          Intensity{" "}
          <input
            type="text"
            value={intensity}
            placeholder="Intensity"
            onChange={(e) => {
              setIntensity(e.target.value);
              handleChange("intensity", e.target.value);
            }}
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#f97316",
              width: 80,
              height: 28,
              textAlign: "center",
              marginLeft: 8,
            }}
          />
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
};

export default LDRSensorNode;
