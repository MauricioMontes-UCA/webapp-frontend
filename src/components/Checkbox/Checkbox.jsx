import React from "react";
import "./Checkbox.css";

export default function Checkbox({ label, checked, onChange }) {
  return (
    <label className="checkbox-container">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  );
}
