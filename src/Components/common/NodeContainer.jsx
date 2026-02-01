import React from "react";

const NodeContainer = ({
  selected,
  primaryColor,
  borderColor,
  minWidth = 230,
  minHeight = 150,
  background = "#0b0b0c",
  children,
  style = {},
}) => {
  const containerStyle = {
    background,
    borderRadius: 20,
    minWidth,
    minHeight,
    fontFamily: "Inter, sans-serif",
    border: `2px solid ${selected ? primaryColor : borderColor}`,
    position: "relative",
    animation: "appear 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
    boxShadow: selected
      ? `0 0 10px ${primaryColor}`
      : "0 5px 18px #0007",
    ...style,
  };

  return (
    <>
      <div style={containerStyle}>{children}</div>
      <style>
        {`
          @keyframes appear {
            0% { opacity: 0; transform: scale(0.8);} 
            100% { opacity: 1; transform: scale(1);} 
          }
        `}
      </style>
    </>
  );
};

export default NodeContainer;

