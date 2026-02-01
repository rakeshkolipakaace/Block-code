import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { FaCog } from "react-icons/fa";
import PinSelect from "../common/PinSelect";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

const BuzzerNode = ({ data, selected, id }) => {
  const [pin, setPin] = useState(data.pin || "");
  const [output, setOutput] = useState(data.output || "LOW");

  const handleChange = (key, value) => {
    if (data.onChange) data.onChange(key, value);
  };

  const primaryColor = "#19c37d";
  const borderColor = "#222233";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={150}
      background="#222233"
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader
        title="Buzzer"
        color={primaryColor}
        icon={<FaCog style={{ color: "#fff", fontSize: 18 }} />}
      />

      <NodeBody gap={12}>
        {/* Pin Selection */}
        <div>
          Pin{" "}
          <PinSelect
            value={pin}
            onChange={(val) => {
              setPin(val);
              handleChange("pin", val);
            }}
            availablePins={data.availablePins}
            pwmPins={data.pwmPins}
            selectStyle={{
              background: "#222",
              color: "#7da6ff",
              borderRadius: 8,
              border: "none",
              width: 60,
              height: 28,
              marginLeft: 6,
            }}
          />
        </div>

        {/* Output Selection */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          Output{" "}
          <select
            value={output}
            onChange={(e) => {
              setOutput(e.target.value);
              handleChange("output", e.target.value);
            }}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: "#222",
              color: "#00d26a",
              borderRadius: 8,
              border: "none",
              width: 80,
              height: 28,
              textAlign: "center",
              marginLeft: 6,
            }}
          >
            <option value="HIGH">HIGH</option>
            <option value="LOW">LOW</option>
          </select>

          {/* Handle beside Output */}
         
        </div>
      </NodeBody>

      <StandardHandles primaryColor="#f97316" />
    </NodeContainer>
  );
};

export default BuzzerNode;
