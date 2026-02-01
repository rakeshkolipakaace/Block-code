import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { FaCog } from "react-icons/fa";
import DeleteButton from "../common/DeleteButton";
import NodeContainer from "../common/NodeContainer";
import NodeHeader from "../common/NodeHeader";
import NodeBody from "../common/NodeBody";
import StandardHandles from "../common/StandardHandles";

const ADCBlock = ({ data, selected, id }) => {
  const [pin, setPin] = useState("34");
  const [store, setStore] = useState("value");

  const primaryColor = "#19c37d";
  const borderColor = "#222233";

  return (
    <NodeContainer
      selected={selected}
      primaryColor={primaryColor}
      borderColor={borderColor}
      minWidth={215}
      minHeight={92}
      background="#222233"
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      <NodeHeader
        title="ADC"
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
               width: 45,
               height: 28,
               textAlign: "center",
               marginLeft: 6,
             }}
           />
         </div>
 
         {/* Store In Field + Handle (precise alignment) */}
         <div
           style={{
             display: "flex",
             alignItems: "center",
             position: "relative",
           }}
         >
           Store In{" "}
           <input
             type="text"
             value={store}
             onChange={(e) => setStore(e.target.value)}
             onPointerDown={(e) => e.stopPropagation()}
             onMouseDown={(e) => e.stopPropagation()}
             style={{
               background: "#222",
               color: "#00d26a",
               borderRadius: 8,
               border: "none",
               width: 105,
               height: 28,
               textAlign: "center",
               marginLeft: 6,
             }}
           />
 
           {/* ✅ Handle positioned exactly beside input field */}
           <Handle
             type="source"
             position={Position.Right}
             id="storeOutput"
             style={{
               background: "#00d26a",
               width: 10,
               height: 10,
               position: "absolute",
               right: -18, // distance from the right side of input box
               top: "50%", // vertically centered with input field
               transform: "translateY(-50%)",
               border: "2px solid #fff",
               zIndex: 5,
             }}
           />
         </div>
      </NodeBody>

      <StandardHandles primaryColor="#f97316" />
    </NodeContainer>
  );
};

export default ADCBlock;
