import React from "react";
import { Handle, Position } from "@xyflow/react";

const StandardHandles = ({
  primaryColor,
  topId = "input",
  bottomId = "bottom",
  bottomOffset = -8,
}) => {
  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        id={topId}
        style={{
          background: primaryColor,
          width: 6,
          height: 6,
          top: -5,
          left: "50%",
          transform: "translateX(-50%)",
          border: "2px solid #fff",
          zIndex: 5,
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={bottomId}
        style={{
          background: primaryColor,
          width: 6,
          height: 6,
          bottom: bottomOffset,
          left: "50%",
          transform: "translateX(-50%)",
          border: "2px solid #fff",
          zIndex: 5,
        }}
      />
    </>
  );
};

export default StandardHandles;

