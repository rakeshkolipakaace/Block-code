import React, { useState, useEffect } from "react";
import { FaCode } from "react-icons/fa";
import { BsFillDisplayFill } from "react-icons/bs";
import { generateCode } from "../utils/codeGenerator";
import { Highlight, themes } from "prism-react-renderer";

const Codegen = ({ blocks, edges }) => {
  const [codeData, setCodeData] = useState({ helpers: "", main: "" });
  const [showFull, setShowFull] = useState(false);

  useEffect(() => {
    const generated = generateCode(blocks, edges);
    if (typeof generated === 'string') {
      setCodeData({ helpers: "", main: generated });
    } else {
      setCodeData(generated);
    }
  }, [blocks, edges]);

  const outputCode = showFull ? (codeData.helpers + "\n" + codeData.main) : codeData.main;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "8px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaCode className="inline mr-2" style={{ color: "#05f29b" }} />
          <span style={{ color: "#fff" }}>Generate Code</span>
        </div>
        <button
          onClick={() => setShowFull(!showFull)}
          style={{
            background: "#333",
            border: "none",
            borderRadius: "4px",
            color: "#fff",
            fontSize: "10px",
            padding: "4px 8px",
            cursor: "pointer"
          }}
        >
          {showFull ? "Show Logic Only" : "Show Full Code"}
        </button>
      </div>

      <div style={{
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #333",
        marginBottom: "8px"
      }}>
        <Highlight
          theme={themes.vsDark}
          code={outputCode}
          language="python"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre style={{
              ...style,
              padding: "16px",
              margin: 0,
              overflow: "auto",
              maxHeight: "60vh",
              whiteSpace: "pre", // Enables horizontal scrolling, prevents wrapping
              fontSize: "13px",
              fontFamily: "monospace"
            }}>
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
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
