import React, { useState } from "react";

const pins = [
  "D0",
  "D1",
  "D2",
  "D3",
  "D4",
  "D5",
  "D6",
  "D7",
  "D8",
  "D9",
  "D10",
  "D11",
  "D12",
  "D13",
  "A0",
  "A1",
  "A2",
  "A3",
  "A4",
  "A5",
];

const PinSelect = () => {
  const [selectedPin, setSelectedPin] = useState("");

  return (
    <select
      value={selectedPin}
      onChange={(e) => setSelectedPin(e.target.value)}
      style={{
        background: "#111",
        color: "#fff",
        border: "1px solid #333",
        borderRadius: 6,
        height: 28,
        padding: "0 6px",
      }}
    >
      <option value="">Select pin</option>

      {pins.map((pin) => (
        <option
          key={pin}
          value={pin}
          disabled={pin === selectedPin} // 🔥 disable selected pin
        >
          {pin}
        </option>
      ))}
    </select>
  );
};

export default PinSelect;
