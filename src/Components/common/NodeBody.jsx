import React from "react";

const NodeBody = ({ children, gap = 14, padding = "16px 18px" }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap,
        padding,
        color: "#fff",
      }}
    >
      {children}
    </div>
  );
};

export default NodeBody;

