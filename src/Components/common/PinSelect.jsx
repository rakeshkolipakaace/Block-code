import React from "react";

const ALL_PINS = [
  "D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13",
  "A0","A1","A2","A3","A4","A5"
];

const DEFAULT_PWM_PINS = new Set(["D3","D5","D6","D9","D10","D11"]);

function normalizePin(value) {
  if (value === null || value === undefined) return "";
  const s = String(value).trim().toUpperCase();
  if (s === "") return "";
  // If purely numeric, treat as digital Dx
  if (/^\d+$/.test(s)) return `D${s}`;
  // Ensure leading D for D pins
  if (/^D\d+$/.test(s)) return s;
  // Keep A0-A5 as is
  if (/^A[0-5]$/.test(s)) return s;
  return s;
}

const PinSelect = ({
  value,
  onChange,
  availablePins = ALL_PINS,
  pwmPins = DEFAULT_PWM_PINS,
  placeholder = "Select pin",
  style = {},
  selectStyle = {},
  disabled = false,
}) => {
  const normalized = normalizePin(value);

  // Build final options list: filter by availablePins while keeping current selection present
  const setAvailable = new Set(availablePins.map((p) => normalizePin(p)));
  const options = ALL_PINS.filter((p) => setAvailable.has(p) || p === normalized);

  return (
    <select
      value={normalized || ""}
      onChange={(e) => onChange && onChange(e.target.value)}
      disabled={disabled}
      style={{
        background: "#222",
        color: "#fff",
        borderRadius: 8,
        border: "none",
        height: 28,
        padding: "0 8px",
        ...selectStyle,
      }}
    >
      {!normalized && <option value="">{placeholder}</option>}
      {options.map((pin) => {
        const isPwm = pwmPins.has(pin);
        return (
          <option key={pin} value={pin} style={{ color: isPwm ? "#f59e0b" : undefined }}>
            {pin}{isPwm ? " (PWM)" : ""}
          </option>
        );
      })}
    </select>
  );
};

export default PinSelect;
