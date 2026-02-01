import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { FaPalette } from "react-icons/fa";
import PinSelect from "../common/PinSelect";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

const RGBLEDBlock = ({ data, selected, id }) => {
  const [redPin, setRedPin] = useState(data.redPin || "");
  const [greenPin, setGreenPin] = useState(data.greenPin || "");
  const [bluePin, setBluePin] = useState(data.bluePin || "");
  const [color, setColor] = useState(data.color || "");
  const [brightness, setBrightness] = useState(data.brightness || "MEDIUM");

  const handleChange = (key, val) => {
    // if (data.onChange) data.onChange(key, val);
  };

  const primaryColor = "#3b82f6";
  const borderColor = "#222233";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={250}
      minHeight={200}
      background="#222233"
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader
        title="RGB LED"
        color={primaryColor}
        icon={<FaPalette style={{ color: "#fff", fontSize: 18 }} />}
      />

      <NodeBody gap={10} padding="14px 18px">
        {/* Red Pin */}
        <div>
          Red Pin{" "}
          <PinSelect
            value={redPin}
            onChange={(val) => {
              setRedPin(val);
              handleChange("redPin", val);
            }}
            availablePins={data.availablePins}
            pwmPins={data.pwmPins}
            selectStyle={{
              background: "#222",
              color: "#ff4d4d",
              borderRadius: 8,
              border: "none",
              width: 60,
              height: 28,
              marginLeft: 6,
            }}
          />
        </div>

        {/* Green Pin */}
        <div>
          Green Pin{" "}
          <PinSelect
            value={greenPin}
            onChange={(val) => {
              setGreenPin(val);
              handleChange("greenPin", val);
            }}
            availablePins={data.availablePins}
            pwmPins={data.pwmPins}
            selectStyle={{
              background: "#222",
              color: "#22c55e",
              borderRadius: 8,
              border: "none",
              width: 60,
              height: 28,
              marginLeft: 6,
            }}
          />
        </div>

        {/* Blue Pin */}
        <div>
          Blue Pin{" "}
          <PinSelect
            value={bluePin}
            onChange={(val) => {
              setBluePin(val);
              handleChange("bluePin", val);
            }}
            availablePins={data.availablePins}
            pwmPins={data.pwmPins}
            selectStyle={{
              background: "#222",
              color: "#60a5fa",
              borderRadius: 8,
              border: "none",
              width: 60,
              height: 28,
              marginLeft: 6,
            }}
          />
        </div>

        {/* Color Input */}
        <div>
          Color{" "}
          <input
            type="text"
            value={color}
            placeholder="e.g. red or #FF0000"
            onChange={(e) => {
              setColor(e.target.value);
              handleChange("color", e.target.value);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: "#222",
              color: "#fff",
              borderRadius: 8,
              border: "none",
              width: "100%",
              height: 28,
              paddingLeft: 8,
              marginTop: 4,
            }}
          />
        </div>

        {/* Brightness Dropdown */}
        <div>
          Brightness{" "}
          <select
            value={brightness}
            onChange={(e) => {
              setBrightness(e.target.value);
              handleChange("brightness", e.target.value);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: "#222",
              color: "#fbbf24",
              borderRadius: 8,
              border: "none",
              width: 100,
              height: 28,
              marginLeft: 6,
              textAlign: "center",
            }}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            <option value="FULL">FULL</option>
          </select>
        </div>
      </NodeBody>

      <StandardHandles
        primaryColor={primaryColor}
        bottomId="output"
        bottomOffset={-10}
      />
    </NodeContainer>
  );
};

export default RGBLEDBlock;
