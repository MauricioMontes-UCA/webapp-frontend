import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import "../../styles/colors.css";
import logo from "../../assets/logo-golden.svg";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import TermsConditions from "../../components/TermsConditions/TermsConditions";
import API from "../../utils/api";

// Modal estilizado con colores de la web
function SuccessModal({ open, message, redirectText }) {
  if (!open) return null;
  return (
    <div className="success-modal-overlay">
      <div className="success-modal-content">
        <h2 className="success-modal-title">{message}</h2>
        <p className="success-modal-redirect">{redirectText}</p>
      </div>
    </div>
  );
}
const Signup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

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
    else if (password.length < 12) newErrors.password = "Debe tener al menos 12 caracteres";
    else if (!/[A-Z]/.test(password)) newErrors.password = "Debe tener al menos una mayúscula";
    else if (!/[a-z]/.test(password)) newErrors.password = "Debe tener al menos una minúscula";
    else if (!/[#?!@$%^&*-]/.test(password)) newErrors.password = "Debe tener al menos un símbolo especial (#?!@$%^&*-).";
    
    if (!confirmPassword) newErrors.confirmPassword = "Debes confirmar tu contraseña";
    else if (confirmPassword !== password) newErrors.confirmPassword = "Las contraseñas no coinciden";
    
    if (!termsAccepted) newErrors.termsAccepted = "Debes aceptar los Términos y la Política";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    setErrors({});
    if (!validateSignup()) return;

    setIsSubmitting(true);

    try {
      const userData = {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password
      };

      await API.post("/api/users", userData);

      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/main");
      }, 2000);
    }
    catch (err) {
      const apiErrors = {};
      if (err.response && err.response.data && err.response.data.message) {
        apiErrors.form = err.response.data.message
      }
      else {
        apiErrors.form = "Ocurrió un error inesperado. Por favor, intente de nuevo.";
      }
      setErrors(apiErrors);
    }
    finally {
      setIsSubmitting(false);
    }

    // setIsSubmitting(false);
    // if (validateSignup()) {
    //   setIsSubmitting(true);
    //   setShowSuccessModal(true);
    //   setTimeout(() => {
    //     setShowSuccessModal(false);
    //     navigate('/main'); // Ajusta la ruta si tu catálogo está en otra ruta
    //   }, 2000);
    // }
  };

  return (
    <div className="signup">
   
    {showTerms && (<TermsConditions open={showTerms} close={() => setShowTerms(false)} onAccept={() => setTermsAccepted(true)}/>)}
    <SuccessModal open={showSuccessModal} message="Listo, tu cuenta se creó exitosamente" redirectText="Redirigiendo al catálogo de libros..." />

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

          <p className="terms-open" onClick={() => setShowTerms(true)}>
            Leer Términos y Condiciones
          </p>
          {errors.termsAccepted && <p className="error-text">{errors.termsAccepted}</p>}

          <Button variant="primary" size="medium" onClick={handleSignup}>
            Crear cuenta
          </Button>

          {/* El mensaje de éxito ahora se muestra en un modal */}

          <p className="signup-footer">
            ¿Ya tienes cuenta? <a href="/login" className="signup-link">Inicia sesión aquí</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
