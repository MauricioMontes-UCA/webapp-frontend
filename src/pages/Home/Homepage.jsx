import React from 'react';
import Button from '../../components/Button';
import FeatureCard from '../../components/FeatureCard';
import logoAlt from '../../assets/logo-alt.svg';
import './Homepage.css';

const Homepage = () => {
  const handleGetStarted = () => {
    // Lógica para redirigir al registro o login
    console.log('Navegando a registro...');
  };

  const handleQuickSearch = () => {
    // Lógica para búsqueda rápida
    console.log('Iniciando búsqueda rápida...');
  };

  const handleViewMyBooks = () => {
    // Lógica para ver libros del usuario
    console.log('Navegando a mis libros...');
  };

  const handleBrowseRecommendations = () => {
    // Lógica para ver recomendaciones
    console.log('Navegando a recomendaciones...');
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">
            <img src={logoAlt} alt="El Último Párrafo" />
          </div>
          <h1 className="hero-title">El Último Párrafo</h1>
          <p className="hero-subtitle">
            Tu plataforma personal para gestionar, descubrir y calificar 
            tus lecturas favoritas. Organiza tu biblioteca digital de manera inteligente.
          </p>
          <div className="hero-actions">
            <Button 
              variant="primary" 
              size="large" 
              onClick={handleGetStarted}
            >
              Comenzar Ahora
            </Button>
            <Button 
              variant="secondary" 
              size="large" 
              onClick={handleQuickSearch}
            >
              Búsqueda Rápida
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">Descubre todo lo que puedes hacer</h2>
          <div className="features-grid">
            <FeatureCard
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              }
              title="Búsqueda Avanzada"
              description="Encuentra libros por título, autor, género o ISBN. Nuestra búsqueda inteligente te conecta con una amplia base de datos."
              action={
                <Button variant="outline" onClick={handleQuickSearch}>
                  Buscar Libros
                </Button>
              }
            />

            <FeatureCard
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
              }
              title="Listas Personalizadas"
              description="Organiza tus libros en listas: por leer, leyendo actualmente, completados. Lleva un seguimiento completo de tu progreso."
              action={
                <Button variant="outline" onClick={handleViewMyBooks}>
                  Ver Mis Listas
                </Button>
              }
            />

            <FeatureCard
              icon={
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              }
              title="Calificaciones y Reseñas"
              description="Califica tus libros con un sistema de estrellas y guarda tus pensamientos. Descubre recomendaciones basadas en tus gustos."
              action={
                <Button variant="outline" onClick={handleBrowseRecommendations}>
                  Ver Recomendaciones
                </Button>
              }
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">¿Listo para organizar tu biblioteca?</h2>
          <p className="cta-description">
            Únete a nuestra comunidad de lectores y comienza a gestionar 
            tus lecturas de manera inteligente.
          </p>
          <Button 
            variant="primary" 
            size="large" 
            onClick={handleGetStarted}
          >
            Registrarse Gratis
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;