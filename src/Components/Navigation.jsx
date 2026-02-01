import { VscDebugDisconnect } from "react-icons/vsc";
import { FaRegStopCircle, FaPlay } from "react-icons/fa";

const Navbar = () => {
  return (
    <header
      style={{
        height: "56px",
        backgroundColor: "#0f172a",
        color: "white",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        justifyContent: "space-between",
        borderBottom: "1px solid #1f2937",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginLeft: "300px",
        }}
      >
        <button
          style={{
            width: "120px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            color: "orange",
          }}
        >
          <VscDebugDisconnect /> Connect
        </button>
        <button
          style={{
            width: "100px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            color: "red",
          }}
        >
          <FaRegStopCircle /> Stop
        </button>
        <button
          style={{
            width: "100px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            color: "#05f29b",
          }}
        >
          <FaPlay /> Run
        </button>
      </div>
    </header>
  );
};

export default Navbar;
