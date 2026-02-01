import React from "react";

const DeleteButton = ({ onDelete, nodeId }) => {
  const handleDelete = () => {
    if (onDelete) {
      onDelete(parseFloat(nodeId));
    }
  };

  return (
    <button
      onClick={handleDelete}
      style={{
        position: "absolute",
        top: "4px",
        right: "8px",
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        backgroundColor: "#ef4444",
        // color: "white",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        fontWeight: "bold",
        // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        transition: "all 0.2s ease",
        zIndex: 10,
      }}
      title="Delete node"
    >
      ×
    </button>
  );
};

export default DeleteButton;
