import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

const PWMBlock = ({ data, selected, id }) => {
  const [pin, setPin] = useState("2");
  const [frequency, setFrequency] = useState("1000");
  const [duty, setDuty] = useState("512");

  const primaryColor = "#7b44ff";
  const borderColor = "#222233";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={230}
      minHeight={115}
      background="#222233"
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader
        title="PWM"
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
          Frequency{" "}
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              background: "#222",
              color: "#7da6ff",
              borderRadius: 8,
              border: "none",
              width: 58,
              height: 28,
              textAlign: "center",
              marginLeft: 6,
            }}
          />
        </div>
        <div>
          Duty Cycle{" "}
          <input
            type="text"
            value={duty}
            onChange={(e) => setDuty(e.target.value)}
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
      </NodeBody>
      <StandardHandles/>

    </NodeContainer>
  );
};

export default PWMBlock;
