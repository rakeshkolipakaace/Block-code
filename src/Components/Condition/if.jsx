import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { FaQuestionCircle } from "react-icons/fa";
import DeleteButton from "../common/DeleteButton";

const OPERATORS = [
  { label: "=", value: "==" },
  { label: "≠", value: "!=" },
  { label: ">", value: ">" },
  { label: "<", value: "<" },
  { label: "≥", value: ">=" },
  { label: "≤", value: "<=" },
];

const IfBlock = ({ data, selected, id }) => {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("0");
  const [operator, setOperator] = useState(">=");

  return (
    <div
      style={{
        background: "#19191d",
        borderRadius: 18,
        minWidth: 300,
        minHeight: 85,
        boxShadow: selected ? "0 0 10px #0a86eb" : "0 5px 18px #0008",
        fontFamily: "Inter, sans-serif",
        border: `2px solid ${selected ? "#0a86eb" : "#25252b"}`,
        position: "relative",
        animation: "appear 0.8s cubic-bezier(.68,-0.55,.27,1.55)",
      }}
    >
      {/* Handles */}
      <Handle type="target" position={Position.Top} style={{ background: "#0a86eb", width: 8, height: 8 }} />
      <Handle type="target" position={Position.Left} style={{ background: "#0a86eb", width: 8, height: 8 }} />
      <Handle type="source" position={Position.Right} style={{ background: "#0a86eb", width: 8, height: 8 }} />
      <Handle type="source" position={Position.Bottom} style={{ background: "#0a86eb", width: 8, height: 8 }} />

      {/* Header */}
      <div
        style={{
          background: "#0a86eb",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: "8px 14px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        If
        <FaQuestionCircle style={{ fontSize: 17, color: "#fff" }} />
      </div>

      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      {/* Output: True */}
      <div
        style={{
          position: "absolute",
          right: -35,
          top: "57%",
          color: "#aaa",
          fontSize: 14,
        }}
      >
        True
      </div>

      {/* Condition Row */}
      <div
        style={{
          display: "flex",
          background: "#212128",
          borderRadius: 12,
          margin: "14px 14px",
          padding: "8px 10px",
          gap: 12,
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={left}
          onChange={(e) => setLeft(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            background: "transparent",
            border: "1.5px solid #3b3b46",
            borderRadius: 6,
            color: "#eee",
            fontSize: 15,
            width: 70,
            height: 28,
            paddingLeft: 8,
            outline: "none",
          }}
        />
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            background: "#19191d",
            border: "1.5px solid #3b3b46",
            borderRadius: 6,
            color: "#eee",
            fontSize: 15,
            height: 28,
            width: 55,
            textAlign: "center",
            outline: "none",
          }}
        >
          {OPERATORS.map((op) => (
            <option key={op.value} value={op.value}>
              {op.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={right}
          onChange={(e) => setRight(e.target.value)}
          onPointerDown={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          style={{
            background: "transparent",
            border: "1.5px solid #3b3b46",
            borderRadius: 6,
            color: "#eee",
            fontSize: 15,
            width: 55,
            height: 28,
            textAlign: "center",
            outline: "none",
          }}
        />
      </div>

      <style>
        {`
          @keyframes appear {
            0% { opacity: 0; transform: scale(0.7);}
            100% { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </div>
  );
};

export default IfBlock;
