import React, { useState } from "react";
import { FaPlay, FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";

const Compiler = ({ code, lineMap, onErrorBlock }) => {
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileResult, setCompileResult] = useState(null);
  const [compiledHex, setCompiledHex] = useState("");

  const compileRealCode = async (isManual = false) => {
    if (!code.trim()) return;

    setIsCompiling(true);
    if (isManual) setCompileResult(null); // Only clear result on manual click to avoid flickering
    setCompiledHex("");

    try {
      const response = await fetch("http://localhost:5000/compile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      const result = await response.json();

      if (!result.success) {
        // Parse error to find line number
        // sketch.ino:15:12: error: 'temperature' was not declared
        const errorLines = result.error.split("\n");
        let firstBlockId = null;

        const processedErrors = errorLines.map(line => {
          const lineMatch = line.match(/sketch\.ino:(\d+):/);
          if (lineMatch) {
            const lineNum = parseInt(lineMatch[1]);
            const blockId = lineMap[lineNum];
            if (blockId && !firstBlockId) firstBlockId = blockId;
            return blockId ? `[Block Error] ${line}` : line;
          }
          return line;
        });

        if (firstBlockId) {
          onErrorBlock(firstBlockId);
        } else {
          onErrorBlock(null);
        }

        setCompileResult({
          success: false,
          type: "error",
          message: "Compilation Failed",
          details: processedErrors.filter(l => l.trim() !== ""),
        });
      } else {
        setCompileResult({
          success: true,
          type: "success",
          message: "Compilation Successful",
          details: ["All systems go!", "Code is ready for upload."],
          size: result.hex ? Math.round(result.hex.length / 2) : 0
        });
        setCompiledHex(result.hex || "");
        onErrorBlock(null);
      }
    } catch (err) {
      setCompileResult({
        success: false,
        type: "error",
        message: "Server Connection Error",
        details: [err.message, "Make sure the backend server (node backend/server.js) is running."],
      });
      onErrorBlock(null);
    } finally {
      setIsCompiling(false);
    }
  };

  // Debounced real-time compilation
  React.useEffect(() => {
    const timer = setTimeout(() => {
      compileRealCode(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [code]);

  const downloadHex = () => {
    if (!compiledHex) return;

    const blob = new Blob([compiledHex], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sketch.hex';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const resetCompiler = () => {
    setCompileResult(null);
    setCompiledHex("");
  };

  return (
    <div>
      {/* Compile Button */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <button
          onClick={() => compileRealCode(true)}
          disabled={isCompiling || !code.trim()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            background: isCompiling ? "#666" : "#05f29b",
            border: "none",
            borderRadius: "6px",
            color: "#000",
            padding: "8px 16px",
            cursor: isCompiling ? "not-allowed" : "pointer",
            fontSize: "14px",
            fontWeight: "500",
            transition: "all 0.2s"
          }}
        >
          {isCompiling ? (
            <>
              <FaSpinner className="animate-spin" />
              Compiling...
            </>
          ) : (
            <>
              <FaPlay />
              Compile Code
            </>
          )}
        </button>

        {compileResult?.success && compiledHex && (
          <button
            onClick={downloadHex}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#007ACC",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            Download .hex
          </button>
        )}

        {compileResult && (
          <button
            onClick={resetCompiler}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "#666",
              border: "none",
              borderRadius: "6px",
              color: "#fff",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            Reset
          </button>
        )}
      </div>

      {/* Compilation Result */}
      {compileResult && (
        <div
          style={{
            borderRadius: "6px",
            padding: "12px",
            marginBottom: "12px",
            border: `1px solid ${compileResult.type === 'error' ? '#ef4444' :
              compileResult.type === 'warning' ? '#f59e0b' : '#10b981'
              }`,
            background: compileResult.type === 'error' ? '#1a0a0a' :
              compileResult.type === 'warning' ? '#1a1a0a' : '#0a1a0a'
          }}
        >
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
            color: compileResult.type === 'error' ? '#ef4444' :
              compileResult.type === 'warning' ? '#f59e0b' : '#10b981'
          }}>
            {compileResult.type === 'error' && <FaExclamationTriangle />}
            {compileResult.type === 'warning' && <FaExclamationTriangle />}
            {compileResult.type === 'success' && <FaCheckCircle />}
            <span style={{ fontWeight: "600" }}>{compileResult.message}</span>
          </div>

          {compileResult.details.map((detail, index) => (
            <div key={index} style={{
              fontSize: "12px",
              color: "#999",
              marginBottom: "4px",
              paddingLeft: "20px"
            }}>
              {detail}
            </div>
          ))}

          {compileResult.success && (
            <div style={{
              fontSize: "12px",
              color: "#05f29b",
              marginTop: "8px",
              fontWeight: "500"
            }}>
              Binary size: {compileResult.size} bytes
            </div>
          )}
        </div>
      )}

      {/* {compileResult && compileResult.compiledCode && (
        <div>
          <div style={{ 
            color: "#fff", 
            marginBottom: "8px", 
            fontSize: "14px",
            fontWeight: "500"
          }}>
            Complete Compiled Code (with headers):
          </div>
          <div style={{
            borderRadius: "6px",
            overflow: "hidden",
            border: "1px solid #333",
            background: "#000",
            marginBottom: "12px"
          }}>
            <pre style={{
              padding: "12px",
              margin: 0,
              overflow: "auto",
              maxHeight: "200px",
              fontSize: "12px",
              fontFamily: "monospace",
              color: "#fff",
              whiteSpace: "pre-wrap"
            }}>
              {compileResult.compiledCode}
            </pre>
          </div>
        </div>
      )} */}

      {/* HEX Output */}
      {compiledHex && (
        <div>
          <div style={{
            color: "#fff",
            marginBottom: "8px",
            fontSize: "14px",
            fontWeight: "500"
          }}>
            Real Arduino Binary (HEX) - Compiled via arduino-cli:
          </div>
          <div style={{
            borderRadius: "6px",
            overflow: "hidden",
            border: "1px solid #333",
            background: "#000"
          }}>
            <pre style={{
              padding: "12px",
              margin: 0,
              overflow: "auto",
              maxHeight: "200px",
              fontSize: "11px",
              fontFamily: "monospace",
              color: "#0f0",
              whiteSpace: "pre-wrap",
              wordBreak: "break-all"
            }}>
              {compiledHex}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compiler;
