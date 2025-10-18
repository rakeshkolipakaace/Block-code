import React, { useState } from "react";
import { FaCog } from "react-icons/fa";

const PinReadBlock = ({ data, selected, id }) => {
  const [pin, setPin] = useState("4");
  const [store, setStore] = useState("value");

  return (
    <div
      style={{
        background: "#222233",
        borderRadius: 20,
        minWidth: 215,
        minHeight: 92,
        fontFamily: "Inter, sans-serif",
        border: `2px solid ${selected ? "#4266c0" : "#222233"}`,
        position: "relative",
        animation: "appear 0.7s cubic-bezier(.68,-0.55,.27,1.55)",
        boxShadow: selected ? "0 0 10px #4266c0" : "0 5px 18px #0007",
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
          background: "#4266c0",
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
        Pin Read
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
              width: 45,
              height: 28,
              textAlign: "center",
              marginLeft: 6,
            }}
          />
        </div>
        <div>
          Store In{" "}
          <input
            type="text"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            style={{
              background: "#222",
              color: "#00d26a",
              borderRadius: 8,
              border: "none",
              width: 105,
              height: 28,
              textAlign: "center",
              marginLeft: 6,
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 18,
              height: 18,
              background: "#00d26a",
              borderRadius: "50%",
              marginLeft: 8,
              verticalAlign: "middle",
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

export default PinReadBlock;
