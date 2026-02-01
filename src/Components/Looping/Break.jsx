import React from "react";
import { Handle, Position } from "@xyflow/react";
import DeleteButton from "../common/DeleteButton";
import StandardHandles from "../common/StandardHandles";

const BreakBlock = ({ data, selected, id }) => {
  const handleDataChange = (key, value) => {
    data.onChange && data.onChange(key, value);
  };

  return (
    <div
      style={{
        background: "#111",
        border: `2px solid ${selected ? "#f59e0b" : "#ffe659"}`,
        borderRadius: "50%",
        color: "#ffe659",
        textAlign: "center",
        minWidth: 130,
        height: 130,
        fontFamily: "Inter, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        animation: "appear 0.8s cubic-bezier(.68,-0.55,.27,1.55)",
        boxShadow: selected ? "0 0 10px #ffe659" : "none",
        position: "relative",
      }}
    >
      <DeleteButton onDelete={data?.onDelete} nodeId={id} />
      <span style={{ fontSize: 18, color: "#fff", marginBottom: 6 }}>
        Break
      </span>
      <span style={{ fontSize: 28 }}>✂️</span>

    <StandardHandles/>

      <style>
        {`
          @keyframes appear {
            0% { opacity: 0; transform: scale(0.7); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default BreakBlock;
