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

const IfElseBlock = ({ data, selected, id }) => {
  const [left, setLeft] = useState(data?.left || "");
  const [right, setRight] = useState(data?.right || "0");
  const [operator, setOperator] = useState(data?.operator || ">=");

  return (
    <div
      style={{
        background: "#19191d",
        borderRadius: 16,
        minWidth: 280,
        minHeight: 85,
        boxShadow: selected ? "0 0 10px #0a86eb" : "0 4px 14px #0008",
        border: `2px solid ${selected ? "#0a86eb" : "#2c2c33"}`,
        fontFamily: "Inter, sans-serif",
        position: "relative",
        animation: "appear 0.5s cubic-bezier(.68,-0.55,.27,1.55)",
      }}
    >
      {/* --- Handles --- */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: "#0a86eb",
          width: 10,
          height: 10,
          borderRadius: "50%",
          position: "absolute",
          top: -5,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      <Handle
        type="source"
        id="true"
        position={Position.Right}
        style={{
          background: "#22c55e",
          width: 10,
          height: 10,
          borderRadius: "50%",
          position: "absolute",
          right: -5,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />

      <Handle
        type="source"
        id="false"
        position={Position.Left}
        style={{
          background: "#ef4444",
          width: 10,
          height: 10,
          borderRadius: "50%",
          position: "absolute",
          left: -5,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />

      <Handle
        type="source"
        id="output"
        position={Position.Bottom}
        style={{
          background: "#0a86eb",
          width: 10,
          height: 10,
          borderRadius: "50%",
          position: "absolute",
          bottom: -5,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* --- Header --- */}
      <div
        style={{
          background: "#0a86eb",
          borderTopLeftRadius: 14,
          borderTopRightRadius: 14,
          padding: "6px 12px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        If-Else
        <FaQuestionCircle style={{ fontSize: 16, color: "#fff" }} />
      </div>

      <DeleteButton onDelete={data?.onDelete} nodeId={id} />

      {/* --- Output Labels --- */}
      <div
        style={{
          position: "absolute",
          left: -45,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#ef4444",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        False
      </div>

      <div
        style={{
          position: "absolute",
          right: -40,
          top: "50%",
          transform: "translateY(-50%)",
          color: "#22c55e",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        True
      </div>

      {/* --- Condition Row --- */}
      <div
        style={{
          display: "flex",
          background: "#212128",
          borderRadius: 10,
          margin: "12px 14px",
          padding: "6px 8px",
          gap: 10,
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
            fontSize: 14,
            width: 60,
            height: 22,
            textAlign: "center",
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
            fontSize: 14,
            height: 22,
            width: 50,
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
            fontSize: 14,
            width: 60,
            height: 22,
            textAlign: "center",
            outline: "none",
          }}
        />
      </div>

      <style>
        {`
          @keyframes appear {
            0% { opacity: 0; transform: scale(0.85); }
            100% { opacity: 1; transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default IfElseBlock;
