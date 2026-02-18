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

const PinSelect = ({ value, onChange, availablePins, selectStyle, ...props }) => {
  const pinsToUse = availablePins && availablePins.length > 0 ? availablePins : pins;

  return (
    <select
      className="nodrag"
      value={value || ""}
      onChange={(e) => onChange && onChange(e.target.value)}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      style={selectStyle || {
        background: "#111",
        color: "#fff",
        border: "1px solid #333",
        borderRadius: 6,
        height: 28,
        padding: "0 6px",
      }}
      {...props}
    >
      <option value="" disabled>Select pin</option>
      {pinsToUse.map((pin) => (
        <option key={pin} value={pin}>
          {pin}
        </option>
      ))}
    </select>
  );
};

export default PinSelect;
