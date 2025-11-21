import React, { useState } from "react";
import "./InputField.css";
import eyeIcon from "../../assets/icons/eye.svg";
import eyeClosedIcon from "../../assets/icons/eye-closed.svg";

export default function InputField({ label, type, placeholder, value, onChange, list }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className='input-field'>
      <label>{label}</label>
      <div className='input-wrapper'>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          list={list} 
        />
        {isPassword && (
          <img
            src={showPassword ? eyeClosedIcon : eyeIcon}
            alt='Ver contraseña'
            className='toggle-eye'
            onClick={() => setShowPassword(!showPassword)}
          />
        )}
      </div>
    </div>
  );
}
