import React from 'react';
import './Button.css';

/**
 * Componente Button reutilizable
 * 
 * @param {React.ReactNode} children - Contenido del botón (texto, iconos, etc.)
 * @param {string} variant - Estilo del botón: 'primary', 'secondary', 'outline'
 * @param {string} size - Tamaño del botón: 'small', 'medium', 'large'
 * @param {function} onClick - Función que se ejecuta al hacer clic
 * @param {string} type - Tipo de botón HTML: 'button', 'submit', 'reset'
 * @param {boolean} disabled - Si el botón está deshabilitado
 * @param {string} className - Clases CSS adicionales opcionales
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  type = 'button',
  disabled = false,
  className = ''
}) => {
  // Clase base para todos los botones
  const baseClass = 'btn';
  
  // Clase para el estilo específico del botón
  const variantClass = `btn--${variant}`;
  
  // Clase para el tamaño del botón
  const sizeClass = `btn--${size}`;
  
  // Clase condicional para estado deshabilitado
  const disabledClass = disabled ? 'btn--disabled' : '';
  
  // Combina todas las clases CSS, filtra vacías y las une con espacios
  const buttonClass = [baseClass, variantClass, sizeClass, disabledClass, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;