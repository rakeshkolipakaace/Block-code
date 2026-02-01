import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";


const GPIOPinBlock = ({ data, selected, id }) => {
  const [pin, setPin] = useState("2");
  const [mode, setMode] = useState("OUT");

  const primaryColor = "#19c37d";
  const borderColor = "#222233";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={92}
      background="#222233"
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader
        title="GPIO Pin"
        color={primaryColor}
        icon={<FaCog style={{ color: "#fff", fontSize: 18 }} />}
      />

      <NodeBody gap={12}>
        <div>
          Pin{" "}
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: "#222",
              color: "#7da6ff",
              borderRadius: 8,
              border: "none",
              width: 38,
              height: 28,
              textAlign: "center",
              marginLeft: 6,
            }}
          />
        </div>
        <div>
          Mode{" "}
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: "#222",
              color: "#fff",
              borderRadius: 8,
              border: "none",
              width: 72,
              height: 28,
              marginLeft: 6,
            }}
          >
            <option value="OUT">OUT</option>
            <option value="IN">IN</option>
            <option value="PWM">PWM</option>
          </select>
        </div>
      </NodeBody>
      <StandardHandles />
    </NodeContainer>
  );
};

export default GPIOPinBlock;
