import React, { useState } from "react";
import "./Login.css";
import logo from '../../assets/logo.svg';
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo">
          <img src={logo} alt="El Último Párrafo" />
          <h2>EL ÚLTIMO PÁRRAFO</h2>
        </div>
      </div>

      <div className="login-right">
        <div className="login-card">
          <h2 className="login-title">SIGN IN</h2>
          <p className="login-subtitle">
            Bienvenido a EL ÚLTIMO PÁRRAFO, un lugar donde tu opinión es la LEY.
          </p>

          <InputField
            label="Email"
            type="email"
            placeholder="00000000@uca.edu.sv"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputField
            label="Contraseña"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="login-options">
            <Checkbox label="Recordar usuario" />
            <a href="#" className="login-link">Cambiar contraseña</a>
          </div>

          <Button text="Iniciar sesión" onClick={handleLogin} variant="primary" />
        </div>
      </div>
    </div>
  );
}
