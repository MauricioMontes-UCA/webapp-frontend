import React from 'react';
import './FeatureCard.css';

/**
 * Componente FeatureCard reutilizable
 * Diseñado para mostrar características, servicios o funcionalidades
 * 
 * @param {React.ReactNode} icon - Icono o elemento visual (SVG, imagen, etc.)
 * @param {string} title - Título de la característica
 * @param {string} description - Descripción detallada de la característica
 * @param {React.ReactNode} action - Botón o enlace de acción (opcional)
 * @param {string} className - Clases CSS adicionales opcionales
 */
const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  action,
  className = ''
}) => {
  return (
    <div className={`feature-card ${className}`}>
      {/* Contenedor del icono - Área visual principal */}
      <div className="feature-card__icon">
        {icon}
      </div>
      
      {/* Título de la característica */}
      <h3 className="feature-card__title">{title}</h3>
      
      {/* Descripción explicativa */}
      <p className="feature-card__description">{description}</p>
      
      {/* Acción opcional (botón, enlace, etc.) */}
      {action && (
        <div className="feature-card__action">
          {action}
        </div>
      )}
    </div>
  );
};

export default FeatureCard;