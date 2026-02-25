import React, { useState, useEffect } from "react";
import { FaCode } from "react-icons/fa";
import { BsFillDisplayFill } from "react-icons/bs";
import { generateCode } from "../utils/codeGenerator";
import { Highlight, themes } from "prism-react-renderer";
import Compiler from "./Compiler";

const Codegen = ({ blocks, edges, onErrorBlock }) => {
  const [codeData, setCodeData] = useState({ headers: "", globals: "", main: "", lineMap: {} });

  useEffect(() => {
    const generated = generateCode(blocks, edges);
    if (!generated || typeof generated === 'string') {
      setCodeData({ headers: "", globals: "", main: generated || "", lineMap: {} });
    } else {
      setCodeData(generated);
    }
  }, [blocks, edges]);

  const fullCode = [codeData.headers, codeData.globals, codeData.main].filter(s => s.trim().length > 0).join("\n\n");
  const displayCode = fullCode;

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
      </div>

      <div style={{
        borderRadius: "8px",
        overflow: "hidden",
        border: "1px solid #333",
        marginBottom: "16px"
      }}>
        <Highlight
          theme={themes.vsDark}
          code={displayCode}
          language="cpp"
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
          marginBottom: "12px"
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

      {/* Compiler Component */}
      <Compiler
        code={fullCode}
        lineMap={codeData.lineMap}
        onErrorBlock={onErrorBlock}
      />
    </>
  );
};

export default Codegen;
