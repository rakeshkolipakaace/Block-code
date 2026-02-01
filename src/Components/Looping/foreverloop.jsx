import React from "react";
import { Handle, Position } from "@xyflow/react";
import { FaArrowsRotate } from "react-icons/fa6";
import DeleteButton from "../common/DeleteButton";
import StandardHandles from "../common/StandardHandles";


const ForeverLoopBlock = ({ data, selected, id }) => {
  const handleDataChange = (key, value) => {
    data.onChange && data.onChange(key, value);
  };

  return (
    <div
      style={{
        background: "#001c18",
        border: "2px solid #16d798",
        borderRadius: "500px",
        color: "#16d798",
        minWidth: 220,
        minHeight: 100,
        fontFamily: "Inter, sans-serif",
        boxShadow: selected ? "0 0 10px #16d798" : "0 5px 18px #0008",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        animation: "appear 0.8s cubic-bezier(.68,-0.55,.27,1.55)",
        position: "relative",
      }}
    >
     <DeleteButton onDelete={data?.onDelete} nodeId={id} />
      <span style={{ color: "#fff", fontSize: 18, marginBottom: 8 }}>
        Forever Loop
      </span>
      <span
        style={{
          fontSize: 38,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 44,
        }}
      >
        <FaArrowsRotate
          style={{
            color: "#16d798",
            animation: "rotate 1.5s linear infinite",
            display: "inline-block",
          }}
        />
      </span>

      <StandardHandles />

      <style>
        {`
          @keyframes appear {
            0% { opacity: 0; transform: scale(0.7); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes rotate {
            from { transform: rotate(0deg);}
            to { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  );
};

export default ForeverLoopBlock;
