import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import PinSelect from "../common/PinSelect";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

const ServoMotorBlock = ({ data, selected, id }) => {
  const [servoPin, setServoPin] = useState(data?.servoPin || "");
  const [angle, setAngle] = useState(data?.angle || "");

  const handleChange = (key, val) => {
    // if (data.onChange) data.onChange(key, val);
  };

  const stopEvent = (e) => e.stopPropagation();

  const primaryColor = "#2563eb"; // Blue
  const borderColor = "#1e3a8a"; // Dark Blue

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={150}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader title="Servo Motor" color={primaryColor} />

      <NodeBody>
        {/* Servo Pin */}
        <div>
          Servo Pin{" "}
          <PinSelect
            value={servoPin}
            onChange={(val) => {
              setServoPin(val);
              handleChange("servoPin", val);
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

        {/* Angle Input */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          Angle{" "}
          <input
            type="number"
            min="0"
            max="180"
            value={angle}
            placeholder="0 - 180°"
            onChange={(e) => {
              setAngle(e.target.value);
              handleChange("angle", e.target.value);
            }}
            onPointerDown={stopEvent}
            onMouseDown={stopEvent}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: 8,
              color: "#60a5fa",
              width: 80,
              height: 28,
              textAlign: "center",
              marginLeft: 8,
              outline: "none",
            }}
          />
          <Handle
            type="source"
            position={Position.Right}
            id="output"
            style={{
              background: primaryColor,
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

export default ServoMotorBlock;
