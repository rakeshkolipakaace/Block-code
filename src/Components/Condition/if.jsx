import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

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
        minWidth: 320,
        minHeight: 95,
        boxShadow: selected ? "0 0 10px #0a86eb" : "0 5px 18px #0008",
        fontFamily: "Inter, sans-serif",
        border: `2px solid ${selected ? "#0a86eb" : "#25252b"}`,
        position: "relative",
        animation: "appear 0.8s cubic-bezier(.68,-0.55,.27,1.55)",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "#0a86eb",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: "12px 18px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        If
        <FaQuestionCircle style={{ fontSize: 19, color: "#fff" }} />
      </div>
      {/* Delete Button */}
      <button
        onClick={() => data?.onDelete && data.onDelete(parseFloat(id))}
        style={{
          position: "absolute",
          top: 8,
          right: 8,
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: "#ef4444",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        title="Delete node"
      >
        ×
      </button>

      {/* Output: True */}
      <div
        style={{
          position: "absolute",
          right: -32,
          top: "57%",
          color: "#aaa",
          fontSize: 15,
        }}
      >
        True
      </div>

      {/* Condition Row */}
      <div
        style={{
          display: "flex",
          background: "#212128",
          borderRadius: 14,
          margin: "17px 16px",
          padding: "13px 15px",
          gap: 18,
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={left}
          onChange={(e) => setLeft(e.target.value)}
          style={{
            background: "transparent",
            border: "1.5px solid #3b3b46",
            borderRadius: 8,
            color: "#eee",
            fontSize: 18,
            width: 75,
            height: 36,
            paddingLeft: 10,
            outline: "none",
          }}
        />
        <select
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
          style={{
            background: "#19191d",
            border: "1.5px solid #3b3b46",
            borderRadius: 8,
            color: "#eee",
            fontSize: 18,
            height: 36,
            width: 55,
            textAlign: "center",
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
          style={{
            background: "transparent",
            border: "1.5px solid #3b3b46",
            borderRadius: 8,
            color: "#eee",
            fontSize: 18,
            width: 52,
            height: 36,
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
