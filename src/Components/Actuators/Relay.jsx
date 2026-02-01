import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { FaBolt } from "react-icons/fa";
import PinSelect from "../common/PinSelect";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

const RelayBlock = ({ data, selected, id }) => {
  const [pin, setPin] = useState(data.pin || "");
  const [no, setNo] = useState(data.no || "LOW");
  const [nc, setNc] = useState(data.nc || "HIGH");

  const handleChange = (key, val) => {
    if (data.onChange) data.onChange(key, val);
  };

  const primaryColor = "#f59e0b";
  const borderColor = "#1e293b";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={250}
      minHeight={180}
      background="#1e293b"
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader
        title="Relay"
        color={primaryColor}
        icon={<FaBolt style={{ color: "#fff", fontSize: 18 }} />}
      />

      <NodeBody gap={10} padding="14px 18px">
        {/* Pin (IN) */}
        <div>
          Pin (IN){" "}
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
              color: "#facc15",
              borderRadius: 8,
              border: "none",
              width: 80,
              height: 28,
              marginLeft: 6,
            }}
          />
        </div>

        {/* NO Dropdown */}
        <div>
          NO (High/Low){" "}
          <select
            value={no}
            onChange={(e) => {
              setNo(e.target.value);
              handleChange("no", e.target.value);
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
            <option value="HIGH">HIGH</option>
            <option value="LOW">LOW</option>
          </select>
        </div>

        {/* NC Dropdown */}
        <div>
          NC (High/Low){" "}
          <select
            value={nc}
            onChange={(e) => {
              setNc(e.target.value);
              handleChange("nc", e.target.value);
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
            <option value="HIGH">HIGH</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </NodeBody>

      <StandardHandles primaryColor={primaryColor} bottomId="output" bottomOffset={-10} />
    </NodeContainer>
  );
};

export default RelayBlock;
