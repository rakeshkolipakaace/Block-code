import React from "react";
import { FaCode } from "react-icons/fa";
import { BsFillDisplayFill } from "react-icons/bs";

const Codegen = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <FaCode className="inline mr-2" style={{ color: "05f29b" }} /> Generate
        Code
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <BsFillDisplayFill
          className="inline mr-2"
          style={{
            color: "#9400D3",
          }}
        />
        Output
      </div>
    </>
  );
};

export default Codegen;
