import React, { useState } from "react";
import { FaCog } from "react-icons/fa";

const PWMBlock = ({ data, selected, id }) => {
  const [pin, setPin] = useState("2");
  const [frequency, setFrequency] = useState("1000");
  const [duty, setDuty] = useState("512");

  return (
    <div
      style={{
        background: "#222233",
        borderRadius: 20,
        minWidth: 230,
        minHeight: 115,
        fontFamily: "Inter, sans-serif",
        border: `2px solid ${selected ? "#7b44ff" : "#222233"}`,
        position: "relative",
        animation: "appear 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
        boxShadow: selected ? "0 0 10px #7b44ff" : "0 5px 18px #0007",
      }}
    >
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
          zIndex: 1,
        }}
        title="Delete node"
      >
        ×
      </button>
      <div
        style={{
          background: "#7b44ff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          padding: "10px 18px",
          color: "#fff",
          fontWeight: 700,
          fontSize: 21,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        PWM
        <FaCog style={{ color: "#fff", fontSize: 18 }} />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 12,
          padding: "16px 18px",
          color: "#fff",
        }}
      >
        <div>
          Pin{" "}
          <input
            type="text"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            style={{
              background: "#222",
              color: "#7da6ff",
              borderRadius: 8,
              border: "none",
              width: 38,
              height: 28,
              textAlign: "center",
              marginLeft: 6,
            }}
          />
        </div>
        <div>
          Frequency{" "}
          <input
            type="text"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            style={{
              background: "#222",
              color: "#7da6ff",
              borderRadius: 8,
              border: "none",
              width: 58,
              height: 28,
              textAlign: "center",
              marginLeft: 6,
            }}
          />
        </div>
        <div>
          Duty Cycle{" "}
          <input
            type="text"
            value={duty}
            onChange={(e) => setDuty(e.target.value)}
            style={{
              background: "#222",
              color: "#7da6ff",
              borderRadius: 8,
              border: "none",
              width: 38,
              height: 28,
              textAlign: "center",
              marginLeft: 6,
            }}
          />
        </div>
      </div>
      <style>
        {`
          @keyframes appear {
            0% { opacity: 0; transform: scale(0.8);} 
            100% { opacity: 1; transform: scale(1);} 
          }
        `}
      </style>
    </div>
  );
};

export default PWMBlock;
