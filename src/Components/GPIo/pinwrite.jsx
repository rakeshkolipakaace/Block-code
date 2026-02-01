import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";


const PinWriteBlock = ({ data, selected, id }) => {
  const [pin, setPin] = useState("4");
  const [value, setValue] = useState(1);

  const primaryColor = "#ff9800";
  const borderColor = "#222233";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={190}
      minHeight={92}
      background="#222233"
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader
        title="Pin Write"
        color={primaryColor}
        icon={<FaCog style={{ color: "#fff", fontSize: 18 }} />}
      />

      <NodeBody gap={12}>
        <div>
          Pin{" "}
          <input type="text" value={pin} onChange={e => setPin(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            style={{ background: "#222", color: "#7da6ff", borderRadius: 8, border: "none", width: 45, height: 28, textAlign: "center", marginLeft: 6 }} />
        </div>
        <div>
          Value{" "}
          <label style={{ marginLeft: 10}}>
            <input
              type="radio"
              checked={value === 0}
              onChange={() => setValue(0)}
              style={{accentColor: "#fff", marginRight: 4}}
            /> 0
            <input
              type="radio"
              checked={value === 1}
              onChange={() => setValue(1)}
              style={{accentColor: "#00d26a", marginLeft: 18, marginRight: 4}}
            /> 1
          </label>
        </div>
      </NodeBody>
      <StandardHandles/>
    </NodeContainer>
  );
};

export default PinWriteBlock;
