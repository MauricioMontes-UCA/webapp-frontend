import React, { useState } from "react";
import "./Signup.css";
import "../../styles/colors.css";
import logo from "../../assets/logo-golden.svg";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const validateSignup = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "El nombre es obligatorio";
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(firstName))
      newErrors.firstName = "El nombre solo puede contener letras";

    if (!lastName.trim()) newErrors.lastName = "El apellido es obligatorio";
    else if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(lastName))
      newErrors.lastName = "El apellido solo puede contener letras";

    if (!username.trim()) newErrors.username = "El nombre de usuario es obligatorio";
    
    if (!email.trim()) newErrors.email = "El correo electrónico es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "El formato del correo no es válido";
    
    if (!password) newErrors.password = "La contraseña es obligatoria";
    else if (password.length < 8) newErrors.password = "Debe tener al menos 8 caracteres";
    
    if (!confirmPassword) newErrors.confirmPassword = "Debes confirmar tu contraseña";
    else if (confirmPassword !== password) newErrors.confirmPassword = "Las contraseñas no coinciden";
    
    if (!termsAccepted) newErrors.termsAccepted = "Debes aceptar los Términos y la Política";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = () => {
    setRegisterSuccess(false);
    if (validateSignup()) {
      setRegisterSuccess(true);
    }
  };

  return (
    <div className="signup">
      <div className="signup-card">
        <img src={logo} alt="El Último Párrafo" className="signup-logo" />
        <h1 className="signup-title">ÚNETE A EL ÚLTIMO PÁRRAFO</h1>
        <p className="signup-invite">Comparte tu voz, tus ideas y tus reflejos con el mundo.</p>

        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
          <InputField
            label="Nombre"
            type="text"
            placeholder="Tu nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <p className="error-text">{errors.firstName}</p>}

          <InputField
            label="Apellido"
            type="text"
            placeholder="Tu apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors.lastName && <p className="error-text">{errors.lastName}</p>}

          <InputField
            label="Nombre de Usuario"
            type="text"
            placeholder="Tu nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && <p className="error-text">{errors.username}</p>}

          <InputField
            label="Correo Electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="error-text">{errors.email}</p>}

          <InputField
            label="Contraseña"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error-text">{errors.password}</p>}

          <InputField
            label="Confirmar Contraseña"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}

          <div className="signup-options">
            <Checkbox
              label="Acepto los Términos y la Política de Privacidad"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
            />
          </div>
          {errors.termsAccepted && <p className="error-text">{errors.termsAccepted}</p>}

          <Button variant="primary" size="medium" onClick={handleSignup}>
            Crear cuenta
          </Button>

          {registerSuccess && (
            <p className="success-text">¡Registro exitoso! Ya puedes iniciar sesión.</p>
          )}

          <p className="signup-footer">
            ¿Ya tienes cuenta? <a href="/login" className="signup-link">Inicia sesión aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
