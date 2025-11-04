import React, { useState } from "react";
import "./Login.css";
import logo from '../../assets/logo-golden.svg';
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";

const Login = () => {
  // Estados del formulario
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [loginError, setLoginError] = useState('')

  // Validar campos del formulario
  const validateLogin = () => {
    const newErrors = {}

    if (!identifier) newErrors.identifier = 'El nombre de usuario o correo es obligatorio'
    if (!password) newErrors.password = 'La contraseña es obligatoria'
    else if (password.length < 8)
      newErrors.password = 'Debe tener al menos 8 caracteres'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Lógica principal de inicio de sesión
  const handleLogin = () => {
    console.log('Intentando iniciar sesión...')
    setLoginError('')

    if (validateLogin()) {
      console.log('Usuario/correo:', identifier)
      console.log('Contraseña:', password)
      console.log('Recordar usuario:', remember)

      //Aquí más adelante irá la integración real con backend
      const userFound = false

      if (userFound) {
        console.log('Inicio de sesión exitoso')
      } else {
        console.log('Error: credenciales inválidas')
        setLoginError(
          'El nombre de usuario, email o contraseña son incorrectos. ' +
            'Vuelva a ingresar su información o restablezca la contraseña.'
        )
      }
    } else {
      console.log('Validación del formulario fallida')
    }
  }

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
              label='Nombre de Usuario o Email'
              type='text'
              placeholder='Digita tu nombre de usuario o Email'
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

            <div className='login-options'>
              <Checkbox
                label='Recordar usuario'
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <a href='#' className='login-link'>
                Cambiar contraseña
              </a>
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
