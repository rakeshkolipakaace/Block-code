import React from "react";

const NodeHeader = ({ title, color, icon }) => {
  return (
    <div
      style={{
        background: color,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: "10px 18px",
        color: "#fff",
        fontWeight: 700,
        fontSize: 20,
        display: icon ? "flex" : "block",
        alignItems: icon ? "center" : undefined,
        justifyContent: icon ? "space-between" : undefined,
      }}
    >
      {title}
      {icon && icon}
    </div>
  );
};

export default NodeHeader;

