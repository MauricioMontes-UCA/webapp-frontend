import React, { useState } from "react";
import "./Login.css";
import logo from '../../assets/logo-golden.svg';
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import { Link, useNavigate } from "react-router-dom";
import API from "../../utils/api";

const Login = () => {
  const navigate = useNavigate();

  // Estados del formulario
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Validar campos del formulario
  const validateLogin = () => {
    const newErrors = {}

    if (!identifier) newErrors.identifier = 'El correo es obligatorio'
    if (!password) newErrors.password = 'La contraseña es obligatoria'
    else if (password.length < 8)
      newErrors.password = 'Debe tener al menos 8 caracteres'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Lógica principal de inicio de sesión
  const handleLogin = async () => {
    setLoginError('');
    if (!validateLogin()) return;

    setIsSubmitting(true);

    try {
      await API.post("/api/auth/login", {
        email: identifier,
        password: password
      });

      navigate('/main');
    }

    catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setLoginError(err.response.data.errors[0]);
      }
      else if (err.response && err.response.data && err.response.data.message) {
        setLoginError(err.response.data.message);
      }
      else {
        setLoginError("Error inesperado. Por favor, inténtelo de nuevo.")
      }
    }
    finally {
      setIsSubmitting(false)
    }
  };

  // Render principal
  return (
    <div className='login'>
      {/* Sección Izquierda */}
      <section className='login-left'>
        <div className='login-logo'>
          <img src={logo} alt='El Último Párrafo' />
          <h1>EL ÚLTIMO PÁRRAFO</h1>
        </div>
      </section>

      {/* Sección Derecha */}
      <section className='login-right'>
        <div className='login-card'>
          <h2 className='login-title'>INICIAR SESIÓN</h2>
          <p className='login-subtitle'>
            Bienvenido a <b>EL ÚLTIMO PÁRRAFO</b>, un lugar donde tu opinión es la ley.
          </p>

          <form className='login-form' onSubmit={(e) => e.preventDefault()}>
            <InputField
              label='Correo electrónico'
              type='text'
              placeholder='Digita tu correo electrónico'
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
            />
            {errors.identifier && <p className='error-text'>{errors.identifier}</p>}

            <InputField
              label='Contraseña'
              type='password'
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className='error-text'>{errors.password}</p>}

            {/* No dio el tiempo a implementarlo en al API :( */}
            <div className='login-options'>
              {/* <Checkbox
                label='Recordar usuario'
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              /> */}
              <p className='login-link'>
                ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
              </p>
            </div>

            <Button
              variant='primary'
              size='small'
              onClick={handleLogin}
            >
              Iniciar sesión
            </Button>

            {loginError && (
              <p className='error-text global-error'>{loginError}</p>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}

export default Login
