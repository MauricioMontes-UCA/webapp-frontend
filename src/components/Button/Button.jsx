import React from "react";
import "./Button.css";

export default function Button({ text, onClick, type = "button", variant = "primary" }) {
  return (
    <button 
      type={type} 
      className={`btn btn ${variant}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
}
